const GoogleSpreadsheet = require("google-spreadsheet");
const credentials = require("./bugtracker");
const { promisify } = require("util");

const addRowToSheet = async () => {
  const doc = new GoogleSpreadsheet(
    "184b_mCMjc7UJQ9qfpFRRfLVnU84i-zA-y1KMOXGntdA"
  );
  await promisify(doc.useServiceAccountAuth)(credentials);
  console.log("planilha aberta");
  const info = await promisify(doc.getInfo)();
  const worksheet = info.worksheets[0];
  await promisify(worksheet.addRow)({
    name,
    email,
    issueType,
    howToReproduce,
    expectedOutput,
    receivedOutput
  });
};

addRowToSheet();
