module.exports = function (/** @type {any} */ api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
  };
};
