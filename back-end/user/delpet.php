<?php
	header( 'Access-Control-Allow-Origin:*' ); 
	//删除宠物，需要前端传来 宠物id 主人id
	include_once('../mysql/connect.php');
	$message=$_GET;
	$sql="select * from pet where id='$message[id]' and host_id='$message[h_id]'";
	if(mysql_query($sql))
	{
		$del="delete from pet where id='$message[id]' and host_id='$message[h_id]'";
		if(mysql_query($del))
		{
			$json['judge']=1;
			$return =json_encode($json);
			echo $return;
		}
		else
		{
			$json['judge']=0;
			$return =json_encode($json);
			echo $return ;
		}
	}
	else
	{
		$json['judge']=0;
		$return =json_encode($json);
			echo $return;
	}

?>