const fs = require("fs");

exports.getProblem = (req, res) => {
  const problem = JSON.parse(
    fs.readFileSync(`__dirname/../data/problem.json`, "utf-8")
  );
  res.status(200).json({
    status: "success",
    data: {
      ...problem,
    },
  });
};
