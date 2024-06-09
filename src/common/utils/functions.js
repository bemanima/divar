const isTrue = (value) => [true, 1, "true"].includes(value);
const isFalse = (value) => [false, 1, "false"].includes(value);

module.exports = {
  isTrue,
  isFalse,
};
