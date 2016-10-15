<?php
	header( 'Access-Control-Allow-Origin:*' ); 
	require_once('../mysql/connect.php');
	$sql='select * from main_interface_picture';
	$query=mysql_query($sql);
	while($row=mysql_fetch_assoc($query))
	{
		$message[]=$row;
	}
	for($i = 0;$i<count($message);$i++)
	{
		$j=$i+1;
		$url="url".$j;
		$json["$url"]=$message[$i]['photoUrl'];
	}
	$json=json_encode($json);
	echo $json;
?>