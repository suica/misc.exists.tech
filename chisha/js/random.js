$(function () {
    var run = 0,
        heading = $("h1"),
        timer;
    $("#what").html("吃啥?");
    $("#alterList").click(function(){
        $("#list").toggle();
        //alert("click!")
    });
    $("#list").blur(function(){
        var foodStr = $("#list").val();
        if(window.localStorage!==undefined){
            localStorage.foodStr = foodStr;
        }
    });

    var foodCandidates = "脆皮鸡 瓦罐鸡 沙县小吃 兰州拉面 馄饨 豚骨拉面 日料 热干面 饺子 咖喱饭 重庆小面 蛋包饭 米线 酸辣粉 土豆粉 麻辣烫 肉夹馍 火锅 淮南牛肉汤 汉堡王 肯德基 麦当劳 小杨生煎 牛肉面 羊肉汤 炒饭 盖浇饭 卤肉饭 蜜汁烤肉饭 黄焖鸡米饭 麻辣香锅 酸菜鱼 烤串 披萨 烤鸭 汉堡 炸鸡 寿司 银丝面馆 出去炒菜吃 牛排饭 咖喱鸡排饭 桥头排骨 哈根达斯 鸡蛋仔 冰淇淋 星爸爸";
    if( window !== undefined && window.localStorage !== undefined){
        if(localStorage.foodStr && localStorage.foodStr.length){
            foodCandidates = localStorage.foodStr;
        }
    }else{
        alert("大哥 换个现代浏览器吧!不支持localStorage啊!");
    }
    $("#list").val(foodCandidates);
    $("#start").click(function () {
        var list = $("#list").val().replace(/ +/g, " ").replace(/^ | $/g, "").split(" ");
        console.log(list);
        if(list.length === 0 || list[0] == ""){
            alert("啥吃的都没有输入呢!点一下'吃啥',输入用空格分隔的食物!")
            return;
        }
        if (!run) {
            heading.html(heading.html().replace("中午吃什么？ 晚上吃什么？", "让我想一想 吃什么 吃什么呢..."));
            $(this).val("停停停！");
            timer = setInterval(function () {
                var r = Math.ceil(Math.random() * list.length),
                    food = list[r - 1];
                $("#what").html(food);
                var rTop = Math.ceil(Math.random() * $(document).height()),
                    rLeft = Math.ceil(Math.random() * ($(document).width() - 50)),
                    rSize = Math.ceil(Math.random() * (37 - 14) + 14);
                $("<span class='temp'></span>").html(food).hide().css({
                    "top": rTop,
                    "left": rLeft,
                    "color": "rgba(0,0,0,." + Math.random() + ")",
                    "fontSize": rSize + "px"
                }).appendTo("body").fadeIn("slow", function () {
                    $(this).fadeOut("slow", function () {
                        $(this).remove();
                    });
                });
            }, 50);
            run = 1;
        } else {
            heading.html(heading.html().replace("让我想一想 吃什么 吃什么呢...", "今天就吃这个了！"));
            $(this).val("不行，不想吃这个！");
            clearInterval(timer);
            run = 0;
        };
    });

    document.onkeydown = function enter(e) {
        var e = e || event;
        if (e.keyCode == 13) $("#start").trigger("click");
    };
});
