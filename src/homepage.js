const config = require("./config");
const fm = require("front-matter");
const marked = require("marked");
const fs = require("fs");
const templates = require("./templates");

const addHomePage = posts => {
  fs.writeFile(`${config.dev.maindir}/index.html`, templates.homepage(posts), e => {
    if (e) throw e;
    console.log(`index.html was created successfully`);
  });
};

module.exports = {
  addHomePage: addHomePage
};

