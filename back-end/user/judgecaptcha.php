<?php
	include_once('../mysql/connect.php');
	include_once('../mysql/lib/mysql-fun.php');
	//$captcha 为前端传来进行校验的验证码
	$captcha=$_GET['captcha'];
	$email=$_GET['h_email'];
	$captcha=md5($captcha);
	$time=time();
	$captcha_message=query('captcha','contents',$captcha);
	if(!$captcha_message){
		//echo "数据库中无此验证码！";
		$json=json_encode(-1);
		echo $json;
	}
	else{
		$message=query('captcha','h_email',$email);
		if($message['h_email']==$email)
		{
			if($time=$captcha_message['expiration_time']){
				$sql="delete from captcha where contents='$captcha'";
				mysql_query($sql);
				$json=json_encode(1);
				echo $json;
			}
			else{
				$sql="delete from captcha where contents='$captcha'";
				mysql_query($sql);
				$json=json_encode(0);
				echo $json;
			}
		}
	}

?>