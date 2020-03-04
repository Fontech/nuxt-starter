export default (...mixins) => {
  const store = mixins.reduce((store, mixin) => {
    return mixin.reduce((carry, part, key) => {
      return {
        ...carry,
        [key]: {
          ...(carry[key] || {}),
          ...part
        }
      }
    }, store)
  }, {})

  return {
    ...store,
    state: () => store.state
  }
}
