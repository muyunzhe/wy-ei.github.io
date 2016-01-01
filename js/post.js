$(function () {
    // 添加回到顶部图标
    $('<div>').attr('id', 'to-top').appendTo('body').click(function () {
        (function scroll() {
            var scrollTop = $(document).scrollTop();
            if (scrollTop != 0) {
                $(document).scrollTop(scrollTop / 1.3 - 10);
                setTimeout(scroll, 100);
            }
        })();
    });

    // 展开评论
    $('#add-comment').click(function () {
        $('#comment').show().queue(function(){
            $('body').scrollTop($('body').height() - $(window).height());
        });
        $('#show').remove();
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

    // 此段代码 , 不解释 -_-
    (function () {
        var ls = window.localStorage,
            ss = window.sessionStorage;
        var isSomeOne = /wyt.*/.test(ls.getItem('uid')),
            isfirst = ss.getItem('w') == 'ok' ? false : true;
            
        if (isSomeOne && isfirst) {
            ss.setItem('w', 'ok');
            var code = '%E4%BA%B2%E7%88%B1%E7%9A%84%E4%BD%A0%E6%9D%A5%E4%BA%86%EF%BC%81';
            var str = decodeURIComponent(code);
            $box = $('<div>').addClass('info-box').wrapInner('<p>'+str+'</p>').appendTo('body');
            $box.fadeOut(10000);
            $box.hover(function () {
                    $box.css('opacity', 1);
                    $box.stop();
                },
                function () {
                    $box.fadeOut(10000);
                });
        }
    })();

});
