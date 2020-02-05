import React from "react";
import { css } from "@emotion/core";
import { Link, graphql } from "gatsby";

import Layout from "../components/layout";

export default ({ data }) => {
  const siteTitle = "Gatsby Starter Personal Website";

  return (
    <Layout location={'/'} title={siteTitle}>
      {data.allMdx.edges.map(({ node }) => (
        <div key={node.id}>
          <Link
            to={'landing/'+node.fields.slug}
            css={css`
                text-decoration: none;
                color: inherit;
              `}
          >
            <h3>
              {node.frontmatter.title}
            </h3>
            <img src={node.frontmatter.heroImage} alt={'Hero'} width={'100px'}/>
          </Link>
        </div>
      ))}
    </Layout>
  );

}

export const query = graphql`
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
`;
