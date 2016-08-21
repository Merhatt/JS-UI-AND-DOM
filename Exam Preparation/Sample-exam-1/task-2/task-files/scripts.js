$.fn.tabs = function () {
    $this = $(this);
    $this.addClass('tabs-container');

    var $tabs = $('.tab-item');
    $($tabs[0]).addClass('current');

    return $this;
};