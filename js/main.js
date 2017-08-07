//重命名按钮
var reSetName = document.querySelector('.reSetName');
reSetName.style.display = 'none';

//开始菜单按钮
var start = document.querySelector('.start');
//开关
var onOff = false;
//开始菜单栏

var stDiv = document.querySelector('.nav');
//右键菜单
var menu = document.getElementById('menu');

var menu_firLi = menu.children[0]

//右键菜单下的所有li
var menuLis = menu.querySelectorAll('#menu li');
//新建文件的li
var newFile = document.querySelector('.newFile');
//新建li
var newF = document.querySelector('.newF');
//删除li
var del = document.querySelector('.del');
//日历li
var calendar = document.querySelector('.showDate');
//获取桌面
var con = document.querySelector('.con');
//右下角li
var footer_ll = document.querySelector('.footer_ll');
//获取con下的所有class为files的文件夹
var fileDivs = getByClass(con, 'files');
//获取con下的所有选中的文件夹
var fileActive2 = getByClass(con, 'files active2');
//画框的div
var ppp = document.getElementsByClassName('divBox');
//获取桌面
var box = document.querySelector('.box');
//获取右键菜单下的重置li
var Refresh = getByClass(menu, 'Refresh');
//切换图片背景li
var chaPic = getByClass(menu, 'chaPic');
//排序下的名称li
var forName = getByClass(menu, 'forName');
//阻止删除回收箱的变量
var recycle_bin;
//获取所有class为kou的集合
var kou = con.getElementsByClassName('kou');
//获取kou的集合，用于双击文件夹和画框应用
var Ftext = getByClass(con, 'kou');
//获取con下所有的第一层集合
var newfiles = con.children;
//所有文件夹的数组
var fileArr = [];
//所有子文件夹内的文件夹数组
var sonArr = [];
//所有不包含子文件夹的数组
var faArr = [];
//排序用的数组
var sortArr = [];
//为了数据中mId保证不同的变量
var fileNum = 0;
//为了切换背景图片的变量
var backNum = 10;
//获取数据
var data = aData;
//判断创建文件夹的源目标
var tar;
//当前鼠标坐标点
var disX;
var disY;
//判断显示隐藏的开关
var OF = true;
//要删除的文件夹
var This;
//判断鼠标要移入移出的span
var _This;
//用于存储数据渲染子文件夹
var delJson = {};

var rili = document.getElementById('contaner');
//调用日历对象
function showRl() {
    var offon = true;

    calendar.onclick = function(){
        if (offon){

            rili.style.display = 'block';
            offon = false;
        }else {
            rili.style.display = 'none';
            offon = true;
        }
        // var showDate1 = new showDate({ id: "data_box" });
        // showDate1.init();
    };
}
showRl();

//渲染开始菜单左侧列表,鼠标移入移出
var st_tex_ul =document.querySelector('.st_tex_ul');
for(var i=0;i<12;i++){
    st_tex_ul.innerHTML += '<li class="st_lli"><img src="'+data.aST_Li[i].sImg+'" /><p>'+data.aST_Li[i].title+'</p></li>';
}
var st_lis = document.querySelectorAll('.st_lli');
for(var i=0;i<st_lis.length;i++){
    st_lis[i].addEventListener('mouseover',function(){
        this.style.background = 'rgba(37, 110, 153, 0.41)';
    });
    st_lis[i].addEventListener('mouseout',function(){
        this.style.background = '#FFFFFF';
    });
}
//渲染开始菜单右侧列表,鼠标移入移出改变图片
var st_img = document.querySelector('.st_img');
var st_val_ul = document.querySelector('.st_val_ul');
var st_valLis = st_val_ul.querySelectorAll('li');
for(var i=0;i<st_valLis.length;i++){
    st_valLis[i].index = i;
    st_valLis[i].addEventListener('mouseover',function(){
        st_img.style.background = 'url("'+data.aST_Li[this.index].sImg+'")';
        st_img.style.backgroundSize = '58px 58px';
    });
    st_valLis[i].addEventListener('mouseout',function(){
        st_img.style.background = 'url("'+data.aST_Li[10].sImg+'")';
        st_img.style.backgroundSize = '58px 58px';
    });
}


//右下角时间
calendarShow();
//检测时间并刷新
var timers = setInterval(function () {
    calendarShow();
}, 50000);


//点击重置
Refresh[0].addEventListener('click', function () {
    //判断是否要重新读取
    location.reload(true);
});


