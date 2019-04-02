const isAlpha = (c) => {
  return /[\u0000-\u00ff]/.test(c);
};

const isChinese = (c) => {
  return /[\u4e00-\u9fa5]/.test(c);
};

module.exports = {
  isAlpha,
  isChinese,
};
