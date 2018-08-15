module.exports = {
    parserOptions: {
        "ecmaVersion": 6,
        "sourceType": "module",
    },
    rules: {
        'my-custom-rule': 1,
        'strict': 2
    },
    "extends": "eslint:recommended",
    globals:{},
    env: {
        'browser': true,
        "node": true,
        "es6": true
    },
}