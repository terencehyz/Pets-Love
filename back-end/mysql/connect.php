<?php
	require_once('config.php');
	//连库
	if(!($con = mysql_connect(HOST, USERNAME, PASSWORD))){
		$error=mysql_error();
		file_put_contents('mysql_error.txt', "$error\r\n",FILE_APPEND) ;
	}
	//选库
	if(!mysql_select_db('test')){
		$error=mysql_error();
		file_put_contents('mysql_error.txt', "$error\r\n",FILE_APPEND) ;
	}
	//设置字符集
	if(!mysql_query('set names utf8')){
		$error=mysql_error();
		file_put_contents('mysql_error.txt', "$error\r\n",FILE_APPEND) ;
	}
?>