module.exports = {
  // add your custom config here
  // https://stylelint.io/user-guide/configuration
  extends: 'stylelint-config-standard',
  defaultSeverity: 'error',
  rules: {
    'selector-list-comma-newline-after': null,
    'selector-list-comma-space-after': 'always-single-line',
    'value-list-comma-newline-after': null,
    'number-leading-zero': 'never',
    'selector-pseudo-element-colon-notation': 'single',
    'no-empty-source': null,
    'declaration-colon-newline-after': null,
    'block-closing-brace-newline-after': ['always', {
      'ignoreAtRules': ['if', 'else']
    }],
    'at-rule-empty-line-before': ['always', {
      'except': [
        'blockless-after-same-name-blockless',
        'first-nested'
      ],
      'ignoreAtRules': ['after-comment', 'else']
    }]
  }
}
