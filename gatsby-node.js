/**
 * Create Pages from datasets
 */
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  console.log("JAMIE!!!! \n\n")

  // Get the pages
  const bloodResult = graphql(`
    {
      allSanityRecord {
        edges {
          node {
            id
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      throw result.errors
    }

    const pages = result.data.allSanityRecord.edges || []

    pages.forEach(edge => {
      const path = `/result/${edge.node.id}`

      createPage({
        path,
        component: require.resolve(`./src/templates/result.js`),
        context: {
          id: edge.node.id,
        },
      })
    })
  })

  // Return a Promise which would wait for both the queries to resolve
  return Promise.all([bloodResult])
}
