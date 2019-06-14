import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'

class BlogRoll extends React.Component {
  render() {
    const { data, exclude } = this.props
    const { edges: allproducts } = data.allMarkdownRemark
    let products;
    if(exclude) {
      products = allproducts.filter((product, index, array ) => {
        return exclude !== product.node.id;
      })
    } else {
      products = allproducts
    }
    return (
      <ul className="additional-products-list">
        {products &&
          products.map(({ node: product }) => (
            <li className="additional-product" key={product.id}>
            <Link to={product.fields.slug}>
            <div className="image-container">
                {product.frontmatter.featuredimage ? (
                <div className="additional-product-image">
                  <PreviewCompatibleImage
                    imageInfo={{
                      image: product.frontmatter.featuredimage,
                      alt: `featured image thumbnail for post ${
                        product.title
                      }`,
                      bgImage: true,
                      style: {
                        backgroundSize: "contain",
                        height: 300
                      }
                    }}
                  />
                </div>
              ) : null}
            </div>
            </Link>
            <div className="title-container">
                <h2 className="addition-product-title">{product.frontmatter.title}</h2>
                <h2 className="addition-product-price">${product.frontmatter.price}</h2>
                <Link className="button" to={product.fields.slug}>Check it out</Link>
            </div>
          </li>
          ))}
      </ul>
    )
  }
}

BlogRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
  exclude: PropTypes.string,
}

export default ({exclude}) => {

  const excludeId = exclude
  return (
  <StaticQuery
    query={graphql`
      query BlogRollQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "product" } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 400)
              id
              fields {
                slug
              }
              frontmatter {
                title
                templateKey
                date(formatString: "MMMM DD, YYYY")
                price
                featuredimage {
                  childImageSharp {
                    fluid(maxWidth: 120, quality: 100) {
                      ...GatsbyImageSharpFluid_noBase64
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    exclude={excludeId}
    render={(data, count) => {
      return(
      <BlogRoll data={data} count={count} exclude={exclude} />
      )
    }}
  />
)}
