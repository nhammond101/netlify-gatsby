const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  const blogPost = path.resolve(`./src/templates/landing-page.js`);
  return graphql(
    `
      query AllBlogs {
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

    // Create blog posts pages.
    const posts = result.data.allMdx.edges;

    posts.forEach((post, index) => {
      const previous = index === posts.length - 1 ? null : posts[index + 1].node;
      const next = index === 0 ? null : posts[index - 1].node;
      console.log(`post: ${JSON.stringify(post, null,2)}`);
      createPage({
        path: `blog${post.node.fields.slug}`,
        component: blogPost,
        context: {
          slug: post.node.fields.slug,
          title: post.node.fields.title,
          data: post.node.frontmatter,
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
