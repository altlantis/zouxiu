
$(function(){

	window.log = window.console.log;
	//登录框的得失焦效果
	function fo(element1,element2){
		$(element1).focus(function(){
			$(element2).css({top:"-8px"});
			$(element1).css({border:"1px solid #7fbfe7"})
		});
	}
	fo("#phone_num",".phone_num1");
	fo("#message_num",".message_num1");
	fo("#cout_num",".yan_num1");
	fo("#user_id",".login_pass11");
	fo("#user_password",".login_pass21");

	function bl(element1,element2){
		$(element1).blur(function(){
			if($(element1).val()==""){
				$(element2).css({top:"10px"});
				$(element1).css({border:"1px solid #d8d8d8"})
			}else{
				$(element1).css({border:"1px solid #d8d8d8"})
			}						
		});
	}
	
	bl("#phone_num",".phone_num1");
	bl("#message_num",".message_num1");
	bl("#user_id",".login_pass11");
	bl("#user_password",".login_pass21");

	//验证码框得焦事件
	$("#cout_num").val("");
	$("#cout_num").focus(function(){
		$(".warn2").show();
	})

	//点击切换验证码图片
	$(".register span").click(function(){
		var yantu = parseInt(Math.random()*3+1);
		var src = $(".register img").attr("src");
		$(".register img").attr("src","../images/yan" + yantu +".jpg")
	});

	//点击获取验证码倒计时
	$(".get_num").click(function(){
		var t = 30;
		var timer = setInterval(function(){
			t--;
			$(".get_num").html( t + "s");
			if(t<1){
				$(".get_num").html("重新获取验证码")
				clearInterval(timer);
			}
		},1000)
	});





	//验证码框失焦事件//正则验证码框
	$("#cout_num").blur(function(){
		$("#cout_num").css({border:"1px solid #d8d8d8"});
		if($(".register img").attr("src")==="../images/yan1.jpg"){
			if(parseInt($("#cout_num").val()) !== 15){
				$("#cout_num").css({"background":"url(../images/yan_n.jpg) no-repeat 104px center"});
				
			}else{
				$("#cout_num").css({"background":"url(../images/yan_y.jpg) no-repeat 104px center"});
			}
		}
		else if($(".register img").attr("src")==="../images/yan2.jpg"){
				if(parseInt($("#cout_num").val()) !== 4){
					$("#cout_num").css({"background":"url(../images/yan_n.jpg) no-repeat 104px center"});
					$("#cout_num").val("");
				}else{
					$("#cout_num").css({"background":"url(../images/yan_y.jpg) no-repeat 104px center"});
			}
		}
		else if($(".register img").attr("src")==="../images/yan3.jpg"){
				if(parseInt($("#cout_num").val()) !== 9){
					$("#cout_num").css({"background":"url(../images/yan_n.jpg) no-repeat 104px center"});
					$("#cout_num").val("");
				}else{
					$("#cout_num").css({"background":"url(../images/yan_y.jpg) no-repeat 104px center"});
			}
		}
	})

	
	

	//正则手机号
	$("#phone_num").val("");
	$("#phone_num").blur(function(){
		if($("#phone_num").val() !== ""){
			var phone = $("#phone_num").val();
			if(!(/^1[3|4|5|7|8]\d{9}$/.test(phone))){ 
				$(".warn1").show();
				
				$(".phone_num1").css({top:"-8px"});
			} else{
				$(".warn1").hide();
				$(".phone_num1").css({top:"-8px"});
				
			}
		}
		
	})

	//正则短信验证码
	$("#message_num").val("");
	$("#message_num").blur(function(){
		if($("#message_num").val() !== ""){
			var message = $("#message_num").val();
			if(!(/^\d{4}$/.test(message))){
				$(".warn2").show();
				$(".message_num1").css({top:"-8px"});
			}else{
				$(".warn2").hide();
				$(".message_num1").css({top:"-8px"});
			}
		}
		
	});

	//自动登录框图片的切换
	var ck = true; 
	$(".hold").click(function(){
		if(ck){
			$(".hold").css({"background":"url(../images/checkbox1.jpg) no-repeat 0 center"});
			ck = false;
		}else{
			$(".hold").css({"background":"url(../images/checkbox2.jpg) no-repeat 0 center"})
			ck = true;
		}
		
	});

	//点击密码登录框
	$(".login_password").click(function(){
		$(this).addClass("login_curr").siblings().removeClass("login_curr");
		$(".login_num1").hide();
		$(".login_num2").hide();
		$(".get_num").hide();
		$(".register").hide();
		$(".warn").hide();
		$(".login_pass1").show();
		$(".zhu").show();
		$(".zhao").hide();
	})

	//点击短信登录框//点击密码登录中的注册账号 跳转到短信登录框
	$(".login_message,.zczh").click(function(){
		$(this).addClass("login_curr").siblings().removeClass("login_curr");
		$(".login_num1").show();
		$(".login_num2").show();
		$(".get_num").show();
		$(".login_pass1").hide();
		$(".warn").hide();
	})

});


$(function(){
	
	
	
	//填写手机号码框失焦时，判断该手机号是否为新手机号,并且登录
	$("#phone_num").blur(function(){
		var ph = $("#phone_num").val();
		$.get(
			"user.json",
			function(data){
				var isexist = false;
				for(var attr in data){
					var user = data[attr];
					if(parseInt(ph) === parseInt(user.username)){						
						isexist = true;
						$(".register").hide();
						break;
					}	
				}
				if(!isexist){
					$(".register").show();
				}

				$(".login_on").click(function(){

						
					var user1 = {"username":ph};
					$.cookie("user",JSON.stringify(user1),{"expires": 14, "path":"/"});
					$(".exit").on("click", function(){
						exitCookie();
					});
					window.location = "../index.html";
					return;
				})
			}
		);
	});
	
	

});
