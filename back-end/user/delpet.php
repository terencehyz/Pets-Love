<?php
	//删除宠物，需要前端传来 宠物id 主人id
	include_once('../mysql/connect.php');
	$message['id']=8;
	$message['h_id']=23;//$_GET;
	$sql="select * from pet where id='$message[id]' and host_id='$message[h_id]'";
	if(mysql_query($sql))
	{
		$del="delete from pet where id='$message[id]' and host_id='$message[h_id]'";
		if(mysql_query($del))
		{
			$json['judge']=json_encode(1);
			echo $json;
		}
		else
		{
			$json['judge']=json_encode(0);
			echo $json;	
		}
	}
	else
	{
		echo "您没有此宠物！";
	}

?>