//切换背景图片
chaPic[0].addEventListener('click', function () {
    backNum++;
    //根据图片名称判断
    if (backNum > 13) {
        backNum = 10;
    }
    box.style.background = 'url("img/' + backNum + '.jpg")no-repeat';
    box.style.backgroundSize = auto;
});


//点击名字排序时，转换布局
forName[0].addEventListener('click', function () {
    sortArr = [];
    for (var i = 0; i < fileArr.length; i++) {
        //所有文件夹不包含子文件夹的文件夹
        if (fileArr[i].pId == 0) {
            sortArr.push(fileArr[i]);
        }
    }
    for(var i=0;i<sortArr.length;i++){
        //每当文件夹个数到达6时 宽度+100
        mTween(sortArr[i], {top: i % 6 * 100+10, left: Math.floor(i / 6) * 100+10}, 500, 'backIn');
    }
});


//处理右下角时间
function calendarShow() {
    var data = new Date();
    var year = data.getFullYear();
    var month = data.getMonth() + 1;
    var date = data.getDate();
    var hour = data.getHours();
    var minute = data.getMinutes();
    calendar.innerHTML = getZ(hour) + ':' + getZ(minute) + '</br>' + year + '-' + getZ(month) + '-' + getZ(date);
}
//时间补零
function getZ(t){
    return t<10?'0'+t:''+t;
}


//开始移入移出点击功能
start.onmouseover = function () {
    start.style.background = 'url("img/start2.png")no-repeat';
};
start.onmouseout = function () {
    start.style.background = 'url("img/start1.png")no-repeat';
};
start.onclick = function (ev) {
    menu.style.display = 'none';
    if (onOff == false) {
        stDiv.style.visibility = 'visible';
        onOff = true;
    } else {
        stDiv.style.visibility = 'hidden';
        onOff = false;
    }
    ev.cancelBubble = true;
};


//删除文件夹
del.addEventListener('click', function () {
    for(var attr in delJson){
        if(This.mId == attr){
            delete delJson[attr];
        }
    }
    for(var i=0;i<fileArr.length;i++){
        if(fileArr[i].pId == This.mId){
            fileArr.splice(i,fileArr.length-4);
        }
    }
    var rl;
    var rt;
    for (var i = 0; i < fileArr.length; i++) {
        //当mId为回收站时 不能删除 ，并且删除其他文件夹最终目标以回收站为目标
        if (fileArr[i].mId == 3) {
            rl = fileArr[i].offsetLeft;
            rt = fileArr[i].offsetTop;
            recycle_bin = fileArr[i];
        }
    }
    //当目标不是回收站时,删除文件夹
    if (This != recycle_bin) {
        if(This.pId == 0){
            var timer1 = setInterval(function(){
                This.style.transform +='rotate('+10+'deg)';
            },16);
            mTween(This, {top: rt, left: rl, opacity: 1,width:30,height:30}, 300, 'backIn', function () {
                con.removeChild(This);
                for (var i = 0; i < fileArr.length; i++) {
                    if (This == fileArr[i]) {
                        //用截取来删除文件夹
                        fileArr.splice(i, 1);
                        clearInterval(timer1);
                    }
                }
            });
        }else{
            var timer = setInterval(function(){
                This.style.transform +='rotate('+10+'deg)';
            },16);
             mTween(This,{opacity:0,width:30,height:30},500,'backIn',function(){
            kou[0].children[2].removeChild(This);
            for (var i = 0; i < fileArr.length; i++) {
                if (This == fileArr[i]) {
                    fileArr.splice(i, 1);
                    clearInterval(timer);
                }
            }
                });
        }

    }

});
//右键重命名
reSetName.addEventListener('click',function(ev){
    var tSpan = This.children[1].children[1];
    var tText = This.children[1].children[0];
    console.log(tText);
    tText.style.display = 'block';
    tText.focus();
    This.onkeydown = function (ev) {
        if (ev.keyCode == 13) {
            tText.className = 'F_text';
            tSpan.innerHTML = tText.value;
            tText.style.display = 'none';
        }
    };
    tText.onblur = function () {
        tText.className = 'F_text';
        tSpan.innerHTML = tText.value;
        tText.style.display = 'none';
    };

});

//判断显示隐藏
function ifTo() {
    if (OF) {
        del.style.display = 'none';
        newF.style.display = 'block';
    } else {
        del.style.display = 'block';
        newF.style.display = 'none';
    }
}


