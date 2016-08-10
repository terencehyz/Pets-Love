<?php
	//此文件用于修改用户密码。
	header( 'Access-Control-Allow-Origin:*' );
	require_once('../mysql/connect.php');
	$message_array['h_email']= $_GET['email'];
	$message_array['h_newpassword']= $_GET['h_newpassword'];
	$passage = $message_array['h_newpassword'];
	$email = $message_array['h_email'];
	$newp = md5($passage);
	$sql="update host set h_password='$newp'  where h_email='$email'";
	if(mysql_query($sql)){
		$json['judge'] =1;
		$json=json_encode($json);
		echo $json;
	}
	else{
		$json['judge  '] =0;
		$json=json_encode($json);
		echo $json;
	}
?>