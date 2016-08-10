<?php
	header( 'Access-Control-Allow-Origin:*' );
	include_once('../mysql/connect.php');
	include_once('../mysql/lib/mysql-fun.php');
	// include_once('sendmail.php');
	$message['h_email']=$_GET['h_email'];
	//如果用户存在
	if(query('host','h_email',$message['h_email'])){
		$json['judge_email']=1;
		$json=json_encode($json);
		echo $json;
	}
	else{
		$json['judge_email']=0;
		$json=json_encode($json);
		echo $json;
	}
?>