//初始化界面时获取数据渲染页面，显示4个文件夹
for (var i = 0; i < 4; i++) {
    createFile(con, i);
    var fs = con.querySelectorAll('.files');
    for (var j = 0; j < fs.length; j++) {
        fs[i].style.top = 100 * i + 'px';
    }
    dblNewFile(fs);
    //调用移动
    moveFile(fs);
    //右键文件夹
    oncontNewFile();
}


//document左键点击
document.addEventListener('click', function () {
    onOff = false;
    // stDiv.style.display = 'none';
    clearLis();

    menu.style.display = 'none';
});


//鼠标移入,移出,点击文件夹
toFile(fileArr);
function toFile(obj) {
    for (var i = 0; i < obj.length; i++) {
        obj[i].index = i;
        //鼠标移入
        obj[i].onmouseover = function (ev) {
            if (!(this.className == 'files active2')) {
                this.className = 'files active1';
            }
            ev.cancelBubble = true;
        };
        //鼠标移出
        obj[i].onmouseout = function (ev) {
            if (!(this.className == 'files active2')) {
                this.className = 'files';
            }
            ev.cancelBubble = true;
        };
        //点击文件夹时判断文件夹位置
        obj[i].onclick = function () {
            var _this = this;
            if (this.className == 'files active2') {
                //再次点击文件夹是判断不是双击
                setTimeout(function () {
                    _this.onclick = function (ev) {
                        var tSpan = _this.children[1].children[1];
                        var tText = _this.children[1].children[0];
                        //检测回车,锁定文件名
                        _this.onkeydown = function (ev) {
                            if (ev.keyCode == 13) {
                                tText.className = 'F_text';
                                tSpan.innerHTML = tText.value;
                            }
                        };
                        //失去焦点,确定文件夹名称
                        tText.onblur = function () {
                            tText.className = 'F_text';
                            tSpan.innerHTML = tText.value;
                            if (getPos(tSpan).height >= 15) {
                                css(_this, 'height', 81 + 14 + 'px')
                            } else {
                                css(_this, 'height', 81 + 'px')
                            }
                        };
                        if (ev.clientY - parseInt(_this.style.top) > 80 || ev.clientY - parseInt(_this.style.top) < 50) {
                            tText.className = 'F_text';
                            tSpan.innerHTML = tText.value;
                        }
                        if (ev.clientY - parseInt(_this.style.top) > 50 && ev.clientY - parseInt(_this.style.top) < 80) {

                            tText.className = 'F_text show';
                            tText.focus();
                            ev.cancelBubble = true;
                        }
                    }
                }, 500);
            }
        };
    }
}


//新建文件夹
newFile.addEventListener('click', function () {
    if (tar == con) {
        //如果目标源为桌面
        createFile(con, 4);
        toFile(fileArr);
    } else {
        //否则根据点击的目标源
        createFile(tar, 5);

        //for循环去遍历，转变布局，自然向下排序
        var a = 0;
        for(var i=0;i<fileArr.length;i++){
            fileArr[fileArr.length-1].pId = tar.offsetParent.MID;
            if(fileArr[i].pId == tar.offsetParent.MID){
                fileArr[i].style.left = 0;
                fileArr[i].style.top = 0;
                fileArr[i].style.left = Math.floor(a / 5) * 90 + 'px';
                fileArr[i].style.top = Math.floor(a % 5) * 90 + 'px';
                a++;
            }
        }
        toFile(fileArr);
    }
    dblNewFile(newfiles);
    moveFile(fileArr);
    oncontNewFile();
});


//document右键点击
document.addEventListener('contextmenu', function (ev) {
    //获取kou下面的main clear
    if (ev.target == con || ev.target.className == 'main clear' ) {
        del.style.display = 'none';
        newF.style.display = 'block';
        reSetName.style.display = 'none';
    }
    // stDiv.style.display = 'none';
    clearLis();
    showMenu(ev);
    getIn(menu);
    ev.preventDefault();
    tar = ev.target;
});


//鼠标右键文件夹
function oncontNewFile() {
    for (var i = 0; i < fileArr.length; i++) {
        //右键时显示删除，隐藏新建
        fileArr[i].oncontextmenu = function () {
            This = this;
            del.style.display = 'block';
            newF.style.display = 'none';
            reSetName.style.display = 'block';
        };
    }
    OF = true;
}


