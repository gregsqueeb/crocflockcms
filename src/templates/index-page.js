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
    <div className="hero-container">
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
      <div className="dashes-container">
      <img className="dash vertical-top-left" src="./img/verticalstripe.svg" />
      <img className="dash vertical-top-right" src="./img/verticalstripe.svg" />
      <img className="dash horizontal-top-left" src="./img/horizontalstripe.svg" />
      <img className="dash horizontal-top-right" src="./img/horizontalstripe.svg" />
        <div
          className="hero-text-container"
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
        <img className="dash vertical-bottom-left" src="./img/verticalstripe.svg" />
        <img className="dash vertical-bottom-right" src="./img/verticalstripe.svg" />
        <img className="dash horizontal-bottom-left" src="./img/horizontalstripe.svg" />
        <img className="dash horizontal-bottom-right" src="./img/horizontalstripe.svg" />
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
