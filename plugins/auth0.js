/*
 ** auth0 configuration for @auth0/auth0-spa-js
 ** https://auth0.com/docs/libraries/auth0-spa-js
 ** https://auth0.github.io/auth0-spa-js/
 */

import { Auth0Client } from '@auth0/auth0-spa-js'
import FETCH_USER from '~/apollo/queries/fetchUser.gql'

export default (context, inject) => {
  const auth0Client = new Auth0Client({
    domain: process.env.AUTH0_DOMAIN,
    client_id: process.env.AUTH0_CLIENT_ID,
    redirect_uri: window.location.origin,
    cacheLocation: 'localstorage'
  })

  const login = () => {
    auth0Client.loginWithRedirect()
  }

  const callback = () => {
    window.addEventListener('load', async () => {
      await auth0Client.handleRedirectCallback()
      await syncUser()
    })
  }

  const syncUser = async () => {
    const isAuthenticated = await auth0Client.isAuthenticated()
    if (isAuthenticated && !context.store.state.auth.isAuthenticated) {
      const user = await auth0Client.getUser()
      const token = await auth0Client.getTokenSilently()
      const JWT = await auth0Client.getIdTokenClaims()
      const idToken = JWT.__raw
      window.localStorage.setItem('idToken', idToken)
      const accessToken = window.localStorage.getItem('idToken')
      await context.app.$apolloHelpers.onLogin('Bearer ' + accessToken)

      // graphqlサーバからユーザー情報取得
      const client = context.app.apolloProvider.defaultClient

      const { data } = await client.query({
        query: FETCH_USER, // キャッシュ無効化
        variables: { auth0_id: user.sub }
      })

      context.store.dispatch('auth/setUserInfo', {
        isAuthenticated,
        token,
        user: data.users[0],
        idToken
      })
      // ユーザーロールが未設定
      if (!data.users[0].user_roles) {
        context.redirect('/profile')
      }
    }
  }

  const logout = async () => {
    await context.store.dispatch('auth/setUserInfo', {})
    const option = {
      // returnTo: window.location.origin + '/login'
    }
    auth0Client.logout(option)
  }

  const getTokenForAPI = async () => {
    const data = {
      client_id: 'example',
      client_secret: 'example',
      audience: process.env.AUTH0_AUDIENCE,
      grant_type: 'client_credentials'
    }
    return await context.app.$axios
      .post(`https://${process.env.AUTH0_DOMAIN}/oauth/token`, data)
      .catch((err) => {
        alert(err)
      })
  }

  const auth0 = {
    login,
    logout,
    callback,
    syncUser,
    getTokenForAPI
  }
  inject('auth0', auth0)
}
