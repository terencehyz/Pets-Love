<?php
	include_once('../mysql/connect.php');
	include_once('../mysql/lib/mysql-fun.php');
	//$captcha 为前端传来进行校验的验证码
	$captcha="095568";
	$captcha=md5($captcha);
	$time=time();
	$captcha_message=query('captcha','contents',$captcha);
	if(!$captcha_message){
		echo "数据库中无此验证码！";
		$json=json_encode(-1);
		echo $json;
	}
	else{
		if($time<=$captcha_message['expiration_time']){
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

?>