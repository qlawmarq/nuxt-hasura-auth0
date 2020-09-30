export default function setup(context) {
  context.$axios.onRequest((config) => {
    const isRequiredTokenHost = new URL(config.url).host
    if (isRequiredTokenHost === 'dev.eye-api.exmaple.com') {
      config.headers = {
        Authorization: 'Bearer ' + context.store.state.auth.idToken
      }
    }
    if (!window.navigator.onLine) {
      alert('現在オフラインです。')
    }
  })
  context.$axios.onError((error) => {
    console.error(error)
  })
}
