var values = [],
  keys = Object.keys(localStorage),
  i = keys.length;
while (i--) {
  values.push(`Key: ${keys[i]}, Value: ${localStorage.getItem(keys[i])}`);
};
values;
