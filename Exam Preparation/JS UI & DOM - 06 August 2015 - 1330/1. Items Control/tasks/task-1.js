function solve() {
  return function (selector, isCaseSensitive) {
      var mainItem = document.querySelector(selector);

      //Adding elements
      var addingControl = document.createElement('div');
      addingControl.className += ' add-controls';
      var textInAdding = document.createElement('span');
      textInAdding.innerHTML = 'Enter text';
      var inputInAdding = document.createElement('input');
      var buttonInAdding = document.createElement('button');
      buttonInAdding.className += ' button';
      buttonInAdding.innerHTML = 'Add';
      buttonInAdding.style.display = 'block';
      buttonInAdding.style.width = '235px';
      buttonInAdding.className += ' add';
      addingControl.appendChild(textInAdding);
      addingControl.appendChild(inputInAdding);
      addingControl.appendChild(buttonInAdding);

      //Search elements
      var searchControll = document.createElement('div');
      searchControll.className += ' search-controls';
      var textSearch = document.createElement('span');
      textSearch.innerHTML = 'Search';

      var inputSearch = document.createElement('input');

      searchControll.appendChild(textSearch);
      searchControll.appendChild(inputSearch);

      //Result elements
      var ressultControl = document.createElement('div');
      ressultControl.className += ' result-controls';
      var itemList = document.createElement('ul');
      itemList.className += ' items-list';
      itemList.style.listStyleType = 'none';
      ressultControl.appendChild(itemList);
      

      //Events
      document.body.addEventListener('click', function (ev) {
          var target = ev.target;

          if(target.className.indexOf('add') >= 0) {
              itemList.appendChild(createListElement(inputInAdding.value));
              inputInAdding.value = '';
          } else if(target.className.indexOf('delete') >= 0) {
              target.parentNode.outerHTML = '';
          }
      });

      inputSearch.addEventListener('input', function (ev) {
          var elementsFromUl = itemList.getElementsByClassName('list-item');
          if(isCaseSensitive) {
              for (var i = 0, len = elementsFromUl.length; i < len; i += 1) {
                  if (elementsFromUl[i].getElementsByTagName('strong')[0].innerHTML.indexOf(inputSearch.value) < 0) {
                      elementsFromUl[i].style.display = 'none';
                  } else {
                      elementsFromUl[i].style.display = '';
                  }
              }
          } else {
              for (var i = 0, len = elementsFromUl.length; i < len; i += 1) {
                  if (elementsFromUl[i].getElementsByTagName('strong')[0].innerHTML.toLowerCase().indexOf(inputSearch.value.toLowerCase()) < 0) {
                      elementsFromUl[i].style.display = 'none';
                  } else {
                      elementsFromUl[i].style.display = '';
                  }
              }
          }
      });


      //Append elements
      mainItem.appendChild(addingControl);
      mainItem.appendChild(searchControll);
      mainItem.appendChild(ressultControl);

      function createListElement(text) {
          var li = document.createElement('li');
          li.className += ' list-item';
          var deleteButton = document.createElement('button');
          deleteButton.className += ' button';
          deleteButton.className += ' delete';
          deleteButton.innerHTML = 'X';
          deleteButton.style.backgroundColor = 'gray';
          var textInLi = document.createElement('strong');
          textInLi.innerHTML = text;
          li.appendChild(deleteButton);
          li.appendChild(textInLi);
          return li;
      }
  };
}

module.exports = solve;