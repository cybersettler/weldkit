/**
 * String utils.
 * @module util/StringUtil
 */

let StringUtil = {
  capitalize: capitalize,
  /**
   * Takes a string with words separated by
   * dashes (lisp case) and returns a camel case string
   * @param {string} str - lisp case string
   * @return {string} - camel case string
   */
  camelCase: function(str) {
    let pascaled = this.pascalCase(str);
    return pascaled.charAt(0).toLowerCase() + pascaled.slice(1);
  },
  /**
   * Takes a string with words separated by
   * dashes (lisp case) and returns a pascal case string
   * @param {string} str - lisp case string
   * @return {string} - pascal case string
   */
  pascalCase: function(str) {
    return str.match(/([A-Za-z]+)/g).reduce(concatenatePascalString);
  },
};

/* eslint-disable require-jsdoc */

function capitalize(string) {
  return string.replace(/^(.)/, function(match, p1) {
    return p1.toUpperCase();
  });
}

function concatenatePascalString(prev, current, index) {
  if (index === 1) {
    return capitalize(prev) + util.capitalize(current);
  }
  if (index > 1) {
    return prev + capitalize(current);
  }
}

/* eslint-enable require-jsdoc */

export default StringUtil;
