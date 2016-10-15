<?php
<<<<<<< HEAD
	header( 'Access-Control-Allow-Origin:*' ); 
	//删除宠物，需要前端传来 宠物id 主人id
	include_once('../mysql/connect.php');
	$message=$_GET;
=======
	//删除宠物，需要前端传来 宠物id 主人id
	include_once('../mysql/connect.php');
	$message['id']=8;
	$message['h_id']=23;//$_GET;
>>>>>>> origin/master
	$sql="select * from pet where id='$message[id]' and host_id='$message[h_id]'";
	if(mysql_query($sql))
	{
		$del="delete from pet where id='$message[id]' and host_id='$message[h_id]'";
		if(mysql_query($del))
		{
<<<<<<< HEAD
			$json['judge']=1;
			$return =json_encode($json);
			echo $return;
		}
		else
		{
			$json['judge']=0;
			$return =json_encode($json);
			echo $return ;
=======
			$json['judge']=json_encode(1);
			echo $json;
		}
		else
		{
			$json['judge']=json_encode(0);
			echo $json;	
>>>>>>> origin/master
		}
	}
	else
	{
<<<<<<< HEAD
		$json['judge']=0;
		$return =json_encode($json);
			echo $return;
=======
		echo "您没有此宠物！";
>>>>>>> origin/master
	}

?>