/**
 * @typedef {Object} Links
 * @prop {string} github Your github repository
 */

/**
 * @typedef {Object} MetaConfig
 * @prop {string} title Your website title
 * @prop {string} description Your website description
 * @prop {string} author Maybe your name
 * @prop {string} siteUrl Your website URL
 * @prop {string} lang Your website Language
 * @prop {string} utterances Github repository to store comments
 * @prop {Links} links
 * @prop {string} favicon Favicon Path
 */

/** @type {MetaConfig} */
const metaConfig = {
  title: "Nick's Page",
  description: `Nick's Blog`,
  author: "Nick",
  siteUrl:
    "https://nextjs-boilerplate-e4ahg82u0-nicks-projects-fd7a2f07.vercel.app/",
  lang: "en",
  utterances: "nicholasmullikin/website-comments",
  links: {
    github: "https://github.com/nicholasmullikin/gatsby-starter-apple",
  },
  favicon: "src/images/icon.png",
}

// eslint-disable-next-line no-undef
module.exports = metaConfig
