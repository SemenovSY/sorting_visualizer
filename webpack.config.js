module.exports = function (meta, { nodeEnv }) {
  return require(`./webpack/${ nodeEnv }.js`);
};