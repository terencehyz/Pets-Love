<?php
	//为当前用户添加 用户关注的对象 前段传来登录的用户的id 和他想要follow 的人
	header( 'Access-Control-Allow-Origin:*' ); 
	include_once('../mysql/connect.php');
	$user_id=$_GET['h_id']; 
	$h_follower=$_GET['follow'];
	//查重
	$check_sql="select * from follower where h_id='$user_id'";
	$query=mysql_query($check_sql);
	while($row=mysql_fetch_assoc($query))
	{
		$message[]=$row;
	}
	$length=count($message);
	for ($i=0; $i<$length ; $i++) { 
		if($message[$i]['h_follower']==$h_follower)
		{
			$json=json_encode(0);
			echo $json;
			return ;
		}
	}
	//插入
	$sql="insert into follower values ('','$user_id','$h_follower')";
	if(mysql_query($sql)==1)
	{
		$json=json_encode(1);
		echo $json;
	}
	else
	{
		$json=json_encode(0);
		echo $json;
	}
?>