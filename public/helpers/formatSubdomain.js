module.exports = {
  formatUrl: function (subDomain) {
    if (!subDomain.startsWith('http://') && !subDomain.startsWith('https://')) {
      return `http://${subDomain}`;
    }
    return subDomain;
  },
};