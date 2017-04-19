$(function(){
	//判断购物车是否有物品
	//把信息存到cookie 中

		// 添加到购物车的点击事件
			$(".choose_put").click(function() {
				// 从 cookie 中读取存放所有商品的数组
				var products = $.cookie("products");
				if (products)
					products = JSON.parse(products);
				else
					products = [];
				// 保存当前选购商品
				var product = null;
				//获取商品品牌
				var _brand = $(".dn_a").text();
				// 获取商品名称
				var _name = $(".dn1_span2").text();
				//获取商品图片
				var _pic = $(".dt_pic").attr("src");
				// 获取商品颜色
				var _color = $(".cp1").find("span").text();
				// 获取商品尺码
				var _size = $(".cp2").find("span").text();
				// 判断是否已选购当前商品
				for (var i = 0, len = products.length; i < len; i++) {
					if (products[i].name === _name) {
						product = products[i];
						break;
					}
				}
				if (product) { // 已选购商品，则只修改数量
					product.amount += parseInt($(".choose_num").val());
				} else { // 未选购商品，则创建对象保存到数组中
					// 获取商品价格
					var _price = $(".pp1").find("span").text();
					// 获取商品数量
					var _amount = parseInt($(".choose_num").val());
					// 创建商品对象
					product = {
						"name" : _name,
						"pic":_pic,
						"brand":_brand,
						"color":_color,
						"size":_size,
						"price" : _price,
						"amount" : _amount
					};
					// 将当前创建的商品对象添加到数组中保存
					products.push(product);
				}
				// 将数组中所有对象再保存回 cookie 中
				$.cookie("products", JSON.stringify(products), {"expires" : 7,"path":"/"});
				//购物袋数量变化
				bagnum();
			});
			//加载我的购物袋数量
	function bagnum(){
		var products = $.cookie("products");
		if(products){
			products = JSON.parse(products);
			var count_num = 0;
			//遍历数组
			$.each(products,function(i,prod){
				count_num += prod.amount;
			});
			
			$(".r_num").text(count_num);
		}else{
			$(".r_num").text("0");
		}
		
	}
	bagnum();
});

$(function(){


// 从 cookie 中读取所有商品的信息
  
		var products = $.cookie("products");
			if (!products){
				$("#no_productBox").show();
				$("#product_listBox").hide();
				$("#resultBox").hide();
				$("#maybe_interestBox").hide();
			} else {
				$("#no_productBox").hide();
				$("#product_listBox").show();
				$("#resultBox").show();
				$("#maybe_interestBox").show();
				// 将字符串解析为数组
				products = JSON.parse(products);
				// 遍历数组
				$.each(products, function(i, product){
					$(".products:last").clone(true) // 克隆商品信息的模板
								 .appendTo(".container") // 添加到容器中显示
								 .find(".name1").text(product.name).end() // 商品名称
								 .find(".dt_pic").attr("src",product.pic).end()//图片
								 .find(".brand_a").text(product.brand).end()//品牌
								 .find(".color1").text(product.color).end()//颜色
								 .find(".size1").text(product.size).end()//尺码
								 .find(".s2").text(product.price).end() // 单价
								 .find(".amount1").val(product.amount).end() // 数量
								 .find(".product_all1").text(product.amount * product.price.substr(1)).end()
								 .show() // 显示
								 .data("product", product); // 将当前商品对象保存到元素上
				});
			}

			
    
			// 全选功能
			$(".check_all").click(function() {
				// 获取选中状态
				var state = $(this).prop("checked");
				// 设置其它所有复选框选中状态
				$(".checks:visible").prop("checked", state);
				$(".check_all").prop("checked", state);
			});

			// 加数量
			$(".adds").click(function() {
				// 原有数量
				var amount = parseInt($(this).prev(".amount1").val());
				// 加数量
				amount += 1;
				// 保存回 cookie
				$(this).parents(".products").data("product").amount = amount;
				$.cookie("products", JSON.stringify(products), {"expires" : 7,"path":"/"});
				// 设置加之后的数量
				$(this).prev(".amount1").val(amount);
				// 更新小计
				var sub = parseInt($(this).parents(".products").find('.s2').text().substr(1)) * amount;
	
				$(".product_all1").text(sub);

				// 合计
				calcTotal();
			});

			// 减数量
			$(".del1").click(function() {
				// 原有数量
				var amount = parseInt($(this).next(".amount1").val());
				if (amount <= 1)
					return;
				// 减数量
				amount -= 1;
				// 保存回 cookie
				$(this).parents(".products").data("product").amount = amount;
				$.cookie("products", JSON.stringify(products), {"expires" : 7,"path":"/"});
				// 设置减之后的数量
				$(this).next(".amount1").val(amount);
				// 更新小计
				var sub = parseInt($(this).parents(".products").find('.s2').text().substr(1)) * amount;
				$(".product_all1").text(sub);
				// 合计
				calcTotal();
			});

			// 删除单行
			$(".clea").click(function(){
				// 当前行商品对象
				var product = $(this).parents(".products").data("product");
				// 在数组中索引
				var index = $.inArray(product, products);
				// 从数组中删除
				products.splice(index, 1);
				// 放回 cookie 保存
				$.cookie("products", JSON.stringify(products), {"expires" : 7,"path":"/"});

				//判断是否还有商品
				if (products.length === 0){
					$.cookie("products",0,{"expires":-1})
					$("#no_productBox").show();
					$("#product_listBox").hide();
					$("#resultBox").hide();
					$("#maybe_interestBox").hide();
				} 
				// 从页面删除
				$(this).parents(".products").remove();
				// 合计
				calcTotal();
				
			});

			// 计算选中的商品合计
			function calcTotal() {	
				var sum = 0;
				// 获取所有小计，显示迭代
				$(".checks:checked").parents(".products").find(".product_all1").each(function(){
					sum += parseInt($(this).text());
				});
				// 显示合计
				$(".price_all1").text(sum);
			}

			// 删除选中行
			$(".del_select_row").click(function() {
				// 找出选中的复选框
				var $ckbox = $(".checks:checked");
				// 删除
				$ckbox.parents(".products").remove();

				/*$(".ck_product:not(:last)").each(function(){
					// 判断当前复选框是否选中
					// this.checked;
					// $(this).prop("checked");
					if ($(this).is(":checked")) {
						// 删除节点
						$(this).parents(".product").remove();
					}
				});*/
			});

			// 清空购物车
			$("#clear_cart").click(function() {
				$.removeCookie("products");
				window.location = "商品页.html";
			});

			// 有选中商品，才累加合计
			$(".checks:visible,.check_all").click(function() {
				$(".choosed_num").text($(".checks:checked").length);
				calcTotal();
				bgColor();
			});
		//结算按钮变色	
		function bgColor(){
			if($(".checks:visible").is(":checked")){
				$("#result button").css({"background":"#eb7416"});
			}else{
				$("#result button").css({"background":"gray"});
			}
		}
		bgColor();
			

//更新已选商品数量
	// $(":checked").click(function(){
		
	// })
	

























})