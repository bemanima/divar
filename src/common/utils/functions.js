const isTrue = (value) => [true, 1, "true"].includes(value);
const isFalse = (value) => [false, 1, "false"].includes(value);

const removePropertyInObject = (target = {}, properties = []) => {
  properties.forEach((item) => {
    delete target[item];
  });

  return target;
};

module.exports = {
  isTrue,
  isFalse,
  removePropertyInObject,
};
