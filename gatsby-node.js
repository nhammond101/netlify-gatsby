const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  const landingPage = path.resolve(`./src/templates/landing-page.js`);
  return graphql(
    `
      query AllLandingPages {
        allMdx(limit: 1000) {
        edges {
          node {
            frontmatter {
              title
              description
              bottomHero
              charities
              heroImage
              howToPlay
              testimonialImage
              testimonialText
            }
            fields {
              slug
            }
          }
        }
      }
    }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors;
    }

    console.log(JSON.stringify(result, null, 2));

    // Create landing posts pages.
    const posts = result.data.allMdx.edges;

    posts.forEach((page, index) => {
      const previous = index === posts.length - 1 ? null : posts[index + 1].node;
      const next = index === 0 ? null : posts[index - 1].node;
      console.log(`post: ${JSON.stringify(page, null,2)}`);
      createPage({
        path: `landing${page.node.fields.slug}`,
        component: landingPage,
        context: {
          slug: page.node.fields.slug,
          title: page.node.fields.title,
          data: page.node.frontmatter,
          previous,
          next,
        },
      });
    });

    return null;
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `Mdx`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};
