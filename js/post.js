// 给包含alt的图片下面添加内容
// 调整alt中包含 bg的图片的大小
// 回到顶部
// 显示评论


$(function(){
    // 添加回到顶部图标
    $('<div>').attr('id','to-top').appendTo('body').click(function(){
        (function scroll(){
            var scrollTop = $(document).scrollTop();
            if(scrollTop != 0){
                $(document).scrollTop(scrollTop/1.3-10);
                setTimeout(scroll,100);
            }
        })();
    });


    // 展开评论
    $('#add-comment').click(function(){
        $('#comment').show();
        $('#show').remove();
    });

    // 读取图片的 alt 信息，根据其内容修改页面
    // bg：设置宽度为100%，宽高比为 16：9
    // hbg：将其设置为 header 的背景图片
    // both：将其宽度设置为100%，并设置为 header 的背景
    // 将余下的 alt 内容添加在图片下方
    $('#post .content img,#page .content img').each(function(i,img){
        var $this = $(img),
            alt = $this.attr('alt');
            if(!alt){
                return;
            }
        var
            altPrefix = alt.split('-')[0],
            altText = alt.split('-')[1];
        var isPage = $('#page').length == 0 ? false:true;

        var width = $this.parent().width();
        if(altPrefix == 'bg'){
            $this.css('width','100%');
            $this.css('height',width/16*9);
        }else if(altPrefix == 'hbg' && !isPage){
            $('#header').css('backgroundImage','url('+$this.attr('src')+')');
            $this.parent().remove();
            return;
        }else if(altPrefix == 'both' && !isPage){
            $('#header').css('backgroundImage','url('+$this.attr('src')+')');
            $this.css('width','100%');
            $this.css('height',width/16*9);
        }
        if(altText){
            var $wrap = $('<div>').addClass('img-alt-wrap');
            $('<p>').text(altText).appendTo($wrap);
            $wrap.insertAfter($this);
        }
    });

    // // js 实现动画效果
    // (function(){
    //     var $header = $('#header'),
    //         headerHeight = $header.height() + parseInt($header.css('paddingTop')) + parseInt($header.css('paddingBottom')),
    //         $snow1 = $('.snow1'),
    //         $snow2 = $('.snow2'),
    //         top1 =  - headerHeight,
    //         top2 = 0;
    //     $('.snow').height(headerHeight);
    //     setInterval(function(){
    //         $snow1.css('top',top1);
    //         $snow2.css('top',top2);
    //         top1 += 2;
    //         top2 += 2;
    //         if(top1 > 0){
    //             top1 = - headerHeight;
    //             top2 = 0;
    //         }
    //     },200);
    // })();

    // 此段代码 , 不解释 -_-
    (function(){
        var ls = window.localStorage,
            ss = window.sessionStorage;
        var isSomeOne = /wyt.*/.test(ls.getItem('uid')),
            isfirst = ss.getItem('wyt') == 'ok' ? false:true;
        if(isSomeOne && isfirst){
            ss.setItem('wyt','ok');
            var $box = $('<div>').addClass('info-box');
            $box.html('<p>亲爱的你来了！</p>');
            $box.appendTo('body');
            $box.fadeOut(10000);
            $box.hover(function(){
                $box.css('opacity',1);
                $box.stop();
            },
            function(){
                $box.fadeOut(10000);
            });
        }
    })();

});