<?php
	header( 'Access-Control-Allow-Origin:*' ); 
	include_once('../mysql/connect.php');
	$user_id=$_GET['h_id'];
	$following_id=$_GET['follow'];
	$sql="select * from follower where h_id='$user_id' and h_follower='$following_id'";
	if(!mysql_query($sql))
	{
		$json['judge']=0;
		$return=json_encode($json);
		echo $return;
		return ;
	}
	else
	{
		$del="delete from follower where h_id='$following_id' and h_follower='$user_id'";
		if(mysql_query($del))
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
	}

?>