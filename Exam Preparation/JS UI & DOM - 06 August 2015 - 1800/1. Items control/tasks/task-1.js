function solve() {
  return function (selector, isCaseSensitive) {
    var page = document.querySelector(selector);

    //add-controls
    var addControls = document.createElement('div');
    addControls.className += ' add-controls';

    var enterText = document.createElement('span');
    enterText.innerHTML = 'Enter text';
    addControls.appendChild(enterText);

    var inputElement = document.createElement('input');
    addControls.appendChild(inputElement);

    var addButton = document.createElement('button');
    addButton.className += ' button';
    addButton.innerHTML = 'Add';
    addButton.style.display = 'block';
    addButton.style.width = '235px';
    addButton.style.backgroundColor = 'gray';

    addButton.addEventListener('click', function (ev) {
      itemList.appendChild(createListItem(inputElement.value));
      inputElement.value = '';
    });

    addControls.appendChild(addButton);


    //Search elements

    var searchElements = document.createElement('div');
    searchElements.className += ' search-controls';

    var searchText = document.createElement('span');
    searchText.innerHTML = 'Search';
    searchElements.appendChild(searchText);

    var searchInput = document.createElement('input');
    searchElements.appendChild(searchInput);
    searchInput.addEventListener('input', function (ev) {
      var listOfItems = itemList.getElementsByClassName('list-item');

      var pattern = searchInput.value;
      console.log(listOfItems);
      for(var i = 0; i < listOfItems.length; i+=1) {
        var liNow = listOfItems[i];

        if(isCaseSensitive) {
          if(liNow.getElementsByTagName('strong')[0].innerHTML.indexOf(pattern) < 0) {
            liNow.style.display = 'none';
          } else {
            liNow.style.display = '';
          }
        } else {
          if(liNow.getElementsByTagName('strong')[0].innerHTML.toLowerCase().indexOf(pattern.toLowerCase()) < 0) {
            liNow.style.display = 'none';
          } else {
            liNow.style.display = '';
          }
        }
      }

    });

    
    //Result elements
    var resultElements = document.createElement('div');
    resultElements.className += ' result-controls';

    var itemList = document.createElement('ul');
    itemList.className += ' items-list';
    itemList.style.listStyleType = 'none';
    resultElements.appendChild(itemList);


    //Append results
    page.appendChild(addControls);
    page.appendChild(searchElements);
    page.appendChild(resultElements);

    function createListItem(txt) {
      var listItem = document.createElement('li');
      listItem.className += ' list-item';
      
      var buttonDelete = document.createElement('button');
      buttonDelete.className += ' button';
      buttonDelete.innerHTML = 'X';
      buttonDelete.style.backgroundColor = 'gray';

      buttonDelete.addEventListener('click', function (ev) {
        this.parentNode.outerHTML = '';
      });

      listItem.appendChild(buttonDelete);

      var textInLi = document.createElement('strong');
      textInLi.innerHTML = txt;
      listItem.appendChild(textInLi);
      
      return listItem;
    }
  };
}

module.exports = solve;