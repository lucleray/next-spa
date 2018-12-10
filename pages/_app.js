import React from 'react'
import App, { Container } from 'next/app'
import queryString from 'query-string'
import Router from 'next/router'

export default class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    if (ctx.req) return { __ssr: true }

    return App.getInitialProps({ Component, router, ctx })
  }

  state = { loading: true }

  componentDidUpdate(prevProps) {
    if (prevProps.__ssr && !this.props.__ssr) {
      this.setState({ loading: false })
    }
  }

  async componentDidMount() {
    const { router } = this.props
    const query = queryString.parseUrl(router.asPath).query
    router.replace({ pathname: router.pathname, query }, router.asPath)
  }

  render() {
    const { Component, pageProps } = this.props
    const { loading } = this.state

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
