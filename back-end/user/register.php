<?php
	include_once('../mysql/lib/mysql-fun.php');
	require_once('../mysql/connect.php');
	//require_once('login.php');
	//message_array为前端传来的数据，此处取值为测试数据
	$message_array=array(
		'h_name'=>'张泰银',
		'h_sex'=>'男',
		'h_call'=>'123456789',
		'h_location'=>'呼和浩特市',
		'h_account'=>'zty',
		'h_password'=>'123',
		'h_email'=>'zhangtaiyin@imudges.com'
		);
	$data=fetch_assoc('host','h_account',"$message_array[h_account]");
	if($data){
		echo "此账号已存在，请重新输入！";
		//向前端返回false 用户重新输入
	}
	else{
		if(insert($message_array)){
		 	echo "注册成功";
		 	//向前端返回true,
		 	}
		else{
			echo "注册失败!";
			//向前端返回false
		}
	}
?>