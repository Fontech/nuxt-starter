import Vue from 'vue'

export default () => ({
  state: {
    form: {}
  },
  mutations: {
    setFormFields ({ form }, fields) {
      fields.each((value, key) => {
        Vue.set(form, key, value)
      })
    }
  },
  getters: {
    form ({ form }) {
      return form
    }
  },
  actions: {
    setFormFields ({ commit }, fields) {
      commit('setFormFields', fields)
    }
  }
})
