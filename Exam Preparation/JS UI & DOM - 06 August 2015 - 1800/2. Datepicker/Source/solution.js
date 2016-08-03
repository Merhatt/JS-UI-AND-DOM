function solve() {
    $.fn.datepicker = function () {
        var MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var WEEK_DAY_NAMES = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

        Date.prototype.getMonthName = function () {
            return MONTH_NAMES[this.getMonth()];
        };

        Date.prototype.getDayName = function () {
            return WEEK_DAY_NAMES[this.getDay()];
        };

         Date.prototype.getNextDay = function () {
            if(this.getDate() < daysInMonth(this.getFullYear(), this.getMonth() + 1)) {
                return new Date(this.getFullYear(), this.getMonth(), this.getDate() + 1);
            } else if (this.getDate() === daysInMonth(this.getFullYear(), this.getUTCMonth() + 1)) {
                return this.getNextMonth();
            }
        };

        Date.prototype.getPreviousDay = function () {
            if(this.getDate() > 1) {
                return new Date(this.getFullYear(), this.getMonth(), this.getDate() - 1);
            } else {
                return this.getPreviousMonth();
            }
        };

        Date.prototype.getNextMonth = function () {
            if (this.getMonth() < 11) {
                return new Date(this.getFullYear(), this.getMonth() + 1, 1);
            } else {
                return this.getNextYear();
            }
        };

        Date.prototype.getPreviousMonth = function () {
            if (this.getMonth() > 0) {
                return new Date(this.getFullYear(), this.getMonth() - 1, daysInMonth(this.getFullYear(), this.getMonth()));
            } else {
                return this.getPreviousYear();
            }
        };
      
        Date.prototype.getNextYear = function () {
            return new Date(this.getFullYear() + 1, 0, 1);
        };

         Date.prototype.getPreviousYear = function () {
            return new Date(this.getFullYear() - 1, 11, 31);
        };

        //Month is 1 based
        function daysInMonth(year, month) {
          return new Date(year, month, 0).getDate();
        }
		
        var date = new Date();
        var $thisInput = this;
        $thisInput.addClass('datepicker');

        var $mainDiv = $('<div></div>');
        $mainDiv.addClass('datepicker-wrapper');
       
        $thisInput.wrap($mainDiv);
        $mainDiv = $('.datepicker-wrapper');

        var $datePickerContent = $('<div></div>');
        $datePickerContent.addClass('datepicker-content');

        $datePickerContent.appendTo($mainDiv);

        //Adding upper green bar
        var $upperControll = $('<div></div>');
        $upperControll.addClass('controls');

        $upperControll.appendTo($datePickerContent);

        //Upper left button
        var $leftButton = $('<button></button>');
        $leftButton.text('<');
        $leftButton.addClass('btn');
        $leftButton.addClass('left-btn');

        $leftButton.appendTo($upperControll);

        //Adding current month to upper
        var $currentMonth = $('<div></div>');
        $currentMonth.addClass('current-month');
        $currentMonth.text(MONTH_NAMES[date.getMonth()] + ' ' + date.getFullYear());
        $currentMonth.appendTo($upperControll);

        //Upper right button
        var $rightButton = $('<button></button>');
        $rightButton.text('>');
        $rightButton.addClass('btn');
        $rightButton.addClass('right-btn');

        $rightButton.appendTo($upperControll);

        //Adding callendar
        //calendar table
        var $table = $('<table></table>');
        $table.addClass('calendar');        

        createCalendar(date.getFullYear(), date.getMonth());

        $table.appendTo($datePickerContent);


        //Adding down green date
        var $downDate = $('<div></div>');
        $downDate.addClass('current-date');
        var $downDateText = $('<div></div>');

        $downDateText.text(new Date().getDate() + ' ' + MONTH_NAMES[new Date().getMonth()] + ' ' + new Date().getFullYear());
        
        $downDateText.addClass('current-date-link');

        $downDateText.appendTo($downDate);
        $downDate.appendTo($datePickerContent);

        function createCalendar(year, month) {
            $table.html('');
            var dateNow = new Date(year, month, 1);
            do {
                dateNow = dateNow.getPreviousDay();
            } while (dateNow.getDayName() !== WEEK_DAY_NAMES[0]);

            //set week names
            var $th = null;
            var $td = null;
            var $tr = $('<tr></tr>');

            for (var i = 0; i < 7; i += 1) {
                $th = $('<th></th>');
                $th.text(WEEK_DAY_NAMES[i]);
                $th.appendTo($tr);
            }

            $tr.appendTo($table);

            //set days 
            for (var r = 0; r < 6; r+=1) {
                $tr = $('<tr></tr>');

                for (var d = 0; d < 7; d+=1) {
                    $td = $('<td></td>');
                    $td.text(dateNow.getDate());
                    
                    if (dateNow.getMonth() !== month) {
                        $td.addClass('another-month');
                    } else {
                        $td.addClass('current-month');
                    }

                    $td.attr('data-info', dateNow.getDate() + '/' + (dateNow.getMonth() + 1) + '/' + dateNow.getFullYear());

                    $td.appendTo($tr);

                    dateNow = dateNow.getNextDay();
                }

                $tr.appendTo($table);
            }
        }

        //Add events
        $('.datepicker').on('click', function () {
            createCalendar(date.getFullYear(), date.getMonth());
            $datePickerContent.addClass('datepicker-content-visible');
        });

        $('.left-btn').on('click', function () {
            date = date.getPreviousMonth();
            createCalendar(date.getFullYear(), date.getMonth());
            $currentMonth.text(MONTH_NAMES[date.getMonth()] + ' ' + date.getFullYear());
        });

        $('.right-btn').on('click', function () {
            date = date.getNextMonth();
            createCalendar(date.getFullYear(), date.getMonth());
            $currentMonth.text(MONTH_NAMES[date.getMonth()] + ' ' + date.getFullYear());
        });

        $('body').on('click', 'td.current-month', function() {
             var thisEl = $(this);   
             $thisInput.val(thisEl.attr('data-info'));
             $datePickerContent.removeClass('datepicker-content-visible');
             date = new Date();
             $currentMonth.text(MONTH_NAMES[date.getMonth()] + ' ' + date.getFullYear());
        });

        $('.current-date-link').on('click', function () {
            date = date.getNextMonth();
            $thisInput.val(new Date().getDate() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getFullYear());
            $datePickerContent.removeClass('datepicker-content-visible');
            date = new Date();
            $currentMonth.text(MONTH_NAMES[date.getMonth()] + ' ' + date.getFullYear());
        });

        //Hardcore task :D
        $(document).mouseup(function (e)
        {
            var container = $('.datepicker-content');

            if (!container.is(e.target) // if the target of the click isn't the container...
               && container.has(e.target).length === 0) // ... nor a descendant of the container
            {
                 $datePickerContent.removeClass('datepicker-content-visible');
                 date = new Date();
                 $currentMonth.text(MONTH_NAMES[date.getMonth()] + ' ' + date.getFullYear());
            }
        });


        return $thisInput;
    };
}