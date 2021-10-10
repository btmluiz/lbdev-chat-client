const CracoAlias = require("craco-alias");

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: "tsconfig",
        baseURL: ".",
        tsConfigPath: "./tsconfig.paths.json",
      },
    },
  ],
};
