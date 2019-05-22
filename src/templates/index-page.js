import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'

import Layout from '../components/Layout'
import BlogRoll from '../components/BlogRoll'

export const IndexPageTemplate = ({
  image,
  title,
  heading,
  subheading,
  mainpitch,
  link,
  buttontext,
}) => (
  <div className="container">
    <div>
      <div
        className="full-width-image hero margin-top-0"
        style={{
          backgroundImage: `url(${
            !!image.childImageSharp ? image.childImageSharp.fluid.src : image
          })`,
          backgroundPosition: `center center`,
          backgroundSize: `cover`,
          backgroundRepeat: `no-repeat`,
          flex: '1',
        }}
      >
    </div>
      <div
        style={{
          display: 'flex',
          lineHeight: '1',
          justifyContent: 'space-around',
          alignItems: 'left',
          justifyItems: 'center',
          flexDirection: 'column',
          flex: '1',
          position: 'relative',
        }}
      >
        <h1
          className="shadow-text"
          style={{
            color: 'black',
            lineHeight: '55px',
            fontSize: '40px',
          }}
        >
          <span className="front-text">{title}</span>
          <span className="rear-text">{title}</span>
          <Link className="button" to={link}>{buttontext}</Link>
        </h1>
      </div>
    </div>
    <section className="section section--gradient">
      <BlogRoll />
    </section>
  </div>
)

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  mainpitch: PropTypes.object,
}

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <IndexPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        buttontext={frontmatter.buttontext}
        link={frontmatter.link}
        heading={frontmatter.heading}
        subheading={frontmatter.subheading}
        mainpitch={frontmatter.mainpitch}
      />
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        heading
        subheading
        link
        buttontext
      }
    }
  }
`
