<?php
	require_once('../mysql/connect.php');
	require_once('../mysql/lib/mysql-fun.php');
	require_once('../lib/secret-key-fun.php');
	//$array前端传输来的数据，此处为测试数据
	//$array = json_decode($json,true);
	$array["h_account"]="yy";
	$array["h_password"]="123";
	$user_array=fetch_assoc("host","h_account","yy");
	$judge=false;
	if($user_array['h_account']==$array['h_account']&&$user_array['h_password']==$array['h_password']){
		$hash=random(10,'123456789abcdefghijklmnpqrstuvwxyzABCDEFGHIJKLMNPQRSTUVWXYZ');
		$hash=md5(md5($hash));
		if(update('host',"h_secret_key","$hash","h_account","yy")){//此处的yy为测试数据，后期需要修改
			echo "密钥更新成功！";
		}
		else{
			echo "密钥更新失败！";
		}
		$_POST='';
		$_POST['h_secret_key']=$hash;
		$_POST['judge']=1;
		$json= json_encode($_POST);
		print_r($_POST);
 	}
	else{
		$_POST['judge']=0;
		$json= json_encode($_POST);
	}
?>


