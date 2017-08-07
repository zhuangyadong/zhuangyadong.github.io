/**
 * Created by Admin on 2017/8/3.
 */
function ctfmon() {
    var onoff = true;
    var ctfmon = document.querySelector('.r5');
    ctfmon.onclick=function () {
        if(onoff){
            ctfmon.innerText = '英';
            onoff = false;
        }else {
            ctfmon.innerText = '中';
            onoff = true;
        }
    };
};
ctfmon();

function gobox() {
    var ontop = document.querySelector('.r1');
    var r1box = document.querySelector('.r1Box');
    var onoff = true;
    ontop.onclick = function (event) {
        event.stopPropagation();
        if(onoff){
            r1box.style.display = 'block';
            onoff = false;
        }else {
            r1box.style.display = 'none';
            onoff = true;
        }
    };
    r1box.onclick = function (event) {
        event.stopPropagation();

    }
    document.onclick = function () {
        r1box.style.display = 'none';
    }
}
gobox();

//--------------------------日历

window.onload = function () {

    var box = document.querySelector('#box');
    var uls = box.querySelectorAll('ul');

    var big = document.getElementById('top');
    var divs=big.querySelectorAll('div');
    var changeYear = divs[2].querySelector('a');
    var yearUl = document.querySelector('#change ul');
    var change = document.querySelector('#change');
    var now = new Date();
    var topSpan = big.querySelector('span');
    var topChangeYear = document.querySelector('#changeYear');
    var topChangeYearUl = document.querySelector('#changeYear ul');
    /*
     *
     * divs[0]  时间
     * divs[1]  年月日 星期
     * divs[2]  年份
     *
     *
     */
    topSpan.innerHTML = now.getFullYear();
    changeYear.innerHTML = now.getFullYear()+'年'+(now.getMonth()+1)+'月';
    setInterval(function () {
        var a = new Date();
        divs[0].innerHTML =formatNum(a.getHours())+':'+formatNum(a.getMinutes())+':'+formatNum(a.getSeconds());
    },500);

    divs[1].innerHTML = now.getFullYear()+'年'+(now.getMonth()+1)+'月'+now.getDate()+'日，星期'+formatWeek(now.getDay())
    var strY = '';
    for(var i=1; i<=12; i++){
        strY+='<li>'+i+'月</li>'
    }
    for(var i=1; i<=4; i++){
        strY+='<li style="color: #6e6e6e;">'+i+'月</li>'
    }
    var strZ = '';
    for(var i=2016; i<=2031; i++){
        strZ+='<li>'+i+'</li>'
    }
    topChangeYearUl.innerHTML=strZ
    yearUl.innerHTML=strY;
    changeYear.onclick=function () {
        topSpan.style.display='block';
        change.style.display='block';
        var topLis = yearUl.querySelectorAll('li');
        var topChangeLis = topChangeYearUl.querySelectorAll('li');
        for(var i=0; i<topLis.length; i++){
            topLis[i].index=i;
            topLis[i].onmouseover=function () {
                for(var i=0; i<topLis.length; i++){
                    topLis[i].className='';
                }
                topLis[this.index].className='active'
            }
            topLis[i].onclick=function () {
                topSpan.style.display='none';
                change.style.display='none';
                now.setMonth(parseInt(topLis[this.index].innerHTML)-1)
                tm();
                changeYear.innerHTML = now.getFullYear()+'年'+(now.getMonth()+1)+'月';
                topSpan.innerHTML = now.getFullYear();
                divs[1].innerHTML = now.getFullYear()+'年'+(now.getMonth()+1)+'月'+now.getDate()+'日，星期'+formatWeek(now.getDay())
            }
        }

        topSpan.onclick=function () {

            topChangeYear.style.display='block';
            for(var i=0; i<topChangeLis.length; i++){
                topChangeLis[i].index=i;
                topChangeLis[i].onclick=function () {

                    topChangeYear.style.display='none';
                    now.setFullYear(parseInt(topChangeLis[this.index].innerHTML))
                    tm();
                    changeYear.innerHTML = now.getFullYear()+'年'+(now.getMonth()+1)+'月';
                    topSpan.innerHTML = now.getFullYear();
                    divs[1].innerHTML = now.getFullYear()+'年'+(now.getMonth()+1)+'月'+now.getDate()+'日，星期'+formatWeek(now.getDay());

                }
                topChangeLis[i].onmouseover=function () {
                    for(var i=0; i<topChangeLis.length; i++){
                        topChangeLis[i].className='';
                    }
                    topChangeLis[this.index].className='active'
                }
            }
        }
    };

    tm();

    function tm() {


        //get days of this month
        function days(year, month) {
            return new Date(year, month + 1, 0).getDate();
        }
        var day=days(now.getFullYear(),now.getMonth());


        //得到这个月1号的星期
        function firstD(year,month) {
            return new Date(year,month,1).getDay();
        }
        var fD = firstD(now.getFullYear(),now.getMonth());
        //今天日期
        var today = now.getDate();
        var str='';
        var a=days(now.getFullYear(),now.getMonth()-1);
        for(var i=a-fD+1; i<=a; i++){
            str+='<li style="color: #6E6E6E;">'+i+'</li>'
        }
        for(var i=1; i<=day; i++){
            var k=i==today?k='active':'';
            str+='<li class="'+k+'">'+i+'</li>';
        }
        var nd = days(now.getFullYear(),now.getMonth());
        var od = new Date();
        od.setDate(nd);
        var t=od.getDay();
        for(var i=1; i<7-t; i++){
            str+='<li style="color: #6E6E6E">'+i+'</li>';
        }
        uls[1].innerHTML=str;

        function has0(v) {
            return v >= 10 ? "" + v : "0" + v;
        }
        //格式化星期
        function formatWeek(v){
            return	['日','一','二','三','四','五','六'][v];
        }
        var boxLi = uls[1].querySelectorAll('li');

        for(var i=0; i<boxLi.length; i++){
            boxLi[i].index = i;
            boxLi[i].onmouseover=function () {

                for(var i=0; i<boxLi.length; i++) {
                    if (boxLi[i].className == "active") {
                        boxLi[i].className = 'active';
                    } else {
                        boxLi[i].className = '';
                    }
                    boxLi[this.index].className= 'cgcg';
                }

            }
            boxLi[i].onmouseout=function () {

                for(var i=0; i<boxLi.length; i++) {
                    if (boxLi[i].className == "active") {
                        boxLi[i].className = 'active';
                    } else {
                        boxLi[i].className = '';
                    }

                }

            }
            boxLi[i].onclick=function () {
                for(var i=0; i<boxLi.length; i++) {

                    boxLi[i].className = '';


                }
                boxLi[this.index].className = 'active';
                now.setDate(parseInt(boxLi[this.index].innerHTML));
                changeYear.innerHTML = now.getFullYear()+'年'+(now.getMonth()+1)+'月';
                topSpan.innerHTML = now.getFullYear();
                divs[1].innerHTML = now.getFullYear()+'年'+(now.getMonth()+1)+'月'+now.getDate()+'日，星期'+formatWeek(now.getDay());



            }
        }
        function css(){
            if(arguments.length==2){
                if(arguments[0].currentStyle){
                    return arguments[0].currentStyle[arguments[1]];
                }else{
                    return getComputedStyle(arguments[0])[arguments[1]];
                }
            }else{
                arguments[0].style[arguments[1]]=arguments[2];
            }
        }

    }


    /*css(btns[0],'width');
     css(btns[0],'width','100px');*/

    function css(){
        if(arguments.length==2){
            if(arguments[0].currentStyle){
                return arguments[0].currentStyle[arguments[1]];
            }else{
                return getComputedStyle(arguments[0])[arguments[1]];
            }
        }else{
            arguments[0].style[arguments[1]]=arguments[2];
        }
    }

}


