import React from 'react'

import Layout from '../../components/Layout'
import BlogRoll from '../../components/BlogRoll'

export default class Products extends React.Component {
  render() {
    return (
      <Layout>
        <h1 className="all-charms-header">All Charms</h1>
        <BlogRoll />
      </Layout>
    )
  }
}
