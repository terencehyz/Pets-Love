<?php
	require_once('../mysql/connect.php');
	require_once('../mysql/lib/mysql-fun.php');
	header( 'Access-Control-Allow-Origin:*' ); 
	//用户关注的人
	$userid = $_GET['h_id'];
	$sql = mysql_query(" select h_id from follower where h_follower = '$userid'");
	while ($row = mysql_fetch_assoc($sql)) {
		# code...
		$sqll = mysql_query(" select id,h_account,h_location,h_photo from host where id = $row[h_id]");
		while ($roww = mysql_fetch_assoc($sqll)) {
			$message['host'][]=$roww;
		}
	}
	if(!empty($message))
	{
		$message['judge']=1;
		$b = json_encode($message);
		echo ($b);
		return ;
	}
	$json['judge']=0;
	$return=json_encode($json);
	echo $return;
	mysql_close($con);
?>