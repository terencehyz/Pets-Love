<?php
	header( 'Access-Control-Allow-Origin:*' ); 
	require_once('../mysql/connect.php');
	$sql='select * from main_interface_picture';
	$query=mysql_query($sql);
	while($row=mysql_fetch_assoc($query))
	{
		$message[]=$row;
	}
	$json=json_encode($message);
	echo $json;
?>