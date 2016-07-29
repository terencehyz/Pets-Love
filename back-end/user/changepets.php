<?php
	include_once('../mysql/connect.php');
	include_once('../mysql/lib/mysql-fun.php');
	$pet_id=2;//$_POST['id'];
	$pet_name='1';//$_POST['p_name'];
	$pet_sex='1';//$_POST['p_sex'];
	$pet_type='1';//$_POST['p_type'];
	$pet_age='1';//$_POST['p_age'];
	$pet_about='1';//$_POST['p_about'];
	$sql="update pet set p_name='$pet_name' and p_sex='$pet_sex' and p_type='$pet_type' and p_age='$pet_age' and p_about='$pet_about' where id=$pet_id ";
	echo $sql;
?>