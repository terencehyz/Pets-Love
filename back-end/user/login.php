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
	$arrary = $_POST;
	//$array = json_decode($json,true);
	$sql="select * from host where h_account='admin'";
	$user_arrary=mysql_query($sql);
	$judge=false;
	if($user_arrary['h_account']==$arrary['h_account']&&$user_arrary['h_password']==$arrary['h_password']){
		$judge=true;
		echo "<script>alert('登录成功');window.location.href='captcha.php';</script>"
		//header("127.0.0.1/Pets-Love/front-end") 跳转至初始界面
 	}
	else{
		echo "<script>alert('用户名或密码错误');window.location.href='login.php';</script>"
		//header("127.0.0.1/Pets-Love/back-end/user/login.php") 跳转至重新登陆页面
	}
$result=random(10);//生成10位随机数
//$result=random(10, '123456789abcdefghijklmnpqrstuvwxyzABCDEFGHIJKLMNPQRSTUVWXYZ');//生成10位字母数字混合字符串
echo "<input type='text' size='20' value='{$result}'>";
?>


