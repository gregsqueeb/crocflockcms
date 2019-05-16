import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'

class BlogRoll extends React.Component {
  render() {
    const { data } = this.props
    const { edges: products } = data.allMarkdownRemark

    return (
      <ul className="additional-products-list">
        {products &&
          products.map(({ node: product }) => (
            <li className="additional-product" key={product.id}>
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
            <div className="title-container">
                <h2 className="addition-product-title">{product.frontmatter.title}</h2>
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
}

export default () => (
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
                featuredimage {
                  childImageSharp {
                    fluid(maxWidth: 120, quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <BlogRoll data={data} count={count} />}
  />
)
