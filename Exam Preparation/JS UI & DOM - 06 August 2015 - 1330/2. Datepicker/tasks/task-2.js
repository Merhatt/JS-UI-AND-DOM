function solve() {
    $.fn.datepicker = function () {
        var MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var WEEK_DAY_NAMES = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

        Date.prototype.getMonthStart = function () {
            return new Date(this.getFullYear(), this.getMonth(), 1);
        };
        Date.prototype.getMonthName = function () {
            return MONTH_NAMES[this.getMonth()];
        };

        Date.prototype.getDayName = function () {
            return WEEK_DAY_NAMES[this.getDay()];
        };

        function daysInMonth(year, month) {
            return new Date(year, month, 0).getDate();
        }

        Date.prototype.getDaysInMonth = function () {
            var days = new Date(this.getFullYear(), this.getMonth(), 0);

            return days.getDate();
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


        // you are welcome :)
        var $this = $(this);
        var dateNow = new Date();
        $this.addClass('datepicker');

        var mainWrapper = $('<div></div>');
        mainWrapper.addClass('datepicker-wrapper');
        mainWrapper.appendTo($this.parent());
        $this.appendTo(mainWrapper);

        //Picker
        var $picker = $('<div></div>');
        $picker.addClass('picker');

        $picker.appendTo(mainWrapper);

        //Up controlls
        var $upControlls = $('<div></div>');
        $upControlls.addClass('controls');

        var $leftBtn = $('<button></button>');
        $leftBtn.addClass('btn').addClass('left');
        $leftBtn.html('<');

        var $currentMonth = $('<div></div>');
        $currentMonth.addClass('current-month');
        setMonthUp(dateNow);

        var $rightBtn = $('<button></button>');
        $rightBtn.addClass('btn').addClass('right');
        $rightBtn.html('>');

        $leftBtn.appendTo($upControlls);
        $currentMonth.appendTo($upControlls);
        $rightBtn.appendTo($upControlls);

        $upControlls.appendTo($picker);

        //Callendar
        var $callendar = $('<table></table>');
        $callendar.addClass('calendar');

        $callendar.appendTo($picker);
        creatTable(dateNow, dateNow.getMonth());

        //Down Controll
        var $currentDate = $('<div></div>');
        $currentDate.addClass('current-date').addClass('c');
        var $currentDateText = $('<div></div>');
        $currentDateText.addClass('current-date-link').addClass('down');
        $currentDateText.html(new Date().getDate() + ' ' + new Date().getMonthName() + ' ' + new Date().getFullYear());
        $currentDateText.attr('data-id',  new Date().getDate() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getFullYear());
        $currentDateText.appendTo($currentDate);

        $currentDate.appendTo($picker);

        function creatTable(date, month) {
            $callendar.html('');
            date = date.getMonthStart();

            var tr = $('<tr></tr>');

            for(var i = 0; i < 7; i+=1) {
                $('<th></th>').html(WEEK_DAY_NAMES[i])
                              .appendTo(tr);
            }

            tr.appendTo($callendar);

            do {
                date = date.getPreviousDay();
            } while (date.getDayName() !== WEEK_DAY_NAMES[0]);

            for (var r = 0; r < 6; r+=1) {
                tr = $('<tr></tr>');

                for(var c = 0; c < 7; c+=1) {
                    if(date.getMonth() === month) {
                        var td = $('<td></td>').addClass('current-month').addClass('c').html(date.getDate());
                        td.attr('data-id',  date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear());
                        td.appendTo(tr);
                    } else {
                        $('<td></td>').addClass('another-month').html(date.getDate()).appendTo(tr);
                    }
                    date = date.getNextDay();
                }

                tr.appendTo($callendar);
            }

        }

        function setMonthUp(date) {
            $currentMonth.html(date.getMonthName() + ' ' + date.getFullYear());
        }

        $('.left').on('click', function (ev) {
            dateNow = dateNow.getPreviousMonth();
            creatTable(dateNow, dateNow.getMonth());
            setMonthUp(dateNow);
        });

        $('.right').on('click', function (ev) {
            dateNow = dateNow.getNextMonth();
            creatTable(dateNow, dateNow.getMonth());
            setMonthUp(dateNow);
        });

        $('body').on('click', function (ev) {
            var target = $(ev.target);
            if(target.hasClass('current-month') && target.hasClass('c')) {
                $this.val(target.attr('data-id'));
                $picker.removeClass('picker-visible');
            }
        }) ;

        $('.down').on('click', function (ev) {
            $this.val($(ev.target).attr('data-id'));
            $picker.removeClass('picker-visible');
        });

        $('.datepicker').on('click', function (ev) {
            $picker.addClass('picker-visible');
        });

        return $this;
    };
}

module.exports = solve;