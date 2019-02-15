import Api from './Api'

export default {
  fetchUser () {
    return Api().get('api');
  }
}
