# mastar.js
A javascript templating library

# Naming

Mastar is the bulgarian word for a tool used in building
construction for leveling of floors

It's extremely easy to use and very effective when mastered. Therefore it was
chosen for the name of this library.

# Usage

## Input

 ```
 var templates = [{
   element: "table",
   attributes: {
    "class": "cssClass",
    "id": "tableId"
   },
   events: {
    "eventOne": function (event) {},
    "eventTwo": function (event) {}
   }
   contents: [{
    element: "tr",
    attrubutes: null,
    contents: [{
      element: "td",
      contents: 'a'
    }]
   }]
 },
 {
  element: "div",
  contents: "Hello, World!"
 }];
 jQuery("#selector").mastar(templates);
 ```

## Output in the DOM

 ```
 <div id="selector">
   <table class="cssClass" id="tableId">
     <tr>
       <td>a</td>
     </tr>
   </table>
   <div>Hello, World!</div>
 </div>
 ```

# HERE BE DRAGONS! 

Warning, the library is still not unit tested! Use on your own risk!

# Trivia

While developing http://www.yetanotherprettifier.com/ I decided to use a
templating library for javascript that would help me generate some html client
side. However as many other things I didn't like the philosophy of the 
currently popular templating libraries and engines. That happens quite often
when I try to use someone else's code. Therefore I decided I'll do it myself!

# Licensing

This Library is licensed under the MIT License

