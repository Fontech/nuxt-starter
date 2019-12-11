const { join, relative } = require('path')
const glob = require('glob')
const spawn = require('cross-spawn')
const validate = require('validate-npm-package-name')

const rootDir = __dirname

module.exports = {
  prompts: require('./prompts'),
  templateData () {
    const pmRun = this.answers.pm === 'yarn' ? 'yarn' : 'npm run'

    const { cliOptions = {} } = this.sao.opts
    const edge = cliOptions.edge ? '-edge' : ''

    return { edge, pmRun }
  },
  actions () {
    const validation = validate(this.answers.name)
    validation.warnings && validation.warnings.forEach((warn) => {
      console.warn('Warning:', warn)
    })
    validation.errors && validation.errors.forEach((err) => {
      console.error('Error:', err)
    })
    validation.errors && validation.errors.length && process.exit(1)

    const actions = [{
      type: 'add',
      files: '**',
      templateDir: 'template/nuxt'
    }]

    if (this.answers.ui !== 'none') {
      actions.push({
        type: 'add',
        files: '**',
        templateDir: `template/frameworks/${this.answers.ui}`
      })
    }

    actions.push({
      type: 'add',
      files: '**',
      templateDir: 'template/frameworks/jest'
    })

    actions.push({
      type: 'add',
      files: '*'
    })

    actions.push({
      type: 'move',
      patterns: {
        gitignore: '.gitignore',
        '_package.json': 'package.json',
        '_.eslintrc.js': '.eslintrc.js',
        '_stylelint.config.js': 'stylelint.config.js'
      }
    })

    actions.push({
      type: 'modify',
      files: 'package.json',
      handler (data) {
        delete data.scripts['']
        delete data.dependencies['']
        delete data.devDependencies['']
        return data
      }
    })

    return actions
  },
  async completed () {
    this.gitInit()

    await this.npmInstall({ npmClient: this.answers.pm })

    const scripts = ['lint', 'stylelint']
    scripts.forEach((script) => {
      const options = [script, '--', '--fix']
      if (this.answers.pm !== 'yarn') {
        options.unshift('run')
      }
      spawn.sync(this.answers.pm, options, {
        cwd: this.outDir,
        stdio: 'inherit'
      })
    })

    const chalk = this.chalk
    const isNewFolder = this.outDir !== process.cwd()
    const relativeOutFolder = relative(process.cwd(), this.outDir)
    const cdMsg = isNewFolder ? chalk`\t{cyan cd ${relativeOutFolder}}\n` : ''
    const pmRun = this.answers.pm === 'yarn' ? 'yarn' : 'npm run'

    console.log(chalk`\n🎉  {bold Successfully created project} {cyan ${this.answers.name}}\n`)

    console.log(chalk`  {bold To get started:}\n`)
    console.log(chalk`${cdMsg}\t{cyan ${pmRun} dev}\n`)

    console.log(chalk`  {bold To build & start for production:}\n`)
    console.log(chalk`${cdMsg}\t{cyan ${pmRun} build}`)
    console.log(chalk`\t{cyan ${pmRun} start}\n`)

    console.log(chalk`  {bold To test:}\n`)
    console.log(chalk`${cdMsg}\t{cyan ${pmRun} test}\n`)
  }
}
