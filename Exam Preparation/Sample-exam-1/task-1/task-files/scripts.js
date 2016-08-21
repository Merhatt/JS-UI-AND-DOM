function createCalendar(selector, events) {
    var DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    var selectedElement = document.querySelector(selector);

    //Creating day elelment
    var day = document.createElement('div');
    day.style.display = 'inline-block';
    day.style.width = '130px';
    day.style.height = '130px';
    day.style.border = '1px solid black';
    day.style.float = 'left';
    day.className += ' day';
    var dayName = document.createElement('div');
    dayName.style.width = '130px';
    dayName.style.borderBottom = '1px solid black';
    dayName.style.backgroundColor = 'gray';


    //Day Arr
    var days = [];

    for(var i = 0; i < 30; i+=1) {
        var dayNow = day.cloneNode(true);
        var dayNameCopy = dayName.cloneNode(true);
        dayNameCopy.innerHTML = DAYS_OF_WEEK[i%7] + ' ' + (i+1) + ' June 2014';
        dayNow.appendChild(dayNameCopy);

        if (i % 7 === 0 && i !== 0) {
            dayNow.style.clear = 'both';
        }

        days.push(dayNow);
        selectedElement.appendChild(dayNow);
    }

    for(var i = 0; i < events.length; i+=1) {
        days[+events[i].date - 1].innerHTML += ' ' + events[i].hour + ' ' + events[i].title;
    }

    document.body.addEventListener('mouseover', function (ev) {
        var target = ev.target;
        if(target.className.indexOf('day') >= 0) {
            target.style.backgroundColor = 'blue';
        }
    });

    document.body.addEventListener('mouseout', function (ev) {
        var target = ev.target;
        if(target.className.indexOf('day') >= 0) {
            target.style.backgroundColor = '';
        }
    });
}