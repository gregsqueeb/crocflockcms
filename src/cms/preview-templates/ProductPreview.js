import React from 'react'
import PropTypes from 'prop-types'
import { ProductTemplate } from '../../templates/product'

const ProductPreview = ({ entry, widgetFor }) => (
  <ProductTemplate
    content={widgetFor('body')}
    description={entry.getIn(['data', 'description'])}
    title={entry.getIn(['data', 'title'])}
  />
)

ProductPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default ProductPreview
