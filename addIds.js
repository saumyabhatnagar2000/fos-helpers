import path from "path";
import fs from "fs";
import chalk from "chalk";

const searchObject = {
  TOUCHABLE: { tag: "<TouchableOpacity", replacement: "TOUCHABLE" },
  BUTTON: { tag: "<Button", replacement: "BUTTON" },
  INPUT: { tag: "<Input", replacement: "INPUT" },
  TEXTINPUT: { tag: "<TextInput", replacement: "TEXT_INPUT" },
};

let count = 0;

const findButtonTags = async (content, fileName, dirPath) => {
  const time = Date.now();
  const search = searchObject.TEXTINPUT.tag;
  const endTag = ">";

  let newContent = content;

  let keyFileName = fileName
    .replaceAll(/([A-Z])/g, " $1")
    .replaceAll(" ", "_")
    .toUpperCase();

  if (keyFileName[0] === "_") {
    keyFileName = keyFileName.slice(1, keyFileName.length);
  }
  keyFileName = keyFileName.substring(0, keyFileName.indexOf("."));

  for (let cInx = 0; cInx < newContent.length; cInx++) {
    if (newContent.substring(cInx, cInx + search.length) === search) {
      for (let i = cInx; i < newContent.length; i++) {
        if (newContent[i] === endTag && newContent[i - 1] !== "=") {
          const key = `FOS_${searchObject.TEXTINPUT.replacement}_${keyFileName}_${i}`;
          const replacement = ` testID={'${key}'}`;
          newContent =
            newContent.slice(0, i - 1) +
            replacement +
            newContent.slice(i - 1, newContent.length);
          break;
        }
      }
    }
  }

  await fs.writeFileSync(dirPath, newContent, "utf-8");
  console.log(
    chalk.yellow(`Finished writing ${fileName} in ${Date.now() - time}s`)
  );
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
              findButtonTags(content, fileName, dirName + fileName);
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

    console.log(chalk.bgGray(`Total files read:` + count));
  });
};

readFiles("/Users/saumyabhatnagar/credgenics-fos-app/App/");
