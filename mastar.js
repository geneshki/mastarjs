/**
 * //input:
 * var templates = {
 *   element: "table",
 *   attributes: {
 *    "class": "cssClass",
 *    "id": "tableId"
 *   },
 *   contents: [{
 *    element: "tr",
 *    attrubutes: null,
 *    contents: [{
 *      element: "td",
 *      contents: 'a'
 *    }]
 *   }]
 * }
 * //output:
 * <table class="cssClass" id="tableId">
 * <tr>
 * <td>a</td>
 * </tr>
 * </table>
 *
 */
(function (jQuery) { 
  var typeOf = function (value) {
    //Copied from http://javascript.crockford.com/remedial.html
     var s = typeof value;
     if (s === 'object') {
       if (value) {
         if (value instanceof Array) {
           s = 'array';
         }
       } else {
         s = 'null';
       }
     }
     return s;
    },
    getAttributes = function (attributes) {
      var result = "";
      if (attributes === undefined ||
          attributes === null ||
            typeof attributes !== 'object') {
        return result;
      }
      Object.keys(attributes).forEach(function (attribute) {
        result += " " + attribute;
        result += "=";
        result += '"';
        result += attributes[attribute];
        result += '"';
      });
      return result;
    },
    prepareHtml = function (templates, options) {
      var result = "";
      templates.forEach(function(template) {
        var contentsType;
        result += "<" + template.element;
        result += getAttributes(template.attributes) + ">";
        if (template.contents !== null &&
            template.contents !== undefined) {
          contentsType = typeof template.contents;
          if (contentsType === 'object') {
            if (typeOf(contentsType) !== 'array') {
              console.log("ERROR! The contents of an element should be either array or a single value");
            } else {
              result += "\n";
              result += prepareHtml(template.contents, options);
              result += "\n";
            }
          } else {
            result += template.contents;
          }
        }
        result += "</" + template.element + ">" + "\n";
      });
      return result;
    };
  jQuery.fn.mastar = function(templates, options) {
    var preparedHtml = prepareHtml(templates, options);
    return this.each(function() {
      jQuery(this).append(preparedHtml);
    });
  };
} (jQuery));
