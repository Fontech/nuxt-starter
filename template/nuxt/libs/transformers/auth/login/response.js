export default ({ message: { player: { apiToken } } }) => {
  return {
    accessToken: apiToken
  }
}
