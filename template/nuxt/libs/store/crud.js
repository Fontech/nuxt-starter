const normalizeTransform = (transform) => {
  if (typeof transform === 'function') {
    return transform
  }

  return data => data
}

export default (transform) => {
  transform = normalizeTransform(transform)

  return {
    state: {
      list: [],
      data: {},
      total: 0
    },
    mutations: {
      setList (state, list) {
        state.list = list
      },
      setData (state, data) {
        state.data = data
      },
      appendToList (state, list) {
        state.list = state.list.concat(list)
      },
      setTotal (state, total) {
        state.total = total
      }
    },
    getters: {
      list ({ list }) {
        return list.map(data => transform(data))
      },
      data ({ data }) {
        return transform(data)
      },
      total ({ total }) {
        return total
      }
    }
  }
}
