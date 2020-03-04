export default () => ({
  state: {
    step: 1
  },
  mutations: {
    setStep (state, value) {
      state.step = value
    }
  },
  getters: {
    step ({ step }) {
      return step
    }
  },
  actions: {
    setStep ({ commit }, value) {
      commit('setStep', value)
    },
    prevStep ({ state, commit }) {
      commit('setStep', state.step - 1)
    },
    nextStep ({ state, commit }) {
      commit('setStep', state.step + 1)
    }
  }
})