//双击文件夹
function dblNewFile(obj) {
    for (var i = 0; i < obj.length; i++) {
        obj[i].index = i;
        obj[i].addEventListener('dblclick', function (ev) {
            if (Ftext.length == 0) {
                var lli = document.createElement('li');
                lli.innerHTML = this.children[1].children[0].value;
                lli.style.opacity = 1;
                footer_ll.appendChild(lli);
                _This = this;
                var kou = document.createElement('div');
                kou.className = 'kou';
                kou.MID = this.mId;
                //ES6 模板框架 可以用webpack转译ES5
                kou.innerHTML =
                    '<div class="fox">'+
                    '<span></span>'+
                    '<span></span>'+
                    '<span></span>'+
                    '</div>'+
                    '<div class="urls">'+
                    '<input type="text" class="ur"/>'+
                    '</div>'+
                    '<div class="main clear">'+
                    '</div>';
                con.appendChild(kou);
                var b = 0;
                for(var attr in delJson){
                    //对象的元素
                    //  console.log(delJson[attr][1]);
                    //对象的value值
                    //  console.log(delJson[attr]);
                    //对象的mId
                    //  console.log(attr);

                    if(parseInt(delJson[attr][0]) == this.mId){
                        kou.children[2].appendChild(delJson[attr][1]);
                        delJson[attr][1].style.left = 0;
                        delJson[attr][1].style.top = 0;
                        delJson[attr][1].style.left = Math.floor(b / 5) * 90 + 'px';
                        delJson[attr][1].style.top = Math.floor(b % 5) * 90 + 'px';
                        b++;
                    }
                }
                //如果窗口存在,在窗口内画框
                if (Ftext[0]) {
                    huaKuang(Ftext[0]);
                }
                var ur = kou.querySelector('.ur');
                ur.value = '/' + this.children[1].children[0].value;
                var fox = document.querySelector('.fox');
                var spans = fox.querySelectorAll('span');
                //鼠标移入移出改变背景
                for (var i = 0; i < spans.length; i++) {
                    spans[i].index = i;
                    // spans[i].onmouseover = function () {
                    //     css(this.offsetParent, 'background', 'url("img/' + (this.index + 1) + '.png") no-repeat');
                    //     css(this.offsetParent, 'backgroundSize', '108px 24px');
                    // };
                    // spans[i].onmouseout = function () {
                    //     css(this.offsetParent, 'background', 'url("img/0.png") no-repeat');
                    //     css(this.offsetParent, 'backgroundSize', '108px 24px');
                    // };
                    //点击对应最小化,最大化,关闭
                    spans[i].onclick = function (ev) {
                        if (this.index == 0) {
                            mTween(kou, {left: -0, top: 800, opacity: 1}, 500, 'linear');
                            lli.onclick = function () {
                                mTween(kou, {opacity: 1}, 300, 'linear', function () {
                                    mTween(kou, {left: 204, top: 65}, 500, 'linear')
                                })
                            };
                        } else if (this.index == 1) {
                            //最大化窗口
                        } else if (this.index == 2) {
                            for(var i=0;i<fileArr.length;i++){
                                if(fileArr[i].pId == kou.MID){
                                    delJson[fileArr[i].mId] = [fileArr[i].pId,fileArr[i]];
                                }
                            }
                            if(kou.style.opacity ==1){
                            }
                            mTween(kou, {opacity: 1}, 500, 'linear', function () {
                                mTween(lli, {opacity: 1}, 500, 'linear');
                                footer_ll.removeChild(lli);
                                con.removeChild(kou);
                            });
                        }
                        ev.cancelBubble = true;
                    };
                }
            } else {
                return;
            }
            ev.stopPropagation();
        });
    }
}


