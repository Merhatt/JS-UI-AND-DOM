/* globals $ */
$.fn.gallery = function(cols) {
    cols = cols || 4;
    $this = $(this);
    $this.addClass('gallery');
    var $imgContainers = $('.image-container');
    var $selectedPanel = $('.selected');
    $selectedPanel.css('display', 'none');
    var $currImg = $selectedPanel.find('.current-image');
    var $prevImg = $selectedPanel.find('.previous-image');
    var $nextImg = $selectedPanel.find('.next-image');
    setColsToPerN(cols);
    setEvents();
    $emptyDiv = $('<div></div>');
    $emptyDiv.appendTo($this);

    $currImg.on('click', function() {
        $selectedPanel.css('display', 'none');
        $this.find('.gallery-list').removeClass('blurred');
        $emptyDiv.removeClass('disabled-background');
    });

    function setEvents() {
        $("body").click(function(event) {
            console.log(event.target);
            if ($(event.target).hasClass('image-container') || $(event.target).parent().hasClass('image-container')) {
                $selectedPanel.css('display', '');
                setImages($(event.target).data('info') - 1);
                $this.find('.gallery-list').addClass('blurred');
                $emptyDiv.addClass('disabled-background');
            }
        });
    }

    function setColsToPerN(c) {
        for (var i = 0; i < $imgContainers.length; i += c) {
            $($imgContainers[i]).addClass('clearfix');
        }
    }

    function setImages(index) {
        if (index > 0 && index < $imgContainers.length - 1) {
            $currImg.html($($imgContainers[index]).html());
            $prevImg.html($($imgContainers[index - 1]).html());
            $nextImg.html($($imgContainers[index + 1]).html());
            $prevImg.on('click', function() {
                $prevImg.off('click');
                setImages(index - 1);

            });

            $nextImg.on('click', function() {
                $nextImg.off('click');
                setImages(index + 1);

            });
        } else if (index === 0) {
            $currImg.html($($imgContainers[index]).html());
            $prevImg.html($($imgContainers[$imgContainers.length - 1]).html());
            $nextImg.html($($imgContainers[index + 1]).html());
            $prevImg.on('click', function() {
                $prevImg.off('click');
                setImages($imgContainers.length - 1);


            });

            $nextImg.on('click', function() {
                $nextImg.off('click');
                setImages(index + 1);

            });
        } else {
            $currImg.html($($imgContainers[index]).html());
            $prevImg.html($($imgContainers[index - 1]).html());
            $nextImg.html($($imgContainers[0]).html());
            $prevImg.on('click', function() {
                $prevImg.off('click');
                setImages(index - 1);

            });

            $nextImg.on('click', function() {
                $nextImg.off('click');
                setImages(0);
            });
        }
    }
};