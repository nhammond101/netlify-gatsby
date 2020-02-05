import React from "react";
import Layout from "../components/layout";
import Style from './landing-page.module.css';
import styled from 'styled-components';

const Footer = styled.footer`
  text-align: center;
  margin: 24px;
  font-size: 10px;
`

export default ({ data }) => {
  console.log(data);
  const page = data.mdx.frontmatter;
  return (
    <Layout location={'blog/' + data.mdx.fields.slug} title={page.title}>
      <section className='hero'>
        <img src={'/' + page?.heroImage || 'url'} alt='Hero Image'/>
      </section>

      <section className={Style.testimonial}>
        <div className={Style.testimonialImage}>
          <img src={'/' + page?.testimonialImage} alt='Testimonial Video 1'/>
        </div>
        <div className='testimonial-text'>
          <p>{page?.testimonialText}</p>
        </div>
      </section>

      <section className={Style.howToPlay}>
        <div >&nbsp;</div>
        <div>
          <img src={'/' + page?.howToPlay} alt='How To Play'/>
        </div>
        <div >&nbsp;</div>
      </section>

      <section className={Style.bottomHero}>
        <img src={'/' + page?.bottomHero} alt='Bottom Image'/>
      </section>

      <Footer>
        <p>*£10 to be entered into all draws, paid monthly in advance. Winning postcodes for March's draws announced daily from 7 Mar to 3 Apr. Estimated max possible ticket prize in the March millions draw is £196,000, which is 10% of estimated draw proceeds.</p>

        <p>People's Postcode Lottery manages 20 draws per month across multiple lotteries for good causes who receive a minimum of 32% of each ticket sale. To find out draw dates, which good cause promotes and benefits from each draw, and the relevant prizes, see Prize Draw Calendar.</p>

        <p>Not available in NI. See Terms and Conditions and Privacy Policy. For assistance visit Contact Us.</p>

        <p>Postcode Lottery Limited is incorporated in England and Wales and is licensed and regulated by the Gambling Commission, see licence status here. Registered office: Postcode Lottery Ltd, 2nd Floor, 31 Chertsey Street, Guildford, Surrey, GU1 4HD. Company reg. no. 04862732. VAT reg. no 848 3165 07. Trading address: 28 Charlotte Square, Edinburgh, EH2 4ET. © 2020 Postcode Lottery Ltd.</p>

        <p>Terms & Conditions | Privacy Policy | Responsible Play | Self-Exclusion | Modern Slavery Statement (PDF) | Sitemap</p>
        <img src={'/assets/BeGambleAware_Black_WebsiteFooter.svg'} width={'200px'} alt={'Be Gamble Aware'}/>
      </Footer>
    </Layout>
  );
}

export const query = graphql`
  query BlogPostBySlug($slug: String! = "/new-blog/") {
  site {
    siteMetadata {
      title
      author
    }
  }
  mdx(fields: {slug: {eq: $slug}}) {
    id
    fields {
      slug
    }
    frontmatter {
      bottomHero
      charities
      description
      heroImage
      howToPlay
      testimonialImage
      testimonialText
      title
    }
  }
}
`;
