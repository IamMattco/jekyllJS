const config = require("./config");
const fm = require("front-matter");
const marked = require("marked");
const fs = require("fs");

const pagehtml = data => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${data.attributes.description}" />
    <title>${data.attributes.title}</title>
    
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
  </head>
    <body>
      <header>
        <a href="/">Go back home</a>
      </header>
      <div class="post-content">
        <h1>${data.attributes.title}</h1>
        ${data.body}
      </div>
    </body>
</html>
`;

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
      pagehtml(page),
      e => {
        if (e) throw e;
        console.log(`${page.path}/index.html was created successfully`);
      }
    );
  });
};

module.exports = {
  createPage: createPage,
  createPages: createPages
};
