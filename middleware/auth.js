export default ({ store, redirect, route }) => {
  if (
    !store.state.auth.isAuthenticated &&
    route.path !== '/login' &&
    route.path !== '/'
  ) {
    return redirect('/login')
  }
}
