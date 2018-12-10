import React from 'react'
import App, { Container } from 'next/app'
import queryString from 'query-string'

export default class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    if (ctx.req) return {}

    return App.getInitialProps({ Component, router, ctx })
  }

  state = {
    pageProps: null,
    loading: true
  }

  async componentDidMount() {
    const { Component, router } = this.props
    const query = queryString.parseUrl(router.asPath).query
    const { pageProps } = await App.getInitialProps({
      Component,
      router,
      ctx: {
        pathname: router.pathname,
        query,
        asPath: router.asPath
      }
    })
    this.setState({ pageProps, loading: false })
  }

  render() {
    const { Component } = this.props
    const { loading } = this.state
    const pageProps = this.props.pageProps || this.state.pageProps

    if (loading) {
      return (
        <Container>
          <div>Loading...</div>
        </Container>
      )
    }

    return (
      <Container>
        <Component {...pageProps} />
      </Container>
    )
  }
}
