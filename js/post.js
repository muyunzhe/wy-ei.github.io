$(function () {
    // 添加回到顶部图标
    $('<div>').attr('id', 'to-top').appendTo('body').click(function () {
        $(document.body).animate({scrollTop:0}, 800,'swing');
        return false;
    });

    // 展开评论
    $('#add-comment').click(function () {
        $('#comment').show().queue(function(){
            $('body').scrollTop($('body').height() - $(window).height());
        });
        $('.show-comment').remove();
    });


    // 读取图片的 alt 信息，根据其内容修改页面
    // bg：设置宽度为100%，宽高比为 16：9
    // hbg：将其设置为 header 的背景图片
    // both：将其宽度设置为100%，并设置为 header 的背景
    // 将余下的 alt 内容添加在图片下方
    $('.content img').each(function (i, img) {
        var $this = $(img),
            alt = $this.attr('alt');
        if (!alt) {
            return;
        }
        var
            altPrefix = alt.split('-')[0],
            altText = alt.split('-')[1];
        var isPage = $('#page').length == 0 ? false : true;

        var width = $this.parent().width();
        if (altPrefix == 'bg') {
            $this.css('width', '100%');
            $this.css('height', width / 16 * 9);
        } else if (altPrefix == 'hbg' && !isPage) {
            $('#header').css('backgroundImage', 'url(' + $this.attr('src') + ')');
            $this.parent().remove();
            return;
        } else if (altPrefix == 'both' && !isPage) {
            $('#header').css('backgroundImage', 'url(' + $this.attr('src') + ')');
            $this.css('width', '100%');
            $this.css('height', width / 16 * 9);
        }else{
            altText = altPrefix;
        }
        if (altText) {
            $('<div>').addClass('img-alt-wrap').wrapInner('<p>'+altText+'</p>').insertAfter($this);
        }
    });
});