function log(i) {
    return console.log(i);
};
function dir(i) {
    return console.dir(i);
};

/*
 获取行间样式，两个参数代表读取，三个参数代表改变
 css(btns[0],'width');
 css(btns[0],'width','100px');
 */

function css(){
    if(arguments.length==2){
        if(arguments[0].currentStyle){
            return arguments[0].currentStyle[arguments[1]];
        }else{
            return getComputedStyle(arguments[0])[arguments[1]];
        }
    }else{
        arguments[0].style[arguments[1]]=arguments[2];
    }
};


/*
 * 日期处理
 * 格式化时间
 * */
function formatDate(arr,n){
    var s = '';
    var n = n || 0;
    var aStr = ['年月日时分秒','-- ::','// ::'];
    if(n>aStr.length-1)n=aStr.length-1;
    for(var i=0; i<arr.length; i++){
        s += arr[i] + aStr[n].charAt(i);
        if(i==2&&n==0)s += ' ';
    }
    if(s.charAt(s.length-1) == '-'||s.charAt(s.length-1) == '/'){
        s = s.substring(0,s.length-1);
    }
    return s;
};
/*
 * 格式化数字
 * */
function formatNum(v){
    return v<10?'0'+v:''+v;
};

/*
 * 格式化星期
 * */
function formatWeek(v){
    return ['日','一','二','三','四','五','六'][v];
}

