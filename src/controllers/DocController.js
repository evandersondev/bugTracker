const GoogleSpreadsheet = require("google-spreadsheet");
const credentials = require("../bugtracker.json");
const { promisify } = require("util");
const sgMail = require("@sendgrid/mail");

const docConfig = require("../config/docConfig");

module.exports = {
  async store(req, res) {
    const {
      name,
      email,
      userAgent,
      userDate,
      issueType,
      howToReproduce,
      expectedOutput,
      receivedOutput
    } = req.body;

    try {
      const doc = new GoogleSpreadsheet(docConfig.docId);
      await promisify(doc.useServiceAccountAuth)(credentials);
      console.log("planilha aberta");
      const info = await promisify(doc.getInfo)();
      const worksheet = info.worksheets[docConfig.worksheetIndex];
      await promisify(worksheet.addRow)({
        name,
        email,
        userAgent,
        userDate,
        issueType,
        source: req.query.source || "direct",
        howToReproduce,
        expectedOutput,
        receivedOutput
      });

      //Se for critico
      if (issueType === "CRITICAL") {
        sgMail.setApiKey(docConfig.key);
        const msg = {
          to: "evandersonvasconcelos23@gmail.com",
          from: "evandersonvasconcelos23@gmail.com",
          subject: "BUG critico reportado",
          text: `O usuario ${name} reportou um problema`,
          html: `O usuario ${name} reportou um problema`
        };
        await sgMail.send(msg);
      }

      res.render("success");
    } catch (err) {
      res.send("Error ao enviar formulario");
      console.log(err);
    }
  }
};
