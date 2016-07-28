<?php
	//本文件用于修改用户个人信息，向前端返回1 或0
	require_once('../mysql/connect.php');
	require_once('../mysql/lib/mysql-fun.php');
	//$array_message 和h_secret_key为前端传来的数据 后期需要修改
	$h_secret_key='b51e1ab9a3b6a5b4198232d5f1169e20';
	$array_message=array(
		'h_name'=>'1',
		'h_sex'=>'1',
		'h_call'=>'1',
		'h_location'=>'1'
		);
	$sql="update host set h_name='$array_message[h_name]' , h_sex='$array_message[h_sex]' , h_call='$array_message[h_call]' , h_location='$array_message[h_location]' where h_secret_key='$h_secret_key'";
	echo $sql;
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