function clock(){
    var canvas = document.getElementById("clock");
    var cxt = canvas.getContext("2d");

    function drawClock() {
        var now = new Date();
        var sec = now.getSeconds();
        var min = now.getMinutes();
        var hour = now.getHours();
        hour > 12 ? hour - 12 : hour;
        hour += (min / 60);
        //先清空画布
        cxt.clearRect(0, 0, canvas.width, canvas.height);


        //美女图片作为表盘背景
        // var img = new Image();
        // img.style.background = "red";
        // cxt.drawImage(img, 0, 0);
        //img.onload = function () {
        //    cxt.drawImage(img, 0, 0);
        //}

        //画表盘大圆 圆心：x=250 y=250
        cxt.strokeStyle = "#ccc";
        cxt.lineWidth = 1;
        cxt.beginPath();
        cxt.arc(52, 52, 50, 0, 360);
        cxt.stroke();
        cxt.closePath();

        //时刻度
        for (var i = 0; i < 12; i++) {
            cxt.save();//保存当前状态
            cxt.lineWidth = 2;
            cxt.strokeStyle = "#fff";
            //设置原点
            cxt.translate(52, 52);
            //设置旋转角度
            cxt.rotate(30 * i * Math.PI / 180);//弧度   角度*Math.PI/180
            cxt.beginPath();
            cxt.moveTo(0, -50);
            cxt.lineTo(0, -45);
            cxt.stroke();
            cxt.closePath();
            cxt.restore();//把原来状态恢复回来
        }

        // //分刻度
        // for (var i = 0; i < 60; i++) {
        //     cxt.save();
        //     cxt.lineWidth = 2;
        //     cxt.strokeStyle = "#FFFF00";
        //     cxt.translate(250, 250);
        //     cxt.rotate(i * 6 * Math.PI / 180);
        //     cxt.beginPath();
        //     cxt.moveTo(0, -185);
        //     cxt.lineTo(0, -195);
        //     cxt.stroke();
        //     cxt.closePath();
        //     cxt.restore();
        // }



        //以下的时针、分针、秒针均要转动，所以在这里要设置其异次元空间的位置
        //根据当前的小时数、分钟数、秒数分别设置各个针的角度即可
        //-----------------------------时针-----------------------------
        cxt.save();
        cxt.lineWidth = 3;
        cxt.strokeStyle = "#fff";
        cxt.translate(52, 52);
        cxt.rotate(hour * 30 * Math.PI / 180);//每小时旋转30度
        cxt.beginPath();
        cxt.moveTo(0, -25);
        cxt.lineTo(0, 0);
        cxt.stroke();
        cxt.closePath();
        cxt.restore();

        //-----------------------------分针-----------------------------
        cxt.save();
        cxt.lineWidth = 2;
        cxt.strokeStyle = "#fff";
        cxt.translate(52, 52);
        cxt.rotate(min * 6 * Math.PI / 180);//每分钟旋转6度
        cxt.beginPath();
        cxt.moveTo(0, -30);
        cxt.lineTo(0, 0);
        cxt.stroke();
        cxt.closePath();
        cxt.restore();

        //-----------------------------秒针-----------------------------
        cxt.save();
        cxt.lineWidth = 1;
        cxt.strokeStyle = "#fff";
        cxt.translate(52, 52);
        cxt.rotate(sec * 6 * Math.PI / 180);//每秒旋转6度
        cxt.beginPath();
        cxt.moveTo(0, -40);
        cxt.lineTo(0, 0);
        cxt.stroke();
        cxt.closePath();


        //美化表盘，画中间的小圆
        cxt.beginPath();
        cxt.arc(0, 0, 4, 0, 360);
        cxt.fillStyle = "#000";
        cxt.fill();
        cxt.strokeStyle = "#fff";
        cxt.stroke();
        cxt.closePath();

        //秒针上的小圆
        cxt.beginPath();
        // cxt.arc(0, -140, 7, 0, 360);
        cxt.fillStyle = "#FFFF00";
        cxt.fill();
        cxt.stroke();
        cxt.closePath();
        cxt.restore();


        // //显示时间
        // cxt.font = "18px 微软雅黑";
        // cxt.lineWidth = 2;
        // cxt.fillStyle = "#0000FF";
        // hour=now.getHours();
        // hour > 10 ? hour : ("0" + hour)
        // var str = hour + ":" + (min > 10 ? min : ("0" + min))
        // cxt.fillText(str, 225, 380);

        // //中国制造
        // cxt.font = "12px 宋体";
        // cxt.lineWidth = 1;
        // cxt.fillText("Made In China", 210, 400);
    }

    drawClock();
    setInterval(drawClock, 1000);
}
// setTimeout(clock(),1000);
clock();

