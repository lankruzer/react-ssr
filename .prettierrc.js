module.exports = {
  trailingComma: "es5",
  tabWidth: 4,
  semi: true,
  singleQuote: true,
  bracketSpacing: true,
  overrides: [
    {
      files: ['*js', '*.jsx'],
      options: {
        parser: "babel"
      }
    }
  ]
};