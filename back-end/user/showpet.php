<?php
	//本文件用于向用户展示个人宠物信息 前端将传来一个secret_key 通过secret_key辨识此人
	include_once('../mysql/connect.php');
	include_once('../mysql/lib/mysql-fun.php');
	$user_recognize=$_POST['h_secret_key'];
	$data=query('host','h_secret_key',$user_recognize);
	$h_id=$data['id'];
	$sql="select * from pet where host_id=$h_id";
	$query=mysql_query($sql);
	while ($str = mysql_fetch_assoc($query)) {
			$pets_message[]=$str;
		}
	$json=json_encode($pets_message);
	echo $json;
?>