//------------------------------------------------拖拽

function tz() {
    // event.stopPropagation();
    var aLi = document.getElementById('ul1').getElementsByTagName('li');
    var izIndex = 2;
    var arr = [];
    // var oInput = document.getElementById('input1');

    for(var i=0;i<aLi.length;i++){
        arr.push( [ aLi[i].offsetLeft , aLi[i].offsetTop ] );
    }

    for(var i=0;i<aLi.length;i++){
        aLi[i].style.position = 'absolute';
        aLi[i].style.left = arr[i][0] + 'px';
        aLi[i].style.top = arr[i][1] + 'px';
        aLi[i].style.margin = 0;
    }

    for(var i=0;i<aLi.length;i++){
        aLi[i].index = i;
        drag(aLi[i]);
    }

    // oInput.onclick = function(){
    //
    //     var randomArr = [0,1,2,3,4,5,6,7,8];
    //
    //     randomArr.sort(function(n1,n2){
    //         return Math.random() - 0.5;
    //     });
    //
    //     for(var i=0;i<aLi.length;i++){
    //         startMove( aLi[i] , { left : arr[randomArr[i]][0] , top : arr[randomArr[i]][1] } );
    //
    //         aLi[i].index = randomArr[i];
    //
    //     }
    //
    // };

    function drag(obj){
        var disX = 0;
        var disY = 0;
        obj.onmousedown = function(ev){
            // ev.stopPropagation();

            obj.style.zIndex = izIndex++;

            var ev = ev || window.event;
            disX = ev.clientX - obj.offsetLeft;
            disY = ev.clientY - obj.offsetTop;

            document.onmousemove = function(ev){
                var ev = ev || window.event;
                obj.style.left = ev.clientX - disX + 'px';
                obj.style.top = ev.clientY - disY + 'px';

                for(var i=0;i<aLi.length;i++){
                    aLi[i].style.border = '';
                }

                var nL = nearLi(obj);

                // if(nL){
                //     nL.style.border = '2px red solid';
                // }

            };

            document.onmouseup = function(){
                document.onmousemove = null;
                document.onmouseup = null;

                var nL = nearLi(obj);
                var tmp = 0;

                if(nL){
                    startMove( nL , { left : arr[obj.index][0] , top : arr[obj.index][1] } );
                    startMove( obj , { left : arr[nL.index][0] , top : arr[nL.index][1] } );
                    nL.style.border = '';

                    tmp = obj.index;
                    obj.index = nL.index;
                    nL.index = tmp;
                }
                else{
                    startMove( obj , { left : arr[obj.index][0] , top : arr[obj.index][1] } );
                }

            };

            return false;

        };
    }

    function nearLi(obj){

        var value = 9999;
        var index = -1;

        for(var i=0;i<aLi.length;i++){
            if( pz(obj,aLi[i]) && obj!=aLi[i] ){

                var c = jl(obj,aLi[i]);

                if( c < value ){
                    value = c;
                    index = i;
                }

            }
        }

        if(index != -1){
            return aLi[index];
        }
        else{
            return false;
        }


    }

    function jl(obj1,obj2){

        var a = obj1.offsetLeft - obj2.offsetLeft;
        var b = obj1.offsetTop - obj2.offsetTop;

        return Math.sqrt(a*a + b*b);

    }


    function pz(obj1,obj2){
        var L1 = obj1.offsetLeft;
        var R1 = obj1.offsetLeft + obj1.offsetWidth;
        var T1 = obj1.offsetTop;
        var B1 = obj1.offsetTop + obj1.offsetHeight;

        var L2 = obj2.offsetLeft;
        var R2 = obj2.offsetLeft + obj2.offsetWidth;
        var T2 = obj2.offsetTop;
        var B2 = obj2.offsetTop + obj2.offsetHeight;

        if( R1<L2 || L1>R2 || B1<T2 || T1>B2 ){
            return false;
        }
        else{
            return true;
        }

    }
}
tz();
function inter() {
    var int = document.getElementById('interOn');
    var intCon = document.getElementById('internet');
    var ifra = document.getElementById('ifra');
    var gb = document.getElementById('titL');

    var offon = true;
    int.onclick = function () {
        if(offon){
            intCon.style.display = 'block';
            setTimeout(function () {
                ifra.src = 'https://cn.bing.com';
            },2000)
            offon = false;
        }else {
            ifra.src = '';

            intCon.style.display = 'none';
            offon = true;
        }
    };
    gb.onclick = function () {
        intCon.style.display = 'none';
        ifra.src = '';
        offon = true;
    };

    var interTit = document.getElementById('interTit');
    var L = null;
    var T = null;
    // interTit.onmousedown = function (ev) {
    //     var ev = ev || window.event;
    //     L = ev.clientX - interTit.offsetLeft;
    //     R = ev.clientY - interTit.offsetTop;
    //     document.onmousemove = function (ev) {
    //         var ev = ev || window.event;
    //         intCon.style.left = ev.clientX - L+'px';
    //         intCon.style.top = ev.clientY - L+'px';
    //     }
    //     document.onmouseup = function () {
    //         document.onmousemove = null;
    //         document.onmouseup = null;
    //     }
    //     return false;
    // }

}
inter();
var intaCon = document.getElementById('internet');
var interTit = document.getElementById('interTit');


