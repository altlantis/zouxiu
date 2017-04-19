$(function(){
	//nav移入效果
	$("#nav ul").find("li").mouseover(function(){
		$(this).addClass("curr_li").siblings().removeClass("curr_li");
		$(this).find("a").addClass("curr").parents().siblings().find("a").removeClass("curr");
	}).mouseout(function(){
		$("#nav ul").find("li:eq(7)").addClass("curr_li").siblings().removeClass("curr_li");
		$("#nav ul").find("li:eq(7)").find("a").addClass("curr").parents().siblings().find("a").removeClass("curr");
	});

	//给content添加图片
	function add_content(min_index,max_index,k){
		var html = "";
		for(var i = min_index;i <= max_index;i++){
			html += "<a href=''><div><span></span><img src='../images/"+ i + ".png' alt='' /></div></a>"; 
		}
		$("#content").append(html);
		$("#content a:gt(" + k + ")").each(function(i,element){
			$(this).find("div").css({
				width:"590px",
				height:"300px",
				"margin":"5px",
				"background":"url(../images/" + (i+min_index) +".jpg) no-repeat center center",
				"background-size": "590px 300px",
				"float":"left"
			});
		});
	}
	//初始情况
	add_content(62,85,0);
	//点击 more 加载图片
	var more_k = 24;
	$("#more").bind("click",function(){
		add_content(33,60,more_k);
		more_k +=24;
	});


	//content的背景图片放大效果(智能用事件委派的方式去做)
	$("#content").on("mouseenter", "a", function(){
		$(this).find("div").animate({"background-size":"610px"},500);
	}).on("mouseleave", "a", function(){
		$(this).find("div").animate({"background-size":"590px"},500);
	});
	/*$("#content").find("a").hover(function(){
		$(this).find("div").animate({"background-size":"610px"},500);
	},function(){
		$(this).find("div").animate({"background-size":"590px"},500);
	});*/
});