<?php
	require_once('../mysql/connect.php');
	require_once('../mysql/lib/mysql-fun.php');
	$phone = "1140";
	$account = 'yy';
	update('host','h_call',"$phone",'h_account',"$account");
	$name="新名字";
	update('host','h_name',"$name",'h_account',"$account");
	$location="新地点";
	update('host','h_location',"$location",'h_account',"$account");
	$email="新email";
	update('host','h_email',"$email",'h_account',"$account");
	$sex="新性别";
	update('host','h_sex',"$sex",'h_account',"$account");
?>