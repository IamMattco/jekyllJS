const fs = require("fs");
const postMethods = require("./posts");
const pageMethods = require("./pages");
const config = require("./config");
const addHomePage = require("./homepage");

const posts = fs
  .readdirSync(config.dev.postsdir)
  .map(post => post.slice(0, -3))
  .map(post => postMethods.createPost(post))
  .sort(function(a, b) {
    return new Date(b.attributes.date) - new Date(a.attributes.date);
  });

  const pages = fs
  .readdirSync(config.dev.pagesdir)
  .map(page => page.slice(0, -3))
  .map(page => pageMethods.createPage(page))
  .sort(function(a, b) {
    return b.attributes.date - a.attributes.date;
  });

if (!fs.existsSync(config.dev.outdir)) fs.mkdirSync(config.dev.outdir);

postMethods.createPosts(posts);
pageMethods.createPages(pages);
addHomePage.addHomePage(posts);
