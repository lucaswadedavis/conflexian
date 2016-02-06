module.exports = function(tag, contents) {
  var d = "";
  d += tag + "{";
  for (var prop in contents) {
    d += prop + ":" + contents[prop] + ";";
  }
  d += "}";
  return d;
};


