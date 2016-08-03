function solve() {
    return function (selector) {
        var template = '<div id="calendar">' +
          '<div class="event-calendar">' +
              '<h2 class="header">Appointments for <span class="month">{{month}}</span> <span class="year">{{year}}</span></h2>' +
              '{{#days}}' +
              '<div class="col-date">' +
                  '<div class="date">{{day}}</div>' +
                  '<div class="events">' +
                  '{{#events}}' +
                      '<div class="event {{importance}}"{{#if duration}}' +
                                                               'title = "duration: {{duration}}"' +
                                                               '{{else}}' +
                                                               'Free slot' +
                                                               '{{/if}}>' +
                          '<div class="title">' +
                            '{{#if title}}' +
                            '{{title}}' +
                            '{{else}}' +
                            'Free slot' +
                            '{{/if}}' +
                          '</div>' +
                          '{{#if time}}' +
                        '<span class="time">at: {{time}}</span>' +
                          '{{else}}' +
                          '{{/if}}' +
                      '</div>' +
                  '{{/events}}' +
                  '</div>' +
              '</div>' +
              '{{/days}}' +
          '</div>' +
          '</div>';
        document.getElementById(selector).innerHTML = template;
    };
}

module.exports = solve;
