<?php
	require_once('../mysql/lib/mysql-fun.php');
	require_once('../mysql/connect.php');
	//message_array为前端传来的数据，此处取值为测试数据


	$message_array=array(
		'h_name'=>'hyz',
		'h_sex'=>'男',
		'h_call'=>'123456789',
		'h_location'=>'包头市',
		'h_account'=>'hyz',
		'h_password'=>'123',
		'h_email'=>'wohaishuai@hyz.com'
		);
	insert($message_array);

?>