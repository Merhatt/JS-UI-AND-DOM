/* globals $ */

/* 
Create a function that takes an id or DOM element and:
  
*/

function solve(){
  return function (selector) {
     if (typeof selector === 'string') {
         selector = document.getElementById(selector);
     } else if (typeof selector === HTMLElement) {

     } else {
         throw new Error();
     }

     if (selector === null) {
         throw new Error();
     }
     console.log(selector);
     var buttons = selector.getElementsByClassName('button');
     var content = selector.getElementsByClassName('content');

     for (var i = 0; i < buttons.length; i+=1) {
         buttons[i].innerHTML = 'hide';
     }

     selector.addEventListener('click', checkClick);

     function checkClick(e) {
         var elClicked = e.target;
         if (elClicked === null || elClicked === undefined) {
             return;
         }
         if (elClicked.className === 'button') {
            if (elClicked.innerHTML === 'hide') {
                elClicked.innerHTML = 'show';
                while (elClicked.className !== 'content') {
                    elClicked = elClicked.nextElementSibling;
                    if (elClicked === null) {
                        return;
                    }
                }
                elClicked.style.display = 'none';
            } else {
                elClicked.innerHTML = 'hide';
                while (elClicked.className !== 'content') {
                    elClicked = elClicked.nextElementSibling;
                    if (elClicked === null) {
                        return;
                    }
                }
                elClicked.style.display = '';
            }
         } 

     }
     
  };
}

module.exports = solve;