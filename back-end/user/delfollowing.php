<?php
	header( 'Access-Control-Allow-Origin:*' ); 
	include_once('../mysql/connect.php');
	$user_id=$_GET['h_id'];
	$following_id=$_GET['follow'];
	$sql="select * from follower where h_id='$user_id' and h_follower='$following_id'";
	if(!mysql_query($sql))
	{
		$json=json_encode(0);
		return ;
	}
	else
	{
		$del="delete from follower where h_id='$user_id' and h_follower='$following_id'";
		if(mysql_query($del))
		{
			$json=json_encode(1);
			return ;
		}
		else
		{
			$json=json_encode(0);
			return ;
		}
	}

?>