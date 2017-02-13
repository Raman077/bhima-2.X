module.exports = {
  "extends": "airbnb-base",
  "plugins": [
    "import"
  ],
  "parserOptions" : {
    "sourceType": "module"
  },
  "rules" : {
    "padded-blocks": "warn",
    "array-bracket-spacing" : "warn",
    "indent": ["error", 2],
    "comma-dangle" : ["error", "always-multiline"],
    "key-spacing": ["warn", {
      "singleLine": {
        "beforeColon": false,
        "afterColon": true
      },
      "multiLine": {
        "beforeColon": true,
        "afterColon": true,
        "align" : "colon"
      }
    }],
    "no-use-before-define": ["error", {
      "functions": false
    }],
    "no-var" : "off",
    "max-len": ["warn", 120],
    "func-names" : ["warn", "as-needed"],
    "no-underscore-dangle": ["error", {
      "allowAfterThis": true
    }]
  },
  "globals" : {
    "Chart" : true,
    "angular" : true,
    "$" : true,
  }
};