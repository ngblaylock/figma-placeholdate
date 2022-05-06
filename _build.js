const fs = require("fs");
const watch = require("node-watch");
const chalk = require("chalk");
const sass = require("sass");
const files = ["head.html", "script.js", "style.scss", "placeholdate.svg", "body.html"];
const root = "./build-ui/";


const getFiles = function (file) {
  let ext = file.split(".").pop();
  if (ext == "scss") {
    return new Promise((resolve, reject) => {
      try {
        const result = sass.compile(`${root}${file}`);
        resolve(`<style>\n${result.css}\n</style>`);
      } catch (err) {
        reject("Sass didn't compile correctly: " + err);
      }
    });
  } else {
    return new Promise((resolve, reject) => {
      fs.readFile(`${root}${file}`, "utf8", (err, data) => {
        if (err) {
          reject(err);
        }
        // compile
        if (ext == "js") {
          resolve(`<script>\n${data}\n</script>`);
        } else if (ext == "css") {
          resolve(`<style>\n${data}\n</style>`);
        } else {
          resolve(`${data}`);
        }
      });
    });
  }
};

const generateUi = function () {
  const promises = files.map((f) => getFiles(f));
  Promise.all(promises)
    .then((res) => {
      fs.writeFile(`./ui.html`, res.join("\n\n"), (err) => {
        if (err) {
          console.error("Can't generate file: ", err);
          return;
        }
        console.log(chalk.green("ui.html created!"));
      });
    })
    .catch((err) => {
      console.log(chalk.red("Error:", err));
    });
};

generateUi();

console.log(chalk.yellow(`👉  Watching files in ${root} ...`));
watch(
  root,
  {
    recursive: true,
    delay: 1000,
  },
  function (evt, name) {
    console.log("%s changed.", name);
    generateUi();
  }
);
