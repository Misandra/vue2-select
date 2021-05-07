module.exports = {
    root: true,
    env: {
        browser: true,
    },
    extends: [
        "plugin:vue/recommended",
        "airbnb-base",
    ],
    rules: {
        "default-case": ["off"],
        "comma-dangle": ["error", "never"],
        "camelcase": "off",
        "consistent-return": "off",
        "func-names": ["error", "as-needed"],
        "vue/script-indent": ["error", 3, { "baseIndent": 1, "switchCase": 1 }],
        "vue/html-indent": ["error", 3, { "baseIndent": 1, "closeBracket": 1, "alignAttributesVertically": true }],
        "vue/no-v-html": "off",
        "vue/prop-name-casing": ["error", "camelCase"],
        "vue/component-name-in-template-casing": ["error", "kebab-case"],
        "vue/require-default-prop": "off",
        "prefer-destructuring": ["error", { "array": false }],
        "radix": ["error", "as-needed"],
        "import/no-unresolved": [
            1,
            { "caseSensitive": false }
        ],
        "indent": ["error", 3, {"SwitchCase": 1}],
        "max-len": ["error", { "code": 120, "ignoreUrls": true }],
        "no-console": process.env.NODE_ENV === "production" ? "error" : ["error", { "allow": ["error"] }],
        "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
        "no-useless-escape": ["off"],
        "no-underscore-dangle": ["off"],
        "no-unused-expressions": ["error", { "allowShortCircuit": true, "allowTernary": true }],
        "no-unused-vars": ["error", { "argsIgnorePattern": "commit" }],
        "no-plusplus": "off",
        "no-multi-assign": "off",
        "no-mixed-operators": "off",
        "no-new": 0,
        "no-restricted-syntax": "off",
        "no-param-reassign": ["error", { "props": true, "ignorePropertyModificationsFor": ["state", "e", "event"] }],
        "no-prototype-builtins": "off",
        "no-bitwise": ["error", { "allow": ["~"] }],
        "no-continue": "off",
        "no-nested-ternary": "off",
        "no-throw-literal": "off",
        "object-shorthand": ["error", "always", { "avoidQuotes": false }],
        "template-curly-spacing" : "off"
    },
    parser: "vue-eslint-parser",
    parserOptions: {
        parser: "babel-eslint",
    },
    globals: {
        "ga": false,
        "diff": false,
        "uniq": false,
        "clone": false,
        "isEqual": false,
        "queryString": false,
        "formatNumber": false,
        "SITE_URL": false,
        "api": false,
        "downloadBlob": false,
        "cleanObject": false,
        "plural": false,
        "numberFormat": false,
        "httpService": false,
        "debounce": false,
        "dateFormat": false,
        "ym": false
    },
    overrides: [
        {
            files: ["*.vue"],
            rules: {
                'indent': 'off',
                'vue/script-indent': ['error', 3, {
                    'baseIndent': 1
                }]
            }
        }
    ],
    settings: {
        "import/resolver": "webpack"
    }
};
