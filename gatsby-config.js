const isProd = process.env.NODE_ENV === "production"

module.exports = ({ baseUrl = "/", sanity = {} }) => ({
  siteMetadata: {
    title: `HeySugar`,
    description: `HeySugar is a blood sugar management tool developed with Jamstack in mind.`,
    author: `Jamie Bradley - @jamiebradley234`,
    baseUrl,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        postCssPlugins: [
          require("tailwindcss")(__dirname + "/tailwind.config.js"),
        ],
      },
    },
    {
      resolve: "gatsby-source-sanity",
      options: {
        projectId: sanity.projectId,
        dataset: sanity.dataset,
        token: sanity.token,
        watchMode: sanity.watchMode || (sanity.token && !isProd),
        overlayDrafts: sanity.overlayDrafts || !isProd,
      },
    },
  ],
})
