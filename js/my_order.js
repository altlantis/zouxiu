$(function(){
	//收货人姓名的正则（不能包含特殊字符）姓名只可输入4－20个字符！(注：一个汉字两个字符)
	$(".input1").val("");
	$(".input1").blur(function(){
		if($(".input1").val() !== ""){
			var name = $(".input1").val();
			if(!(/^[\u4e00-\u9fa5\da-zA-Z\-\_]+$/.test(name))){ 
				$(".input1_span1").show();
			}else if(!(/^[\u4E00-\u9FA5A-Za-z0-9]{4,20}$/gi.test(name) || 
				(name.replace(/[\u4E00-\u9FA5]/gi,'aa').length<=20&&name.replace(/[\u4E00-\u9FA5]/gi,'aa').length>=4))){
				$(".input1_span3").show();
			}
			else{
				$(".input1_span1").hide();
				$(".input1_span3").hide();
				$(".rs2 td").eq(1).html($(".input1").val());//把信息写到最后提交后的信息框中
			}
		}else{
			$(".input1_span1").hide();
			$(".input1_span3").hide();
		}	
	})

	//收货地址选择框
	
			// 初始化省份信息
			function initProvince() {
				$.getJSON(
					"http://api.2011522.com/apidiqu2/api.asp?format=json&callback=?",
					function(data){
						// 保存了所有省份信息的对象
						var list = data.list;
						// 遍历对象的所有属性，省份名字在对象的属性值中
						for (var attr in list) {
							var obj = list[attr]; // 属性值，该属性值又是一个对象，省份名称在该对象的 diming 属性中， 代码在该对象的 daima 属性中
							var diming = obj.diming,
								daima = obj.daima;
							// 构建 option 标签的字符串，将其追加到 #province 的下拉列表中
							$("<option value='"+daima+"'>"+diming+"</option>").appendTo('#province');
						}

						// 加载完省份后，继续加载城市信息
						//initCity();
					}
				);
			}

			// 初始化城市
			function initCity() {
				// 获取省份的代码
				var provinceId = $("#province").val();
				// 加载城市数据
				$.getJSON(
					"http://api.2011522.com/apidiqu2/api.asp?format=json&callback=?&id=" + provinceId,
					function(data){
						var list = data.list;
						var html = "<option>请选择</option>";
						for (var attr in list) {
							html += "<option value='"+ list[attr].daima +"'>"+ list[attr].diming +"</option>"
						}
						//$(html).appendTo('#city');
						$("#city").empty().append(html);
						// 加载完城市后，继续加载区信息
						//initDistrict();
					}
				);
			}
			initProvince();
			// 省份选择改变后，重新加载城市信息
			$("#province").on("change", initCity);

			//加载区的信息
			function initDistrict(){
				var cityId = $("#city").val();
				$.getJSON(
					"http://api.2011522.com/apidiqu2/api.asp?format=json&callback=?&id=" + cityId,
					function(data){
						var html = "<option>请选择</option>";
						var list = data.list;
						for(var attr in list){
							html += "<option value=" + list[attr].daima + ">" + list[attr].diming + "</option>"
						}
						$("#district").empty().append(html);
					}
				)
			}
			// 城市选择改变后，重新加载区信息
			$("#city").on("change", initDistrict);








	//详细地址的正则（不能包含特殊字符）
	$(".input2").val("");
	$(".input2").blur(function(){
		if($(".input2").val() !== ""){
			var adress = $(".input2").val();
			if(!(/^[\u4e00-\u9fa5\da-zA-Z\-\_]+$/.test(adress))){ 
				$(".input2_span2").show();
				$(".input2_span1").hide();
			}else{
				$(".input2_span1").show();
				$(".input2_span2").hide();
			}
			$(".rs2 td").eq(2).html($("#province").find(":selected").html()+$("#city").find(":selected").html()+$("#district").find(":selected").html()+$(".input2").val());//把信息写到最后提交后的信息框中
		}
	})

	//详细地址的正则（不能超过35位）
	$(".input2").keyup(function(){
		var len = $(this).val().length;
		if(len > -1 && len < 36){
			$(".input2_span1").css({"color":"#5b5b5b"}).show();
		}else{
			$(".input2_span1").css({"color":"red"}).show();
		}
		if(len > 35){
			var str = $(this).val().substr(0,35);
			$(this).val(str);
		}
	});

	//邮政编码的正则（共6位数字）
	$(".input3").val("");
	$(".input3").keyup(function(){
		var len = $(this).val().length;
		var you = $(this).val();
		if(isNaN(parseInt(you))){
			$(".input3").val("");

		}else if(len>6){
			var str = $(this).val().substr(0,6);
			$(this).val(str);
		}
		$(".rs2 td").eq(3).html($(".input3").val());//把信息写到最后提交后的信息框中
	});
	$(".input3").blur(function(){
		var ma =  $(this).val();
		if(!(/^[1-9]\d{5}$/.test(ma))){
			$(".input3_span2").show();
		}else{
			$(".input3_span2").hide();
		}
	})

	//手机号码正则（共11位数字）
	$(".input4").val("");
	$(".input4").keyup(function(){
		var len = $(this).val().length;
		var phone = $(this).val();
		if(isNaN(parseInt(phone))){
			$(".input4").val("");

		}else if(len>=11){
			var str = $(this).val().substr(0,11);
			if(!(/^1[34578]\d{9}$/.test(str))){
				$(".input4").val(str);
				$(".input4_span1").show();
			}else{
				$(".input4").val(str);
				$(".input4_span1").hide();
			}
		}
		$(".rs2 td").eq(4).html($(".input4").val());//把信息写到最后提交后的信息框中
	});

	$(".input4").blur(function(){
		var len = $(this).val().length;
		if(len<11){
			$(".input4_span1").show();
		}else{
			$(".input4_span1").hide();
		}
	})




	//身份证号码正则
	$(".input5").val("");
	$(".input5").blur(function(){
		if($(".input5").val() !== ""){
			var ID = $(".input5").val();
			if(!(/^\d{17}(\d|X)$/i.test(ID))){ 
				$(".input5_span2").show();
				$(".input5").css({"border":"1px solid red"})
				$(".input5_span1").hide();
			}else{
				$(".input5_span1").show();
				$(".input5").css({"border":"1px solid #b3b3b3"})
				$(".input5_span2").hide();
			}
		}
	})

	//点击确认收货人信息后审查 未填写的内容
	$(".y_get_p").click(function(){
		if($(".input1").val() == ""){
			$(".input1").css({"border":"1px solid red"});
			$(".input1_span2").show();
		}else if($("#province").find(":selected").html() == "请选择"){
			$("#province").css({"border":"1px solid red"});
			$(".select1_span1").show();
		}else if($("#city").find(":selected").html() == "请选择"){
			$("#city").css({"border":"1px solid red"});
			$(".select2_span1").show();
		}else if($("#district").find(":selected").html() == "请选择"){
			$("#district").css({"border":"1px solid red"});
			$(".select3_span1").show();
		}else if($(".input2").val() == ""){
			$(".input2").css({"border":"1px solid red"});
			$(".input2_span3").show();
			$(".input2_span1").hide();
		}else if($(".input3").val() == ""){
			$(".input3").css({"border":"1px solid red"});
			$(".input3_span1").show();
		}else if($(".input4").val() == ""){
			$(".input4").css({"border":"1px solid red"});
			$(".input4_span2").show();
		}else{
			$(".receive_information").hide();
			$(".reset").show();
			$(".receive").append("<p><span>"+$(".input1").val()+"</span><span>"+$("#province").find(":selected").html()+$("#city").find(":selected").html()+"</span><span>"+$("#district").find(":selected").html()+"</span><span>"+$(".input2").val()+"</span><span>"+$(".input4").val()+"</span></p>")
			$(".receive").find("p").css({"font-size":"12px","padding-left":"10px","color":"#636363","padding-bottom":"15px","width":"883px","border-bottom":"1px dashed #7f7d7d"})
			$(".receive p").find("span").css({"padding-right":"10px"})

		}

	})

//点击修改 出现信息栏
	var res = true;
	$(".reset").click(function(){
		if(res){
			$(".reset").html("[返回]");
			$(".receive").find("p").hide();
			$(".receive_sure").show();
			res = false;
		}else{
			$(".reset").html("[修改]");
			$(".receive_sure").hide();
			$(".receive").find("p").show();
			res = true;
		}
		
	})

//确认配送信息
	$(".y_send").click(function(){
		$(".my_send").hide();
		$(".send").find("p").remove();
		$(".send").append("<p><span>"+$(".send_method li").eq(1).text()+"</span><span>"+$(".send_time").find(":checked").parent().text()+"</p>");
		$(".send").find("p").css({"font-size":"12px","padding-left":"10px","color":"#636363","padding-bottom":"15px","width":"883px","border-bottom":"1px dashed #7f7d7d"})
		$(".send").find("p").find("span").css({"padding-right":"20px"})
		$(".reset2").show();
		$(".reset2").html("[修改]");
		sed = true;
	})
//点击修改 出现信息栏
	var sed = true;
	$(".reset2").click(function(){
		if(sed){
			$(".reset2").html("[返回]");
			$(".send").find("p").hide();
			$(".my_send").show();
			sed = false;
		}else{
			$(".reset2").html("[修改]");
			$(".my_send").hide();
			$(".send").find("p").show();
			sed = true;
		}
		
	})
	//确认支付方式
	$(".sure").click(function(){
		$(".my_pay").hide();
		$(".pay_method").children("p").remove();
		$(".pay_method").append("<p><span>"+$(".my_pay").find(":checked").next().text()+"</span></p>");
		$(".pay_method").children("p").css({"font-size":"12px","padding-left":"10px","color":"#636363","padding-bottom":"15px","width":"883px","border-bottom":"1px dashed #7f7d7d"})
		$(".pay_method").find("p").find("span").css({"padding-right":"20px"})
		$(".reset3").show();
		$(".reset3").html("[修改]");
		sed = true;
	})
//点击修改 出现信息栏
	var pay = true;
	$(".reset3").click(function(){
		if(pay){
			$(".reset3").html("[返回]");
			$(".sure").children("p").hide();
			$(".pay_method").children("p").hide();
			$(".my_pay").show();
			sed = false;
		}else{
			$(".reset3").html("[修改]");
			$(".my_pay").hide();
			$(".sure").children("p").show();
			sed = true;
		}
		
	})

//点击银行汇款时 银行框出现
if($("#band_pay").is(":checked")){
	$(".band").show();
}
$("#band_pay").click(function(){
	$(".band").show();
}).parent().siblings("li").find("input").on("click",function(){
		$(".band").hide();
})
	






	//得焦后提示信息消失
	$(".input1").focus(function(){//姓名框得焦
		$(".input1").css({"border":"1px solid #b3b3b3"});
		$(".input1_span2").hide();
	})
	$("#province").focus(function(){//省份框得焦
		$("#province").css({"border":"1px solid #b3b3b3"});
		$(".select1_span1").hide();
	})
	$("#city").focus(function(){//城市框得焦
		$("#city").css({"border":"1px solid #b3b3b3"});
		$(".select2_span1").hide();
	})
	$("#district").focus(function(){//区框得焦
		$("#district").css({"border":"1px solid #b3b3b3"});
		$(".select3_span1").hide();
	})
	$(".input2").focus(function(){//详细地址框得焦
		$(".input2").css({"border":"1px solid #b3b3b3"});
		$(".input2_span3").hide();
		$(".input2_span1").show();
	})
	$(".input3").focus(function(){//详细地址框得焦
		$(".input3").css({"border":"1px solid #b3b3b3"});
		$(".input3_span1").hide();
	})
	$(".input4").focus(function(){//详细地址框得焦
		$(".input4").css({"border":"1px solid #b3b3b3"});
		$(".input4_span2").hide();
		$(".input4_span1").hide();
	})



	//点击优惠 留言 索取发票的展开 关闭效果
	var quan = false,
		leave = false,
		bill = false;
	$(".q1,.q2").click(function(){
		if(quan){
			$(".quans").hide();
			$(".q1").attr("src","../images/quan1.jpg");
			quan = false;
		}else{
			$(".quans").show();
			$(".q1").attr("src","../images/quan2.jpg");
			quan = true;
		}
		
	})
	$(".no").click(function(){
		$(".quans").hide();
		$(".q1").attr("src","../images/quan1.jpg");
		quan = false;
	})

	$(".leave").click(function(){
		if(leave){
			$(".leave_message").hide();
			$(".leav").attr("src","../images/f2.jpg");
			leave = false;
		}else{
			$(".leave_message").show();
			$(".leav").attr("src","../images/f1.jpg");
			leave = true;
		}
		
	})

	$(".bill").click(function(){
		if(bill){
			$(".bill_content").hide();
			$(".bil").attr("src","../images/f2.jpg");
			bill = false;
		}else{
			$(".bill_content").show();
			$(".bil").attr("src","../images/f1.jpg");
			bill = true;
		}
		
	});


	//点击提交效果
	$(".tj").click(function(){
		$("#headerBox").hide();
		$("#shop_listBox").hide();
		$("#my_informationBox").hide();
		$("#footerBox").hide();
		$("#success").show();
		var wh = $(window).height();
		$("#success").css({"height":wh-300});

		var back_time = 10;//设置返回首页时间
		var timer = setInterval(function(){
			back_time --;
			if(back_time<1){
				clearInterval(timer);
				window.location = "../index.html";
			}
			$(".wait_time").html(back_time + "秒");
		},1000)
	});
	//点击转到首页
	$(".back_index").click(function(){
		window.location = "../index.html";
	});

});