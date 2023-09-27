const flattenDeep = (arr) =>
  arr.reduce(
    (acc, val) =>
      Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val),
    []
  );
const isEmpty = (arr) => !Array.isArray(arr) || !arr.length;

module.exports = {
  flattenDeep,
  isEmpty,
};
