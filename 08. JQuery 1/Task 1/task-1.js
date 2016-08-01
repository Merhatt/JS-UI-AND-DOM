/* globals $ */

/* 
Create a function that takes an id or DOM element and:
  
*/

function solve(){
  return function (selector, count) {
      var page = $(selector);

      count = +count;

      if(!page.length) {
          return;
      } 

      if(typeof count !== 'number' || count <= 0) {
          throw new Error();
      }

      var ul = $('<ul></ul>');
      ul.addClass('items-list');
      for (var i = 0; i < count; i+= 1) {
          ul.append($('<li></li>').addClass('list-item').text('List item #' + i));
      }
      page.append(ul);
  };
}

module.exports = solve;