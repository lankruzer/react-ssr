module.exports = {
    env: {
        es6: true,
        browser: true,
        node: true,
        jest: true
    },
    extends: [
        "airbnb",
        "plugin:jest/all",
        "jest-enzyme"
    ],
    plugins: [
        "babel",
        "import",
        "jsx-a11y",
        "react",
        "jest",
        "prettier"
    ],
    parser: "babel-eslint",
    parserOptions: {
        ecmaVersion: 6,
        sourceType: "module",
        ecmaFeatures: {
            jsx: true
        }
    },
    rules: {
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }]
    },
};