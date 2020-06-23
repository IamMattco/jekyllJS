const config = require("./config");
const fm = require("front-matter");
const marked = require("marked");
const fs = require("fs");

const templates = require("./templates");

const createPage = pagePath => {
  const data = fs.readFileSync(`${config.dev.pagesdir}/${pagePath}.md`, "utf8");
  const content = fm(data);
  content.body = marked(content.body);
  content.path = pagePath;
  return content;
};

const createPages = pages => {
  pages.forEach(page => {
    if (!fs.existsSync(`${config.dev.pageoutdir}/${page.path}`))
      fs.mkdirSync(`${config.dev.pageoutdir}/${page.path}`);

    fs.writeFile(
      `${config.dev.pageoutdir}/${page.path}/index.html`,
      templates.pagehtml(page),
      e => {
        if (e) throw e;
        console.log(`pages/${page.path}/index.html was created successfully`);
      }
    );
  });
};

module.exports = {
  createPage: createPage,
  createPages: createPages
};
