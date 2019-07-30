module.exports = {
    'env': {
        'es6': true,
        'node': true,
        'mocha': true
    },
    'plugins': [
        'mocha',
        'prettier'
    ],
    'extends': [
        'eslint:recommended',
        // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
        'plugin:prettier/recommended',
    ],
    'parserOptions': {
        'ecmaVersion': 2018,
        'sourceType': 'module',
    },
    'rules': {
        'linebreak-style': [
            'error',
            'unix'
        ],
        'quotes': [
            'error',
            'single',
            { 'allowTemplateLiterals': true }
        ],
        'mocha/no-exclusive-tests': 'error'
    }
};
