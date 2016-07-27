<?php
	require_once('../mysql/connect.php');
	require_once('../mysql/lib/mysql-fun.php');
	$hid="2";
	$pname="宠物名";
	$ptype="宠物种类";
	$page="9";
	$pabout="描述";
	$psex="性别";
	mysql_query("INSERT INTO pet (p_name,p_sex,p_type,p_age,p_about,host_id) values('$pname','$psex','$ptype','$page','$pabout','$hid')");
?>