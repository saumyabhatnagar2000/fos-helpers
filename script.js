import path from "path";
import fs from "fs";
import chalk from "chalk";
let count = 0;

const stringArray = [];
const dynamicStringArray = [];

const extractDynamicStrings = (content, fileName) => {
  let flag = false;
  let tempString = "";

  for (const char in [...content]) {
    const charStr = content[char];

    if (flag && charStr !== "`") {
      tempString += charStr;
      continue;
    }
    if (charStr === "`" && !flag) {
      flag = true;
      continue;
    }
    if (charStr === "`" && flag) {
      if (/[A-Z]/.test(tempString)) {
        if (
          tempString[0] !== "#" &&
          tempString[0] !== "." &&
          tempString[0] !== "@" &&
          !tempString.includes("<") &&
          !tempString.includes("color") &&
          !tempString.includes("navigation") &&
          !tempString.includes("*")
        ) {
          dynamicStringArray.push({ tempString, fileName });
        }
      }
      flag = false;
      tempString = "";
    }
  }
};

const extractStrings = (content, fileName) => {
  let flag = false;
  let tempString = "";

  for (const char in [...content]) {
    const charStr = content[char];

    if (flag && charStr !== '"') {
      tempString += charStr;
      continue;
    }
    if (charStr === '"' && !flag) {
      flag = true;
      continue;
    }
    if (charStr === '"' && flag) {
      if (/[A-Z]/.test(tempString)) {
        if (
          tempString[0] !== "#" &&
          tempString[0] !== "." &&
          tempString[0] !== "@" &&
          !tempString.includes("<") &&
          !tempString.includes("color") &&
          !tempString.includes("navigation") &&
          !tempString.includes("*") &&
          !/Screen/.test(tempString) &&
          !/http/.test(tempString) &&
          !tempString.includes("YYYY")
        ) {
          stringArray.push({ tempString, fileName });
        }
      }
      flag = false;
      tempString = "";
    }
  }
};
const readFiles = (dirName) => {
  fs.readdir(dirName, (err, fileNames) => {
    if (err) {
      console.log(err);
      return;
    }
    fileNames.forEach(async (fileName) => {
      try {
        if (fs.lstatSync(dirName + fileName).isDirectory()) {
          readFiles(dirName + fileName + "/");
        } else {
          const time = Date.now();
          const extName = path.extname(dirName + fileName);
          if (
            (extName === ".ts" || extName === ".tsx") &&
            !/Service/.test(fileName)
          ) {
            const content = fs.readFileSync(dirName + fileName, "utf-8");
            if (!/<svg/.test(content)) {
              extractStrings(content, dirName + fileName);
              extractDynamicStrings(content, dirName + fileName);
            }
          }
          count++;
          console.log(fileName + chalk.green(` ${Date.now() - time}ms`));
        }
      } catch (e) {
        if (e.code === "ENOENT") {
          console.log(e);
        } else {
        }
      }
    });
    writeStringsInFiles(stringArray);
    writeDynamicStringInFile(dynamicStringArray);
    console.log(chalk.bgGray(`Total files read:` + count));
  });
};

const writeDynamicStringInFile = (stringArray) => {
  const file = fs.createWriteStream("allDynamicStrings.txt");
  file.on("error", (e) => console.log(e));
  stringArray.forEach((stringVal) => {
    file.write(
      stringVal.tempString + "      ---->>>>>      " + stringVal.fileName + "\n"
    );
  });
  console.log(
    chalk.green.bgBlack(
      `Wrote ${stringArray.length} lines in allDynamicStrings.txt`
    )
  );
  file.end();
};

const writeStringsInFiles = (stringArray) => {
  const file = fs.createWriteStream("allStrings.txt");
  file.on("error", (e) => console.log(e));
  stringArray.forEach((stringVal) => {
    file.write(
      stringVal.tempString + "      ---->>>>>      " + stringVal.fileName + "\n"
    );
  });
  console.log(
    chalk.green.bgBlack(`Wrote ${stringArray.length} lines in allStrings.txt`)
  );
  file.end();
};

readFiles("/Users/saumyabhatnagar/credgenics-fos-app/App/");
