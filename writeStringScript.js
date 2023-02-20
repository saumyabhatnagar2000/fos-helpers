import fs from "fs";
import path from "path";
import readline from "readline";
import chalk from "chalk";

const createConstantsJSON = async (stringsKeys) => {
  let constantsObject = {};
  Object.entries(stringsKeys).forEach((entry) => {
    constantsObject = {
      ...constantsObject,
      [entry[1]]: {
        ["string_value"]: entry[0],
        ["vernac_id"]: "",
      },
    };
  });
  const JSONconstants = JSON.stringify(constantsObject);
  fs.writeFileSync("constants.json", JSONconstants, "utf-8");
  console.log(chalk.cyan("Successfully created constants.json"));
  //   console.log(JSON.stringify(constantsObject));
};

const uploadAndClean = async () => {
  const fileStream = fs.createReadStream("allStrings.txt");

  const readLine = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  let stringsArray = {};
  for await (const line of readLine) {
    const arr = line.split("      ---->>>>>      ");
    const stringValue = arr[0];
    const fileName = arr[1];
    9;

    const fileContent = fs.readFileSync(fileName, "utf8");
    const splice = stringValue.split(" ", 4).toString().replaceAll(",", " ");
    const replaceString = splice
      .replaceAll(" ", "_")
      .replaceAll("/n", "")
      .toUpperCase();
    if (replaceString[0] === "_") {
      replaceString.slice(1, replaceString.length - 1);
    }
    if (replaceString[replaceString.length - 1])
      replaceString.slice(0, replaceString - 2);

    const newContent = fileContent.replaceAll(
      stringValue,
      "FOS_" + replaceString
    );
    stringsArray = { ...stringsArray, [stringValue]: "FOS_" + replaceString };

    try {
      fs.writeFileSync(fileName, newContent, "utf-8");
      console.log(chalk.bgBlack.green("Success " + fileName + "\n"));
    } catch (e) {}
  }
  console.log(chalk.bold.cyan("File writing completed!! :)"));
  createConstantsJSON(stringsArray);
};

await uploadAndClean();
