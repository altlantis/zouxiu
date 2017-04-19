$(function(){
	$(".s3").hover(function(){
		var src =$(this).find("img").attr("src");
		$(".s3 img").attr("src",src.replace("3","4"))
		$(".cuxiao").show();
	},function(){
		var src = $(this).find("img").attr("src");
		$(".s3 img").attr("src",src.replace("4","3"))
		$(".cuxiao").hide();
	});

	$(".pay_money").click(function(){
		window.location = "my_order.html";
	})
});