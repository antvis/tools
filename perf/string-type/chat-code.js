
const isAlpha = (c) => {
  const code = c.charCodeAt(0);
  // ! -----------------------Z
  return code >=0 && code <= 255;
};

const isChinese = (c) => {
  const code = c.charCodeAt(0);

  // /[\u4e00-\u9fa5]/
  return code >= 19968 && code <= 40869;
};

module.exports = {
  isAlpha,
  isChinese,
};
