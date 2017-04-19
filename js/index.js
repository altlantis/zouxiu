$(function(){

	//nav移入效果
	$("#nav ul").find("li").mouseover(function(){
		$(this).addClass("curr_li").siblings().removeClass("curr_li");
		$(this).find("a").addClass("curr").parents().siblings().find("a").removeClass("curr");
	}).mouseout(function(){
		$("#nav ul").find("li:first-child").addClass("curr_li").siblings().removeClass("curr_li");
		$("#nav ul").find("li:first-child").find("a").addClass("curr").parents().siblings().find("a").removeClass("curr");
	});
	
	//kinds的移动效果
	for(var i = 0;i<4;i++){//设置dl的left值
		var curleft = 310*i+70;
		$("#kinds").find("dl").eq(i).css({"left":curleft+"px"});
		$("#kinds").find("dl").eq(i).hover(function(){//设置位移效果
			$(this).animate({left:"-=20"},300);
		},function(){
			$(this).animate({left:"+=20"},300);
		});
	}

	//best的透明效果
	$("#best").find("a").hover(function(){
		$(this).css({opacity:"0.8"});
	},function(){
		$(this).css({opacity:"1"});
	});

	//hot 和 boutique 的背景图片放大效果
	$(".img").find("a").find("div").css({"background-size":"600px"});
	$(".img").find("a").hover(function(){
		$(this).find("div").animate({"background-size":"620px"},500);
	},function(){
		$(this).find("div").animate({"background-size":"600px"},500);
	});

	//good 鼠标移入时出现的 边框效果
	$("#good").find("a").hover(function(){
		$(this).find("div").find("img").css({border:"1px solid #ccc",padding:"0"});
	},function(){
		$(this).find("div").find("img").css({border:"0",padding:"1px"});
	})

	


	//滚动出现导航栏
	var headerHeight = $("#header").outerHeight(),
		navHeight =  $("#nav").outerHeight(),
		typesHeight =  $("#types").outerHeight(),
		bannerHeight =  $("#banner").outerHeight(),
		kindsHeight =  $("#kinds").outerHeight(),
		winHeight = $(window).height();
	$(window).on("scroll",function(){//绑定滚动事件
		//获取垂直方向上的滚动高度
		var scTop = $(this).scrollTop();
		//当滚动到显示楼层的一半的时候，将导航显示出来
		if(scTop>400){
			$("#guilder").stop(true).fadeIn(200);
		}else{
			$("#guilder").stop(true).fadeOut(200);
		}

		//当滚动到nav时，nav 和 types 置顶部
		if(scTop> headerHeight){
			$("#navBox").css({opacity:"0.9",position:"fixed",top:"0",left:"0","z-index":66});
			$("#typesBox").css({opacity:"0.9",position:"fixed",top:"46px",left:"0","z-index":66});
		}else{
			$("#navBox").css({opacity:"1",position:"static"});
			$("#typesBox").css({opacity:"1",position:"static"});
		}
	});
	//鼠标移入导航高亮效果
	$("#guilder").hover(function(){
		$(this).css({opacity:"1"});
	},function(){
		$(this).css({opacity:"0.8"});
	});
	//点击回到顶部实现效果
	$(".guilder_lastli").on("click",function(){
		$("html,body").stop(true).animate({"scrollTop":0},1000,function(){
			$("#guilder").hide();
		})
	})




});