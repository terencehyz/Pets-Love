<?php
	include_once('../mysql/connect.php');
	include_once('../mysql/lib/mysql-fun.php');
	
	$message['h_email']="yangyangds@imudges.com";//$_GET['h_email'];
	//如果用户存在
	if(query('host','h_email',$message['h_email'])){
	}
?>