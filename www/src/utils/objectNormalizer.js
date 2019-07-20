export function isObject(value) {
  return value && typeof value === "object" && value.constructor === Object;
}

export function isArray(value) {
  return Array.isArray(value);
}

export function isString(value) {
  return typeof value === "string";
}

const objectNormalizer = (ignoreKeys = []) => (obj = {}) => {
  if (!isObject) return obj;
  if (!Array.isArray(ignoreKeys)) return obj;

  const newObj = {};
  Object.keys(obj).forEach(key => {
    if (!ignoreKeys.includes(key) && obj[key]) {
      const value = obj[key];
      newObj[key] = isObject(value)
        ? objectNormalizer(ignoreKeys)(value)
        : isArray(value)
        ? value.map(item => {
            if (isObject(item)) return objectNormalizer(ignoreKeys)(item);
            return item;
          })
        : value;
    }
  });
  return newObj;
};

export default objectNormalizer;
