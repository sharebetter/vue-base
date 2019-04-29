module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': 'off',
    'arrow-parens': 0, // 箭头函数用小括号括起来
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': 0,
    'object-curly-spacing': 0, // 大括号内是否允许不必要的空格
    'consistent-this': [2, 'that'], // this别名
    'no-multiple-empty-lines': [1, {
      max: 1
    }], // 空行最多不能超过1行
    'no-unused-vars': [2, {
      vars: 'all',
      args: 'after-used'
    }], // 不能有声明后未被使用的变量或参数
    'no-var': 1, // 禁用var，用let和const代替
    'no-warning-comments': [1, {
      terms: ['todo', 'fixme', 'xxx'],
      location: 'start'
    }], // 不能有警告备注
    'max-depth': [1, 4], // 嵌套块深度
    'object-shorthand': 0, // 强制对象字面量缩写语法
    'id-match': 2, // 命名检测
    'semi': [0, 'always'], // 语句强制分号结尾
    'no-unneeded-ternary': 2, // 禁止不必要的嵌套 var isYes = answer === 1 ? true : false;
    'indent': [2, 4], // 缩进风格
    'comma-dangle': [2, 'never'] // 对象字面量项尾不能有逗号
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
