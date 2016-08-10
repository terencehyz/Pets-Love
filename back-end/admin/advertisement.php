<?php
	include_once("../mysql/connect.php");
	include_once("../mysql/lib/mysql-fun.php");
	$sql="select * from advertise ";
	$all_message=mysql_query($sql);
	while($str=mysql_fetch_assoc($all_message))
	{	
		$message[]=$str;
	}
	$json=json_encode($message);
	echo $json;


?>