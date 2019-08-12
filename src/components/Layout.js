import React from 'react'
import Helmet from 'react-helmet'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import './all.scss'
import './normalize.css'
import useSiteMetadata from './SiteMetadata'

const TemplateWrapper = ({ children }) => {
  const { title, description } = useSiteMetadata()

  window.Snipcart.subscribe('item.adding', function (ev, item, items) {
    if (typeof window.amplitude === 'object') {
      window.amplitude.getInstance().logEvent("item_added", {
        href: window.location.pathname,
        item: item, 
      });
    }
  });

  window.Snipcart.subscribe('cart.opened', function(e) {
    if (typeof window.amplitude === 'object') {
      window.amplitude.getInstance().logEvent("cart_open", {
        href: window.location.pathname,
      });
    }
    console.log('Snipcart popup is visible');
  });

  window.Snipcart.subscribe('cart.closed', function() {

    if (typeof window.amplitude === 'object') {
      window.amplitude.getInstance().logEvent("cart_close", {
        href: window.location.pathname,
      });
    }

    console.log('Snipcart popup has been closed');
  });

  window.Snipcart.subscribe('order.completed', function (data) {

    window.amplitude.getInstance().logEvent("purchase", {
      order_info: data,
    });
    window.amplitude.getInstance().setUserId(data.email);
    window.amplitude.getInstance().Identify().add('num_orders', 1).add('ltv',data.total)

    console.log(data);
  });

  window.Snipcart.subscribe('billingaddress.changed', function (address) {
    window.amplitude.getInstance().logEvent("billing_address", {
      data: address,
    });
    window.amplitude.getInstance().setUserId(address.email);

    console.log(address);
  })

  window.Snipcart.subscribe('shippingaddress.changed', function (address) {
    window.amplitude.getInstance().logEvent("shipping_address", {
      data: address,
    });
    window.amplitude.getInstance().setUserId(address.email);

    console.log(address);
  })
  
  return (
    <div>
      <Helmet>
        <html lang="en" />
        <title>{title}</title>
        <meta name="description" content={description} />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/img/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          href="/img/favicon-32x32.png"
          sizes="32x32"
        />
        <link
          rel="icon"
          type="image/png"
          href="/img/favicon-16x16.png"
          sizes="16x16"
        />

        <link
          rel="mask-icon"
          href="/img/safari-pinned-tab.svg"
          color="#ff4400"
        />
        <meta name="theme-color" content="#fff" />

        <meta property="og:type" content="business.business" />
        <meta property="og:title" content={title} />
        <meta property="og:url" content="/" />
        <meta property="og:image" content="/img/og-image.jpg" />
        <link href="https://fonts.googleapis.com/css?family=Cute+Font|Open+Sans:400,400i,700,700i&display=swap" rel="stylesheet" />
        <script src="https://gumroad.com/js/gumroad.js" />
      </Helmet>
      <Navbar />
      <div>{children}</div>
      <Footer />
    </div>
  )
}

export default TemplateWrapper
