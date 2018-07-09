
(function(window){
    /**
     * 保持body布局函数闭包;
     */
    function clientArea(){
        //获取可视区宽高;
        var wid = document.documentElement.clientWidth;
        var hei = document.documentElement.clientHeight;
        document.body.style.width = wid + "px";
        document.body.style.height = hei + "px";
        //在可视区宽高发生变化时重新对body的范围进行赋值;
        window.onresize = function () {
            var wid = document.documentElement.clientWidth;
            var hei = document.documentElement.clientHeight;
            document.body.style.width = wid + "px";
            document.body.style.height = hei + "px";
        }
       }
    function xuanZhuan(box,img,arr1){
        var id = null;
        var deg = 360 / arr1.length;
        var x = 0;
        id = setInterval(function () {
            for (var i = 0; i <arr1.length; i++) {
                img[i].style = 'transform : rotateY(' + ((deg * i) + ((x++) * 0.02)) + 'deg) translateZ(' + img.length *
                    20 + 'px);transition: 0.6s';
            }
        }, 30);
        function biBao(){
            return [id,deg];
        }
        return biBao;
    }
       window.clientArea= clientArea;
       window.xuanZhuan= xuanZhuan;
}(window))