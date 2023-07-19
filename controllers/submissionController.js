const executeCpp = require("../utils/executeCode");
const generateFile = require("../utils/generateFile");
const fs = require("fs");

const testcases = [
  [7, 9],
  [21, 68],
  [32, 14],
];

exports.submit = async (req, res) => {
  const { language = "cpp", code } = req.body;

  if (!code) {
    return res.status(400).json({
      status: "fail",
      message: "Empty code!",
    });
  }

  const updatedCode = `${code}int main(){cout<<sum(x, y);}`;
  const { filePath } = await generateFile(language, updatedCode);

  try {
    let results = [];

    for (let i = 0; i < testcases.length; i++) {
      const content = fs.readFileSync(filePath, "utf-8");
      const updatedContent = content.replace(
        "sum(x, y)",
        `sum(${testcases[i][0]}, ${testcases[i][1]})`
      );

      fs.writeFileSync(filePath, updatedContent, "utf-8");
      const result = await executeCpp(filePath);
      results.push(result);

      // const prev = fs.readFileSync(`__dirname/../data/desiredOut.txt`, "utf-8");
      // const curr = `${prev}${result}.`;
      // fs.writeFileSync(`__dirname/../data/desiredOut.txt`, curr, "utf-8");

      fs.writeFileSync(filePath, content, "utf-8");
    }

    const isAccepted = [];

    const answers = fs
      .readFileSync(`__dirname/../data/desiredOut.txt`, "utf-8")
      .split(".");

    for (let i = 0; i < results.length; i++) {
      isAccepted.push(results[i] == answers[i]);
    }

    res.status(200).json({
      status: "success",
      data: isAccepted,
    });
  } catch (error) {
    res.status(200).json({
      status: "fail",
      message: error.stderr,
    });
  }
};
