var values = [],
  keys = Object.keys(localStorage),
  i = keys.length;
while (i--) {
  values.push(keys[i]);
};
values;
