/**
 * //input:
 * var templates = [{
 *   element: "table",
 *   attributes: {
 *    "class": "cssClass",
 *    "id": "tableId"
 *   },
 *   events: {
 *    "eventOne": function (event) {},
 *    "eventTwo": function (event) {}
 *   }
 *   contents: [{
 *    element: "tr",
 *    attrubutes: null,
 *    contents: [{
 *      element: "td",
 *      contents: 'a'
 *    }]
 *   }]
 * }, {
 *  element: "div",
 *  contents: "Hello, World!"
 * }];
 * jQuery("#selector").mastar(templates);
 * //output:
 * <div id="selector">
     <table class="cssClass" id="tableId">
       <tr>
         <td>a</td>
       </tr>
     </table>
     <div>Hello, World!</div>
 * </div>
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
    appendAttributes = function (element, attributes) {
      if (attributes === undefined ||
          attributes === null ||
            typeOf(attributes) !== 'object') {
        return element;
      }
      Object.keys(attributes).forEach(function (attribute) {
        element.attr(attribute, attributes[attribute]);
      });
      return element;
    },
    appendEvents = function (element, events) {
      if (events === undefined ||
          events === null ||
            typeOf(events) !== 'object') {
        return element;
      }
      element.on(events);
      return element;
    },
    prepareHtml = function (templates, options) {
      var elements = [];
      templates.forEach(function(template) {
        var element = jQuery("<" + template.element + ">");
        appendAttributes(element, template.attributes);
        appendEvents(element, template.events);
        if (template.contents !== null &&
          template.contents !== undefined) {
          if (typeOf(template.contents) === 'array') {
            element.append(prepareHtml(template.contents, options));
          } else if (typeof template.contents !== "object") {
            element.text(template.contents);
          } else {
            console.log("ERROR! The contents of an element should be either array or a single value");
          }
        }
        elements.push(element[0]);
      });
      return elements;
    };
  jQuery.fn.mastar = function(templates, options) {
    var preparedObjects = prepareHtml(templates, options);
    return jQuery(this.selector).each(function() {
      var that = this;
      preparedObjects.forEach(function (preparedObject) {
        jQuery(that).append(preparedObject);
      });
    });
  };
} (jQuery));