//鼠标画框
huaKuang(con);
function huaKuang(obj) {
    obj.addEventListener('mousedown', function (ev) {
        // stDiv.style.display = 'none';
        menu.style.display = 'none';
        var pp = document.createElement("p");
        pp.className = 'divBox';
        var disX = ev.clientX;
        var disY = ev.clientY;
        //判断画框目标源为桌面还是窗口
        if (obj.className != 'con') {
            obj.className = 'kou';
            obj.appendChild(pp);
            pp.style.zIndex = 18;
        } else {

            obj.appendChild(pp);
        }
        ev.stopPropagation();
        document.addEventListener('mousemove', mMove);
        document.addEventListener('mouseup', mUp);
        function mUp(ev) {
            if (ppp) {
                obj.removeChild(pp);
            }
            document.removeEventListener('mousemove', mMove);
            document.removeEventListener('mouseup', mUp);
            ev.stopPropagation();
        }
        //鼠标移动时判断是桌面还是窗口
        function mMove(ev) {
            //禁止页面滚动
            document.documentElement.style.overflow='hidden';
            //如果为窗口需要限定画框范围
            if (obj.className != 'con') {
                pp.style.width = Math.abs(Math.abs(disX - ev.clientX)) + 'px';
                pp.style.height = Math.abs(Math.abs(disY - ev.clientY)) + 'px';
                pp.style.left = Math.min(ev.clientX - Ftext[0].offsetLeft, disX - Ftext[0].offsetLeft) + 'px';
                pp.style.top = Math.min(ev.clientY - Ftext[0].offsetTop, disY - Ftext[0].offsetTop) + 'px';
                if (Math.min(ev.clientX - Ftext[0].offsetLeft) <= 6) {
                    pp.style.left = 6 + 'px';
                    pp.style.width = disX - Ftext[0].offsetLeft - 6 + 'px';
                }
                if (Math.min(ev.clientX - Ftext[0].offsetLeft) >= 722) {
                    pp.style.width = 722 - disX + Ftext[0].offsetLeft + 'px';
                }
                if (ev.clientY - Ftext[0].offsetTop <= 64) {
                    pp.style.top = 65 + 'px';
                    pp.style.height = disY - Ftext[0].offsetTop - 65 + 'px';
                }
                if (ev.clientY - Ftext[0].offsetTop >= 521) {
                    pp.style.height = 521 - Math.min(disY - Ftext[0].offsetTop) + 'px';
                }
                for (var i = 0; i < fileArr.length; i++) {
                    if (fileArr[i].pId != 0) {
                        sonArr.push(fileArr[i]);
                    }
                }
                touchTo(sonArr, pp);

            } else {
                //目标源为桌面
                pp.style.width = Math.abs(disX - ev.clientX) + 'px';
                pp.style.height = Math.abs(disY - ev.clientY) + 'px';
                pp.style.left = Math.min(ev.clientX, disX) + 'px';
                pp.style.top = Math.min(ev.clientY, disY) + 'px';
                for (var i = 0; i < fileArr.length; i++) {
                    if (fileArr[i].pId == 0) {
                        faArr.push(fileArr[i]);
                    }
                }
                touchTo(faArr, pp);
            }
            ev.preventDefault();
        }
    });
}


//移动文件夹
function moveFile(obj) {
    for (var i = 0; i < obj.length; i++) {
        if (obj[i].pId == 0) {
            obj[i].addEventListener('mousedown', function (ev) {
                var Thiss = this;
                var dissX = ev.clientX - this.offsetLeft;
                var dissY = ev.clientY - this.offsetTop;
                //div拖拽移动
                for (var i = 0; i < obj.length; i++) {
                    if (obj[i].className == 'kou') {
                        obj[i].className = 'kou';
                    } else {
                        obj[i].className = 'files';
                    }
                }
                if (this.className != 'kou') {
                    this.className = 'files active2';
                }
                ev.stopPropagation();
                document.addEventListener('mousemove', fMove);
                document.addEventListener('mouseup', function () {
                    document.removeEventListener('mousemove', fMove);
                });
                function fMove(ev) {
                    var l = ev.clientX - dissX;
                    var t = ev.clientY - dissY;
                    Thiss.style.left = l + 'px';
                    Thiss.style.top = t + 'px';
                    ev.preventDefault();
                    ev.stopPropagation();
                }
            });
        }
    }
}


