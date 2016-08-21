function createImagesPreviewer(selector, items) {
    var parrent = document.querySelector(selector);
    var imgContainerRight = document.createElement('ul');
    imgContainerRight.className += ' image-container';

    //Adding all imgs to right
    for(var i = 0; i < items.length; i+=1) {
        imgContainerRight.appendChild(createImgList(items[i]));
    }

    //AddingStyles for img
    imgContainerRight.style.listStyleType = 'none';
    imgContainerRight.style.display = 'inline-block';

    imgContainerRight.style.height = '550px';
    imgContainerRight.style.overflow = 'scroll';

    //image-preview
    var imgPreview = document.createElement('div');
    imgPreview.className += ' image-preview';
    createBigImg(items[0]);
    imgPreview.style.float = 'left';
    imgContainerRight.style.float = 'left';

    //Filter
    var filterDiv = document.createElement('div');
    var search = document.createElement('input');
    var text = document.createElement('div');
    search.addEventListener('keyup', function (ev) {
        imgContainerRight.innerHTML = '';
        debugger;
        for (var i = 0; i < items.length; i+=1)
        {
            if(items[i].title.toLowerCase().indexOf(search.value.toLowerCase()) >= 0)
            {
                imgContainerRight.appendChild(createImgList(items[i]));
            }
        }
    });
    text.innerHTML = 'Filter';
    filterDiv.appendChild(text);
    filterDiv.appendChild(search);
    filterDiv.style.float = 'left';
    filterDiv.style.display = 'inline-block';
    imgPreview.style.display = 'inline-block';

    parrent.appendChild(imgPreview);
    parrent.appendChild(filterDiv);
    parrent.appendChild(imgContainerRight);
    

    function createBigImg(item) {
        imgPreview.innerHTML = '';
        var title = document.createElement('div');
        title.innerHTML = item.title;
        var img = document.createElement('img');
        img.src = item.url;
        img.width = 500;
        img.height = 500;
        img.style.borderRadius = '10px';
        imgPreview.appendChild(title);
        imgPreview.appendChild(img);
    }
    
    function createImgList(item) {
        var title = document.createElement('div');
        title.innerHTML = item.title;
        var li = document.createElement('li');
        var img = document.createElement('img');
        img.src = item.url;
        img.width = 150;
        img.height = 150;
        img.style.borderRadius = '10px';

        li.appendChild(title);
        li.appendChild(img);

        li.addEventListener('mouseover', function (ev) {
           li.style.backgroundColor = 'gray';
        });
        li.addEventListener('mouseout', function (ev) {
            li.style.backgroundColor = '';
        });

        li.addEventListener('click', function (ev) {
            createBigImg(item);
        });

        return li;
    }
}