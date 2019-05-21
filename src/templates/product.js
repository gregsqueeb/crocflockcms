import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import BlogRoll from '../components/BlogRoll'
import Content, { HTMLContent } from '../components/Content'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import Countdown from 'react-countdown-now';


export const ProductTemplate = ({
  content,
  contentComponent,
  description,
  featuredimage,
  title,
  helmet,
  price,
  presale,
  gumroadlink,
  id,
}) => {
  const PostContent = contentComponent || Content

  let button;
  if (presale) {
    button = <a className="button" href={gumroadlink}>Pre Order</a>
  } else {
    button = <a className="button" href={gumroadlink}>Buy Now</a>
  } 

  const renderer = ({ minutes, seconds }) => {
      if(seconds < 10){
        seconds = "0"+seconds
      }
      return <span>{minutes}:{seconds}</span>;
  };

  return (
    <div>
      <div className="main-product">
        {helmet || ''}
        <div className="top-container">
        <div className="product-image">
          <PreviewCompatibleImage
                      className="product-image"
                      imageInfo={{
                        image: featuredimage,
                        alt: `featured image thumbnail for post ${
                          title
                        }`,
                      }}
                    />
          </div>
          <div className="product-overview">
            <h1 className="product-name">{title}</h1>
            <h2 className="product-price">${price}</h2>
            <p className="product-description">{description}</p>
            {button}
            <p className="time-countdown"><span id="time"><Countdown zeroPadTime={2} date={Date.now() + (1000 * 60 * 5) } renderer={renderer} /></span> time left to buy</p>
          </div>
        </div>
        <div className="product-details">
          <h3 className="details-header">product details</h3>
          <PostContent content={content} />
        </div>
      </div>
      <BlogRoll exclude={id}/>
    </div>
  )
}

ProductTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  gumroadlink: PropTypes.string,
  price: PropTypes.number,
  featuredimage: PropTypes.object,
  title: PropTypes.string,
  helmet: PropTypes.object,
  id: PropTypes.string,
}

const Product = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <ProductTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        gumroadlink={post.frontmatter.gumroadlink}
        price={post.frontmatter.price}
        featuredimage={post.frontmatter.featuredimage}
        id={post.id}
        helmet={
          <Helmet titleTemplate="%s | Blog">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
            <script>
              {/* Start the timer when they change the page */}
              var fiveMinutes = 60 * 5,
              display = document.querySelector('#time');
              startTimer(fiveMinutes, display);
            </script>
          </Helmet>
        }
        title={post.frontmatter.title}
      />
    </Layout>
  )
}

Product.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default Product

export const pageQuery = graphql`
  query ProductByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        gumroadlink
        price
        featuredimage {
          childImageSharp {
            fluid(maxWidth: 360, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
