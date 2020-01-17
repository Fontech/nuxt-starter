const env = process.env.ENV || 'development'
const useMockApi = process.argv.includes('--use-mock-api')

const configs = {
  development: {
    srcUrl: 'http://localhost:3000',
    apiBaseUrl: 'http://localhost:3000/api',
    siteUrl: 'https://project-name.fontech.co'
  },
  staging: {
    srcUrl: 'https://server.project-name.fontech.co/',
    apiBaseUrl: 'https://server.project-name.fontech.co/api',
    siteUrl: 'https://project-name.fontech.co'
  },
  production: {
    srcUrl: 'https://server.project-name.com.tw',
    apiBaseUrl: 'https://server.project-name.com.tw/api',
    siteUrl: 'https://project-name.com.tw'
  }
}[env]

module.exports = {
  ...configs,
  server: env,
  useMockApi
}
