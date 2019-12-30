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
      { name: 'Buefy', value: 'buefy' },
      { name: 'Bootstrap Vue', value: 'bootstrap' },
      { name: 'Element', value: 'element-ui' },
      { name: 'Vuetify.js', value: 'vuetify' },
      { name: 'Tailwind CSS', value: 'tailwind' },
      { name: 'Ant Design Vue', value: 'ant-design-vue' },
      { name: 'Framevuerk', value: 'framevuerk' },
      { name: 'Tachyons', value: 'tachyons' },
      { name: 'iView', value: 'iview' },
      { name: 'None', value: 'none' }
    ],
    default: 'Buefy'
  },
  {
    name: 'isAddStylint',
    message: 'Would like to add Stylint?',
    choices: [
      { name: 'Yes', value: 'yes' },
      { name: 'No', value: 'no' }
    ],
    type: 'list',
    default: 'yes'
  }
]
