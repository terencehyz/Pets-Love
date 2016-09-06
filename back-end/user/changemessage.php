<?php
	//本文件用于修改用户个人信息，向前端返回1 或0
	header( 'Access-Control-Allow-Origin:*' ); 
 	header( 'Access-Control-Allow-Origin:*' ); 
	require_once('../mysql/connect.php');
	require_once('../mysql/lib/mysql-fun.php');
	//$array_message 和h_secret_key为前端传来的数据 后期需要修改
	// $h_secret_key='a72e8a7df5bee53a92f07c58fc441760';
	$array_message=$_GET;
		// array(
		// 'h_sex'=>'男',
		// 'h_call'=>'15184779853',
		// 'h_account'=>'zy',
		// 'h_secret_key'=>'bff01736a369401db62244ccd5ded0c9'
		// );
	$sql="update host set h_sex='$array_message[h_sex]' , h_call='$array_message[h_call]' ,h_account='$array_message[h_account]' where h_secret_key='$array_message[h_secret_key]'";
	$query=mysql_query($sql);
	if($query){
		$return['judge'] =1;
		$json=json_encode($return);
		echo $json;
	}
	else{
		$return['judge'] =0;
		$json=json_encode($return);
		echo $json;
	}
?>