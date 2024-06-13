import Vue from 'vue'
import Vuex from 'vuex'
import { login } from '@/api/user/login'

Vue.use(Vuex)

let v = new Vue()

const store = new Vuex.Store({
  state: {
    loading: false,
    user: null
  },
  mutations: {
    setLoading(state, data) {
      state.loading = data
    },
    setUser(state, data) {
      state.user = data
    }
  },
  actions: {
    //登陆方法ctx相当于store
    async login(ctx, msg) {
      //登陆状态设置为true
      ctx.commit("setLoading", true)
      var result = {}
      await login(msg).then(response => {
        result = response
      })
      if (result && result.code === 200) {
        //登录成功
        ctx.commit('setUser', result.data)
        //登陆成功后登陆状态设置为false
        ctx.commit('setLoading', false)
        localStorage.setItem('account', result.data.account)
        v.$notify.success({
          message: '登陆成功'
        })
      }
      //返回登陆是否成功
      return result
    },
    //注销
    async logout(ctx) {
      ctx.commit('setUser', null)
      ctx.commit('setLoading', false)
    }
  },
  getters: {
    status(state) {
      if (state.loading) {
        return 'loading'
      } else if (state.user) {
        return 'login'
      } else {
        return 'unlogin'
      }
    }
  }
})

export default store