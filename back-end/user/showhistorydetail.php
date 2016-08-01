<?php
	//当前这个宠物的EX_lover 及其主人的详细信息
	//主人：地理位置，账号
	//宠物：图片名字 性别 年龄 简介
	//前端应返回该EX_lover的id;
	include_once('../mysql/connect.php');
	include_once('../lib/json-fun.php');
	include_once('../mysql/lib/mysql-fun.php');
	//此处的$pet_id后期需要修改
	$pet_id="14";
	$pet_message=query('pet','id',$pet_id);
	$host_id=$pet_message['host_id'];
	$host_message=query('host','id',$host_id);
	$message['host']=$host_message;
	$message['pet']=$pet_message;
	$json=ch_json_encode($message);
	echo $json;
	mysql_close($con);
?>