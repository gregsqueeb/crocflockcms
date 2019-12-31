import React from 'react'
import Helmet from 'react-helmet'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import './all.scss'
import './normalize.css'
import useSiteMetadata from './SiteMetadata'

const TemplateWrapper = ({ children }) => {
  const { title, description } = useSiteMetadata()
  const windowGlobal = typeof window !== 'undefined' && window;

  if(typeof windowGlobal !== 'undefined' && typeof windowGlobal.Snipcart !== 'undefined' && typeof windowGlobal.Snipcart.unsubscribe !== 'undefined'){
    // Unsub, and then sub again so that we don't create a ton of subscriptions which end up doubling up on analytics events
    windowGlobal.Snipcart.unsubscribe('item.adding');
    windowGlobal.Snipcart.unsubscribe('cart.opened');
    windowGlobal.Snipcart.unsubscribe('cart.closed');
    windowGlobal.Snipcart.unsubscribe('order.completed');
    windowGlobal.Snipcart.unsubscribe('billingaddress.changed');
    windowGlobal.Snipcart.unsubscribe('shippingaddress.changed');

    windowGlobal.Snipcart.subscribe('item.adding', function (ev, item, items) {
      if (typeof windowGlobal.amplitude === 'object') {
        windowGlobal.amplitude.getInstance().logEvent("item_added", {
          href: windowGlobal.location.pathname,
          item: item, 
        });
      }
    });

    windowGlobal.Snipcart.subscribe('cart.opened', function(e) {
      if (typeof windowGlobal.amplitude === 'object') {
        windowGlobal.amplitude.getInstance().logEvent("cart_open", {
          href: windowGlobal.location.pathname,
        });
      }
      console.log('Snipcart popup is visible');
    });

    windowGlobal.Snipcart.subscribe('cart.closed', function() {

      if (typeof windowGlobal.amplitude === 'object') {
        windowGlobal.amplitude.getInstance().logEvent("cart_close", {
          href: windowGlobal.location.pathname,
        });
      }

      console.log('Snipcart popup has been closed');
    });

    windowGlobal.Snipcart.subscribe('order.completed', function (data) {

      windowGlobal.amplitude.getInstance().logEvent("purchase", {
        order_info: data,
      });
      windowGlobal.amplitude.getInstance().setUserId(data.email);
      windowGlobal.amplitude.getInstance().Identify().add('num_orders', 1).add('ltv',data.total)

      console.log(data);
    });

    windowGlobal.Snipcart.subscribe('billingaddress.changed', function (address) {
      windowGlobal.amplitude.getInstance().setUserId(address.email);
      windowGlobal.amplitude.getInstance().logEvent("billing_address", {
        data: address,
      });
      console.log(address);
    })

    windowGlobal.Snipcart.subscribe('shippingaddress.changed', function (address) {
      windowGlobal.amplitude.getInstance().logEvent("shipping_address", {
        data: address,
      });
      windowGlobal.amplitude.getInstance().setUserId(address.email);

      console.log(address);
    })
  }
  
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
      </Helmet>
      <Navbar />
      <div>{children}</div>
      <Footer />
    </div>
  )
}

export default TemplateWrapper
