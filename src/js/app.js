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
        var text,
            rText = /(?:w\d+)?-?(.*)/g;
        var match = rText.exec(alt);
        if(match){
            text = match[1];
        }
        if (text) {
            $('<div>').addClass('img-alt-wrap').wrapInner('<p>'+text+'</p>').insertAfter($this);
        }
    });
});
