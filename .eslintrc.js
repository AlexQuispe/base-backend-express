module.exports = {
    'env': {
        'commonjs': true,
        'es6': true,
        'node': true,
    },
    'extends': 'standard',
    'globals': {
        'Atomics': 'readonly',
        'SharedArrayBuffer': 'readonly',
        'describe': true,
        'expect': true,
        'it': true,
        'before': true,
        'after': true,
        'beforeEach': true,
        'afterEach': true,
    },
    'parserOptions': {
        'ecmaVersion': 2018,
    },
    'rules': {
        'no-multi-spaces': 'off',
        'key-spacing': ['error', {
            'align': 'value',
            'align': 'colon',
            'align': { 'beforeColon': true, 'afterColon': true, 'on': 'colon' },
        }],
        'comma-dangle': ['error', 'always-multiline'],
    },
};
