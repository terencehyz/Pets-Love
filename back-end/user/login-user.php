<?php
	/**
	* 产生随机字符串
	*
	* @param    int        $length  输出长度
	* @param    string     $chars   可选的 ，默认为 0123456789
	* @return   string     字符串
	*/
	function random($length, $chars = '0123456789') {
	$hash = '';
	$max = strlen($chars) - 1;
	for($i = 0; $i < $length; $i++) {
		$hash .= $chars[mt_rand(0, $max)];
		}
	return $hash;
	}
	require_once('../mysql/connect.php');
	require_once('../mysql/lib/mysql-fun.php');
	//$array前端传输来的数据，此处为测试数据
	$array["h_account"]="yy";
	$array["h_password"]="123";
	//$array = json_decode($json,true);
	$sql="select * from host where h_account='yy'";
	$query=mysql_query($sql);
	$user_array=mysql_fetch_assoc($query);
	$judge=false;
	if($user_array['h_account']==$array['h_account']&&$user_array['h_password']==$array['h_password']){
		$hash=random(10,'123456789abcdefghijklmnpqrstuvwxyzABCDEFGHIJKLMNPQRSTUVWXYZ');
		$hash=md5(md5($hash));
		$sql="update host set h_secret_key='$hash' where h_name='admin'";
		mysql_query($sql);
		$_POST='';
		$_POST['h_secret_key']=$hash;
		$_POST['judge']=1;
		$json= json_encode($_POST);
		print_r($_POST);//需要注释掉
 	}
	else{
		$_POST['judge']=0;
		$json= json_encode($_POST);
	}
?>


