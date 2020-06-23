const config = require("./config");

let head = `
<!DOCTYPE html>
<html lang="en">
  <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content="${config.blogDescription}" />
      <title>${config.blogTitle}</title>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
      <link rel="stylesheet" href="/assets/css/styles.css">
  </head>
  <body>
`

let header = `
  <header>
    <h1><a href="/">${config.blogTitle}</a></h1>
    <ul>
      <li><a href="/pages/about-me">About me</a></li>
      <li><a href="/pages/contact">Contact</a></li>
    </ul>
    <p>${config.aboutBlog}</p>
  </header>
`

let footer = `
    <footer>
      ${`<p>© ${new Date().getFullYear()} ${
        config.metaAthorName
      }, Find the code on <a href="github.com/kartiknair/blog">GitHub</a></p>`}
    </footer>
  </body>
</html>
`

const posthtml = data => `
${head}
  <div class="page-content">
    ${header}
    <div class="post-content">
      <img src="${data.attributes.thumbnail}" />
      <h1>${data.attributes.title}</h1>
      <p>dodane przez ${data.attributes.author}, ${data.attributes.date}</p>
      <hr />
      ${data.body}
    </div>
  </div>
${footer}
`;

const homepage = posts => `
${head}
  <div class="page-content">
      ${header}
      <div class="posts">
          ${posts
            .map(
              post => `<div class="post">
              <h3><a href="/posts/${post.path}">${
                post.attributes.title
              }</a></h3>
                  <small>${new Date(post.attributes.date).toDateString()}, in ${post.attributes.category}</small>
                  <p>${post.attributes.description}</p>
              </div>`
            )
            .join("")}
      </div>
  </div>
${footer}
`;

const pagehtml = data => `
${head}
  <div class="page-content">
    ${header}
    <div class="post-content">
      <h1>${data.attributes.title}</h1>
      ${data.body}
    </div>
  </div>
${footer}
`;

module.exports = {
  homepage: homepage,
  posthtml: posthtml,
  pagehtml: pagehtml
};
