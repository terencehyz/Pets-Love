<?php
	
	require_once('../mysql/connect.php');
	require_once('../mysql/lib/mysql-fun.php');
	require_once('../lib/secret-key-fun.php');
	//$array前端传输来的数据，此处为测试数据
	$array["admin_account"]="admin";
	$array["admin_password"]="123";
	//$array = json_decode($json,true);
	// //$user_array数据库内查询到的数据
	$user_array=query('admin','admin_account','admin');
	$judge=false;
	if($user_array['admin_account']==$array['admin_account']&&$user_array['admin_password']==$array['admin_password']){
		$hash=random(10,'123456789abcdefghijklmnpqrstuvwxyzABCDEFGHIJKLMNPQRSTUVWXYZ');
		$hash=md5(md5($hash));
		update("admin","admin_secret_key","$hash","admin_account","admin");
		$j_array=array(
			"admin_secret_key"=>"$hash",
			"judge"=>"1"
			);
		$json= json_encode($j_array);
		//print_r($json);
 	}
	else{
		$_POST['judge']=0;
		$json= json_encode($_POST);
	}
?>
