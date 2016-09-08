<?php
	//为当前用户添加 用户关注的对象 前段传来登录的用户的id 和他想要follow 的人
	header( 'Access-Control-Allow-Origin:*' ); 
	include_once('../mysql/connect.php');
	$user_id=$_GET['h_id']; 
	$h_follower=$_GET['follow'];
	//查重
	$check_sql="select * from follower where h_follower='$user_id'";
	$query=mysql_query($check_sql);
	while($row=mysql_fetch_assoc($query))
	{
		$message[]=$row;
	}
	if(!empty($message))
	{
		$length=count($message);
		for ($i=0; $i<$length ; $i++) { 
			if($message[$i]['h_id']==$h_follower)
			{
				$json['judge']=0;
				$return=json_encode($json);
				echo $return;
				return ;
			}
		}
	}
	//插入
	$sql="insert into follower values ('','$h_follower','$user_id')";
	if(mysql_query($sql)==1)
	{
		$json['judge']=1;
		$return=json_encode($json);
		echo $return;
	}
	else
	{
		$json['judge']=0;
		$return=json_encode($json);
		echo $return;
	}
?>