
/**
 * token 处理
 */

const TOKEN_KEY = `access_token`;
const Auth = {
  get() {
    return localStorage.getItem(TOKEN_KEY);
  },
  set(value: string|undefined|null) {
    if (value){
      localStorage.setItem(TOKEN_KEY, value);
    }
  },
  del() {
    return localStorage.removeItem(TOKEN_KEY)
  }
};
export default Auth;