var params = {
    left: 0,
    top: 0,
    currentX: 0,
    currentY: 0,
    flag: false
};
var getCss = function(o,key){
    return o.currentStyle? o.currentStyle[key] : document.defaultView.getComputedStyle(o,false)[key];
};

var startDrag = function(bar, target, callback){
    if(getCss(target, "left") !== "auto"){
        params.left = getCss(target, "left");
    }
    if(getCss(target, "top") !== "auto"){
        params.top = getCss(target, "top");
    }
    bar.onmousedown = function(event){
        params.flag = true;
        if(!event){
            event = window.event;
            bar.onselectstart = function(){
                return false;
            }
        }
        var e = event;
        params.currentX = e.clientX;
        params.currentY = e.clientY;
    };
    document.onmouseup = function(){
        params.flag = false;
        if(getCss(target, "left") !== "auto"){
            params.left = getCss(target, "left");
        }
        if(getCss(target, "top") !== "auto"){
            params.top = getCss(target, "top");
        }
    };
    document.onmousemove = function(event){
        var e = event ? event: window.event;
        if(params.flag){
            var nowX = e.clientX, nowY = e.clientY;
            var disX = nowX - params.currentX, disY = nowY - params.currentY;
            target.style.left = parseInt(params.left) + disX + "px";
            target.style.top = parseInt(params.top) + disY + "px";
            if (event.preventDefault) {
                event.preventDefault();
            }
            return false;
        }

        if (typeof callback == "function") {
            callback(parseInt(params.left) + disX, parseInt(params.top) + disY);
        }
    }
};
startDrag(interTit.intaCon)