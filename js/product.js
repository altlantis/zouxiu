$(function(){
	//设置放大镜效果
	var popWidth = $(".pop").outerWidth(),
		popHeight = $(".pop").outerHeight(),
		middleHeight = $(".middle").outerHeight(),
		middleWidth = $(".middle").outerWidth(),
		rateX = $(".big").outerWidth()/popWidth,
		rateY = $(".big").outerHeight()/popHeight;
	//设置大图大小
	$(".big img").css({
		width:middleWidth*rateX,
		height:middleHeight*rateY
	})
	//移入切换图片
	$(".small").hover(function(){

		var src = $(this).find("img").attr("src");
		//设置中土的图片路径
		$(".middle>img").attr("src",src.replace("66_88","402_536"));
		//设置大图的路径
		$(".big>img").attr("src",src.replace("66_88","900_1200"));
		$(this).addClass('curr').siblings().removeClass("curr");
	},function(){});
	//移入出现放大镜效果
	$(".middle").hover(function(){
		$(".pop").show();
		$(".big").show();
	},function(){
		$(".pop").hide();
		$(".big").hide();
	}).on("mousemove",function(event){
		//先根据光标在文档中的绝对位置设置 .pop 层在文档中的绝对定位
		$(".pop").offset({
			left:event.pageX - popWidth/2,
			top:event.pageY - popHeight/2
		});
		//获取.pop层相对父容器的相对定位位置
		var pos = $(".pop").position();
		var _top = pos.top,
			_left = pos.left;
		if(_top<0){
			_top = 0;
		}else if(_top>middleHeight - popHeight){
			_top =middleHeight - popHeight;
		}
		if(_left<0){
			_left = 0;
		}else if(_left> middleWidth - popWidth){
			_left = middleWidth - popWidth;
		}
		//重新设置 .pop相对父容器的定位
		$(".pop").css({
			left:_left,
			top:_top
		});
		//定位在.big盒子中的图片位置
		$(".big img").css({
			top:-_top*rateY,
			left:-_left*rateX
		});
	});
	


	//滚动式出现e_code二维码
	var headerHeight = $("#header").outerHeight(),
		navHeight =  $("#nav").outerHeight(),
		typesHeight =  $("#types").outerHeight(),
		bannerHeight =  $("#banner").outerHeight(),
		locationHeight =  $("#location").outerHeight(),
		detailsHeight =  $("#details").outerHeight(),
		winHeight = $(window).height();
	$(window).on("scroll",function(){//绑定滚动事件
		//获取垂直方向上的滚动高度
		var scTop = $(this).scrollTop();
		//当滚动到显示楼层的一半的时候，将导航显示出来
		if(scTop>1000){
			$("#e_code").stop(true).fadeIn(200);
		}else{
			$("#e_code").stop(true).fadeOut(200);
		}

		//当滚动到information_nav时，information_nav 置顶部
		if(scTop> 885){
			$(".information_nav").css({position:"fixed",top:"0",left:"0",right:"0","z-index":66,margin:"0 auto"});
		}else{
			$(".information_nav").css({position:"static"});
		}


		//鼠标移入出现物流信息
		$(".pp3 span a,.wuliu").hover(function(){
			$(".wuliu").show();
		},function(){
			$(".wuliu").hide();
		});
	});

	//点击加减数量
	$(".cut").click(function(){
		if($(".choose_num").val() <=1){return;}
		$(".choose_num").val(parseInt($(".choose_num").val()) -1) 
		
	})
	$(".add").click(function(){
		$(".choose_num").val(parseInt($(".choose_num").val()) + 1)

	})

	$(".choose_num").on("keyup",function(){
		if(isNaN(parseInt($(".choose_num").val()))){
			$(".choose_num").val("");

		}
	})

	//点击加入购物车 我的购物袋变化
	$(".choose_put").on("click",function(){
		
		//购物袋闪一下
		setTimeout(function(){
			$(".bg2").css({"left":"-68px"})
		},10)
		setTimeout(function(){
			$(".bg2").css({"left":"0"})
		},1500)
	});

	//移入购物袋时变色
	$(".choose_put").hover(function(){
		//购物袋闪一下	
		$(".bg2").css({"left":"-68px"})
	},function(){
		$(".bg2").css({"left":"0"})
	});

	

});