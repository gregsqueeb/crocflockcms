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
  published,
  gumroadlink,
  id,
}) => {
  const PostContent = contentComponent || Content

  const renderer = ({ minutes, seconds }) => {
      if(seconds < 10){
        seconds = "0"+seconds
      }
      return <span>{minutes}:{seconds}</span>;
  };

  return (
    <div>
        {helmet || ''}
      <div className="top-container">
        <div className="product-image">
          <div className="image-background" style={{
            background: 'no-repeat center center',
            backgroundImage: 'url(' + featuredimage.childImageSharp.fluid.src + ')',
            backgroundSize: 'contain',
            height: '100%',
            width: '100%',
          }}>

          </div>
        </div>
        <div className="product-deets">
          <div className="product-overview">
            <h1
            className="shadow-text product-name"
            style={{
              color: 'black',
              lineHeight: '55px',
              fontSize: '40px',
            }}
          >
              <span className="front-text">{title}</span>
              <span className="rear-text">{title}</span>
              {/* <Link className="button" to={link}>{buttontext}</Link> */}
            </h1>
            <div className="overview-details">
              <p className="product-description">{description}</p>
              <h2 className="product-price">${price}</h2>
              <button
                  className="snipcart-add-item real-button"
                  data-item-id="2"
                  data-item-name={title}
                  data-item-price={price}
                  data-item-weight="3"
                  data-item-image={"https://crocflock.com"+featuredimage.childImageSharp.fluid.src}
                  data-item-url="http://crocflock.com"
                  data-item-description={content}>
                      Buy Now
              </button>
            </div>
            {/* <p className="time-countdown"><span id="time"><Countdown zeroPadTime={2} date={Date.now() + (1000 * 60 * 5) } renderer={renderer} /></span> time left to buy</p> */}
          </div>
          <div className="product-details">
            <h3 className="details-header">product details</h3>
            <PostContent content={content} />
          </div>
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
  presale: PropTypes.bool,
  published: PropTypes.bool,
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
        presale={post.frontmatter.presale}
        published={post.frontmatter.published}
        featuredimage={post.frontmatter.featuredimage}
        id={post.id}
        helmet={
          <Helmet titleTemplate="%s | Blog">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
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
        presale
        published
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
