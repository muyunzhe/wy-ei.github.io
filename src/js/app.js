window.addEventListener('load', function() {
    // 展开评论    
    var showComment = document.getElementById('show-comment');
    var comment = document.getElementById('comment');
    var body = document.body;
    if (showComment) {
        showComment.addEventListener('click', function() {
            comment.style.display = 'block';
            showComment.parentElement.removeChild(showComment);
            body.scrollTop = body.clientHeight - window.innerHeight;
        });
    }

    // 将图片的 alt 属性内容添加在图片下方
    // 在 markdown 中使用了 alt 属性来控制图片的
    // 所以需要剔除那部分信息
    // w100: 设置图片的宽度为 100%
    var imgs = document.querySelectorAll('.content img');
    for (var i = 0, len = imgs.length; i < len; i++) {
        var alt = imgs[i].getAttribute('alt');
        if (!alt) {
            return;
        }
        var text,
            rText = /(?:w\d+)?-?(.*)/g;
        var match = rText.exec(alt);
        if (match) {
            text = match[1];
        }
        if (text) {
            var div = document.createElement('div');
            div.setAttribute('class', 'img-alt-wrap');
            div.innerHTML = '<p>' + text + '</p>';
            imgs[i].parentElement.appendChild(div);
        }
    }
    
    
    var toTop = document.getElementsByClassName('to-top')[0];
    toTop.addEventListener('click',function(){
       document.body.scrollTop = 0; 
    });
});