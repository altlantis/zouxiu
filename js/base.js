$(function(){
	//购物袋移入出现效果
	$(".shopping_bag").hover(function(){
		$(this).css({"background":"white"});
		$(this).find(".my_bg").css({"color":"red"});
		$("#bag").show();
	},function(){
		$(this).css({"background":"#333"});
		$(this).find("a").css({"color":"#b7b7b7"});
		$("#bag").hide();
	});

	//我的走秀移入出现效果
	$(".myshow").hover(function(){
		var src = $(this).find("a").eq(0).find("img").attr("src");
		$(this).css({"background":"white"});
		$(this).find("a").eq(0).css({"color":"red"});
		$(this).find("a").eq(0).find("img").attr("src",src.replace("1","2"));
		$(this).find("#show_list").css({"border-top":0});
		$("#show_list").show();
		
	},function(){
		var src = $(this).find("a").eq(0).find("img").attr("src");
		$(this).css({"background":"#333"});
		$(this).find("a").eq(0).css({"color":"#b7b7b7"});
		$(this).find("a").eq(0).find("img").attr("src",src.replace("2","1"));
		$("#show_list").hide();
	});

	$("#show_list ul").find("li").hover(function(){
		$(this).find("a").css({"color":"red"});
	},function(){
		$(this).find("a").css({"color":"black"});
	});

	//搜索框得焦效果
	$("#header form").find("input").focus(function(){
		$(this).attr("placeholder"," ");
	}).blur(function(){
		$(this).attr("placeholder","请搜索Stella McCartney试试");
	})

	

	//鼠标移入types 出现二级菜单
	function types_hover(index){
		$("#types_kind li:nth-of-type(" + index +"),#manus" + index +"").hover(function(){
		$("#manus" + index + "").show();
		$("#types_kind li:nth-of-type(" + index +")").css({
			"padding" : 0,
			"border-right":"1px solid #d7d7d7",
			"border-left":"1px solid #d7d7d7",
			"border-bottom":"1px solid white",
			"border-top":"1px solid #f7f7f7",
			"background":"white",
			"z-index":"10"
		});
		},function(){
			$("#manus" + index +"").hide();
			$("#types_kind li:nth-of-type(" + index +")").css({"border":"0","padding":"1px","background":"none","z-index":"1"});
		});
	}

	for(var i = 1;i<10;i++){
		types_hover(i);
	}	




	//footer 的品牌专题li移入出现选项
	$(".footer_ul li:eq(9),#brand").hover(function(){
		$("#brand").show();
	},function(){
		$("#brand").hide();
	});


	var products = $.cookie("products");

	//我的购物袋的数量显示
	// 从 cookie 中读取所有商品的信息
  function readCookie(){
  	
	products = $.cookie("products");
	// 将字符串解析为数组
		
	if(!products){
		
		$(".bag_num").html("0");
		$(".shopping_bag").hover(function(){
			$(this).css({"background":"white"});
			$(this).find(".my_bg").css({"color":"red"});
			$("#bag").show();
		},function(){
			$(this).css({"background":"#333"});
			$(this).find("a").css({"color":"#b7b7b7"});
			$("#bag").hide();
		})	
	}else{
		var amot = 0;
		var money = 0;
		// 将字符串解析为数组
		products = JSON.parse(products);
		//遍历数组
		$.each(products,function(i,prod){
			$("#bag2 dl:last").clone(true)//克隆商品信息的模板
							  .prependTo("#bag2").end()//添加到购物车列表
							  .find("img").attr("src",prod.img).end()//商品名称
							  .find(".brand_mini").text(prod.brand).end()//商品品牌
							  .find(".name_mini").text(prod.name).end() // 商品名称
							  .find(".color_mini").html("&nbsp;&nbsp;颜色：" + prod.color).end()//颜色
							  .find(".prize_mini").text(prod.price).end() // 单价
							  .find(".amount_mini").text(prod.amount).end() // 数量
							  .show() // 显示
						   	  .data("product", prod); // 将当前商品对象保存到元素上
			amot += prod.amount;
			money += prod.amount*prod.price.substr(1);
			
		});
			
		$(".pro_num").html(amot);
		$(".pro_price").html("￥" + money);
		$(".bag_num").html(amot);
		$(".shopping_bag").hover(function(){
			$(this).css({"background":"white"});
			$(this).find(".my_bg").css({"color":"red"});
			$("#bag2").show();
		},function(){
			$(this).css({"background":"#333"});
			$(this).find("a").css({"color":"#b7b7b7"});
			$("#bag2").hide();
		})	
	}
  }
	readCookie();

	// 删除
		$(".mini_del").click(function(){
			// 当前行商品对象
			var prod = $(this).parents(".prod").data("prod");
			// 在数组中索引
			var index = $.inArray(prod, products);
			// 从数组中删除
			products.splice(index, 1);
			// 放回 cookie 保存
			$.cookie("products", JSON.stringify(products), {"expires" : 7, "path": "/"});
			//判断删除后当前购物车是否为空
			if(products.length === 0){
				$.cookie("products",0,{"expires":-1,"path":"/"});
				$(".bag_num").html("0");
				readCookie();
				$(".shopping_bag").hover(function(){
					$(this).css({"background":"white"});
					$(this).find(".my_bg").css({"color":"red"});
					$("#bag").show();
					$("#bag2").hide();
				},function(){
					$(this).css({"background":"#333"});
					$(this).find("a").css({"color":"#b7b7b7"});
					$("#bag").hide();
					$("#bag2").hide();
				})	
			}
			// 从页面删除
			$(this).parents(".prod").remove();
			// 合计
			
		});

	//点击查看购物袋跳转
	$(".mini_right").click(function(){
		window.location = "html/my_bag.html";
	})


	//需要添加的“退出”标签
	var _a = "&nbsp;&nbsp;<a class='exit' href='javascript:;'>[退出]</a>"
	function exitCookie(){
		$.cookie("user", 0, {"expires": -1, "path":"/"});
		$(".login_regist").show();
		$(".username").hide();
	}

	//判断用户是否已登录
	var user2 = $.cookie("user");
	if(user2){
		var	user =JSON.parse(user2);
		$(".login_regist").hide();
		$(".username").show().html(user.username + _a);
		
	}else{
		$(".login_regist").show();
		$(".username").hide();
	}
	$(".exit").on("click", function(){
		exitCookie();
	});
	


});