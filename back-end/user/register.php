<?php
	//此文件向前端返回值为0 （注册失败）1（注册成功）-1（用户名重复，注册失败），注册成功要自动登录，前端登录文件请求
	include_once('../mysql/lib/mysql-fun.php');
	require_once('../mysql/connect.php');
	//require_once('login.php');
	//$json=file_get_contents('php://input',true);
	//$message_array=json_decode($json);
	//message_array为前端传来的数据，此处取值为测试数据
	// $message_array=array(
	// 	'h_name'=>'',
	// 	'h_sex'=>'',
	// 	'h_call'=>'',
	// 	'h_location'=>'',
	// 	'h_account'=>'saq',
	// 	'h_password'=>'123',
	// 	'h_email'=>'shianqi@imudges.com'
	// 	);
	$message_array['h_email']=$_POST['h_email'];
	$message_array['h_password']=$_POST['h_password'];
	$data=fetch_assoc('host','h_email',"$message_array[h_email]");
	if($data){
		$return=-1;
		$json=json_encode($return);
		print_r($json);
		// echo "此账号已存在，请重新输入！";
		//向前端返回0 用户输入账号重复
	}
	else{
		//前端传来的密码为一次md5加密后的密码，在服务器再进行md5加密，此处为未与前端传输的测试，两次md5加密
		$message_array['h_password']=md5(md5($message_array['h_password']));
		if(insert_register($message_array)){
			$return['judge']=1;
			$return['h_email']=$message_array['h_email'];
			$return['h_password']=$message_array['h_password'];
			$json=json_encode($return);
			echo $json;
		 	//注册成功;
		 	//向前端返回true,需要前端判断judge的值再做是否进行登录的决定
		 	}
		else{ 
			$return['judge']=0;
			$json=json_encode($return);
			echo $json;
			//向前端返回false 
			//由于未知错误，注册失败
		}
	}
	mysql_close($con);
?>