//创建文件夹,DOM方法插入
function createFile(obj, xx) {
    //让mId自增保证唯一性
    fileNum++;
    //创建div
    var file = document.createElement('div');
    //初始opacity为0
    file.style.opacity = 0;
    //给该divclassName为files
    file.className = 'files';
    //如果添加该节点的父类className为con,pId为0代表是在桌面
    if (obj.className == 'con') {
        file.pId = 0;
    } else {
        //否则pId为1代表是在文件夹内
        file.pId = 1;
        //提高层级
        file.style.zIndex = 16;
    }
    //mId自增
    file.mId = fileNum;
    //创建input,读取data内属性渲染
    var fText = document.createElement('input');
    fText.className = 'F_text';
    fText.type = 'text';
    fText.value = data.aFile[xx].title;
    //遮罩input
    var fBox = document.createElement('div');
    fBox.className = 'F_box';
    if(file.pId == 1){
        fBox.style.color = '#000000';
        fBox.style.textShadow = '-1px 1px #FFFFFF';
    }
    //创建span，内容为input的value值
    var fSpan = document.createElement('span');
    fSpan.className = 'F_span';
    fSpan.innerHTML = fText.value;
    //创建图片区,从data中获取数据渲染
    var fImg = document.createElement('div');
    fImg.className = 'F_img ';
    fImg.style.background = 'url("' + data.aFile[xx].fImg + '")no-repeat 7px center'
    fImg.style.backgroundSize = '40px';
    fBox.appendChild(fText);
    fBox.appendChild(fSpan);
    file.appendChild(fImg);
    file.appendChild(fBox);
    obj.appendChild(file);
    if (obj.className == 'main clear') {
        file.style.left = disX + 'px';
        file.style.top = disY + 'px';
    }
    file.style.left = disX + file.offsetLeft + 'px';
    file.style.top = disY + file.offsetTop + 'px';
    fileArr.push(file);
    mTween(file, {opacity: 1}, 300, 'linear');

}


//清空lis的className
function clearLis() {
    for (var i = 0; i < menuLis.length; i++) {
        menuLis[i].className = '';
    }
}


//点击右键，在鼠标点击地点显示menu并阻止系统默认事件
function showMenu(ev) {
    menu.style.display = 'block';
    menu.style.left = ev.clientX + 'px';
    menu.style.top = ev.clientY + 'px';
    disX = ev.clientX;
    disY = ev.clientY;
}


//封装getBoundingClientRect
function getPos(obj) {
    return obj.getBoundingClientRect();
}


//封装碰撞检测
function touchTo(obj1, obj2) {
    for (var i = 0; i < obj1.length; i++) {
        if (getPos(obj2).right < getPos(obj1[i]).left || getPos(obj2).left > getPos(obj1[i]).right || getPos(obj2).bottom < getPos(obj1[i]).top || getPos(obj2).top > getPos(obj1[i]).bottom) {
            //没碰到
            obj1[i].className = 'files';
        } else {
            //碰到了
            obj1[i].className = 'files active2';
        }
    }
}


//鼠标移入移出ul
function getIn(parent) {
    var plis = parent.children;
    for (var i = 0; i < plis.length; i++) {
        //鼠标移入事件
        plis[i].onmouseover = function (ev) {
            //阻止事件冒泡，会冒到ul等身上
            ev.cancelBubble = true;
            //清空className
            for (var i = 0; i < plis.length; i++) {
                plis[i].className = '';
            }
            //清空子元素的className
            var childs = this.getElementsByTagName('li');
            for (var i = 0; i < childs.length; i++) {
                childs[i].className = '';
            }
            //让当前li的className为active
            this.className = 'active';
        };
        //鼠标移出事件
        plis[i].onmouseout = function () {
            if (!this.children[1]) {
                this.className = '';
            }
        };
        //如果存在子元素，调用递归
        if (plis[i].children[1]) {
            getIn(plis[i].children[1]);
        }
    }
}


//数组去重
function outSame(arr) {
    var json = {};
    var arr1 = [];
    for (var i = 0; i < arr.length; i++) {
        if (!json[typeof arr[i] + arr[i]]) {
            arr1.push(arr[i]);
            json[typeof arr[i] + arr[i]] = true;
        }
    }
    return json;
}


//解决getByclass兼容问题
function getByClass(parent, Sclass) {
    var parent = parent || document;
    var aEle = document.getElementsByTagName('*');
    var arr = [];
    if (parent.getElementsByClassName) {
        return parent.getElementsByClassName(Sclass);
    } else {
        var re = new RegExp('\\b' + Sclass + '\\b');
        for (var i = 0; i < aEle.length; i++) {
            if (re.test(aEle[i].className)) {
                arr.push(aEle[i]);
            }
        }
        return arr;
    }
}


//封装修改属性
function css() {
    if (arguments.length == 2) {
        if (arguments[0].currentStyle) {
            return arguments[0].currentStyle[arguments[1]];
        } else {
            return getComputedStyle(arguments[0])[arguments[1]];
        }
    } else {
        arguments[0].style[arguments[1]] = arguments[2]
    }
};

