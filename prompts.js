const { random } = require('superb')

module.exports = [
  {
    name: 'name',
    message: 'Project name',
    default: '{outFolder}'
  },
  {
    name: 'description',
    message: 'Project description',
    default: `My ${random()} Nuxt.js project`
  },
  {
    name: 'author',
    type: 'string',
    message: 'Author name',
    default: '{gitUser.name}',
    store: true
  },
  {
    name: 'pm',
    message: 'Choose the package manager',
    choices: [
      { name: 'Yarn', value: 'yarn' },
      { name: 'Npm', value: 'npm' }
    ],
    type: 'list',
    default: 'yarn'
  },
  {
    name: 'ui',
    message: 'Choose UI framework',
    type: 'list',
    pageSize: 15,
    choices: [
      { name: 'None', value: 'none' },
      { name: 'Ant Design Vue', value: 'ant-design-vue' },
      { name: 'Bootstrap Vue', value: 'bootstrap' },
      { name: 'Buefy', value: 'buefy' },
      { name: 'Bulma', value: 'bulma' },
      { name: 'Element', value: 'element-ui' },
      { name: 'Framevuerk', value: 'framevuerk' },
      { name: 'iView', value: 'iview' },
      { name: 'Tachyons', value: 'tachyons' },
      { name: 'Tailwind CSS', value: 'tailwind' },
      { name: 'Vuetify.js', value: 'vuetify' }
    ],
    default: 'none'
  }
]
