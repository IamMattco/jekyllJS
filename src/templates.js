const config = require("./config");

let header = `
<!DOCTYPE html>
<html lang="en">
  <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content="${config.blogDescription}" />
      <title>${config.blogTitle}</title>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
  </head>
  <body>
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
${header}
  <header>
    <a href="/">Go back home</a>
  </header>
  <div class="post-content">
    <img src="${data.attributes.thumbnail}" />
    <h1>${data.attributes.title}</h1>
    <p>dodane przez ${data.attributes.author}, ${data.attributes.date}</p>
    <hr />
    ${data.body}
  </div>
${footer}
`;

const homepage = posts => `
${header}
  <div class="grotesk">
      <header>
          <h1>${config.blogTitle}</h1>
          <p>—</p>
          <p>This blog is written by ${config.metaAuthorName}, ${
config.authorDescription
}. To find out what he's up to <a href="${
config.authorTwitter
}">follow him on twtter</a></p>
          <hr />
      </header>
      <div class="posts">
          ${posts
            .map(
              post => `<div class="post">
              <h3><a href="/posts/${post.path}">${
                post.attributes.title
              }</a></h3>
                  <small>${new Date(
                    parseInt(post.attributes.date)
                  ).toDateString()}</small>
                  <p>${post.attributes.description}</p>
              </div>`
            )
            .join("")}
      </div>
  </div>
${footer}
`;

const pagehtml = data => `
${header}
  <header>
    <a href="/">Go back home</a>
  </header>
  <div class="post-content">
    <h1>${data.attributes.title}</h1>
    ${data.body}
  </div>
${footer}
`;

module.exports = {
  homepage: homepage,
  posthtml: posthtml,
  pagehtml: pagehtml
};
