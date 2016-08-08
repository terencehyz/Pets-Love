<?php
	header( 'Access-Control-Allow-Origin:*' );
	require_once('../mysql/connect.php');
	require_once('../mysql/lib/mysql-fun.php');
	//$message由前端传来的搜索关键字
	$message='';//$_GET['message'];
	$sql="select * from pet where p_name like '%$message%' or p_type like '%$message%' or p_age like '%$message%' or p_about like '%$message%'";
	$query=mysql_query($sql);
	while($str=mysql_fetch_assoc($query)){
		$search_message[]=$str;
	}
	if(empty($search_message)){
		$json['judge']=json_encode(0);
		echo $json;
	}
	else{
		$search_message[]['judge']=1;
		$json=json_encode($search_message);
		echo $json;
	}
?>
<!-- hupeng zuishuai -->