const validate = require('validate.js');
const moment = require('moment');

validate.extend(validate.validators.datetime, {
  parse(value, options) {
    let formats = ["YYYY-MM-DD HH:mm:ss", "YYYY-M-D H:m:s", "x"];
    if (options.dateOnly) {
      formats = ["YYYY-MM-DD", "YYYY-M-D", "x"];
    }
    return +moment.utc(value, formats, true);
  },

  format(value, options) {
    let format = "YYYY-MM-DD";
    if (!options.dateOnly) {
      format += " HH:mm:ss";
    }
    return moment.utc(value).format(format);
  }
})

