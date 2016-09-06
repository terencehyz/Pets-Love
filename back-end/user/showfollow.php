<?php
	require_once('../mysql/connect.php');
	require_once('../mysql/lib/mysql-fun.php');
	header( 'Access-Control-Allow-Origin:*' ); 
	//关注用户的人
	$userid = $_GET['h_id'];
	$sql = mysql_query(" select h_follower from follower where h_id = '$userid'");
	while ($row = mysql_fetch_assoc($sql)) {
		# code...
		$sqll = mysql_query(" select h_account,h_location,h_photo from host where id = $row[h_follower]");
		while ($roww = mysql_fetch_assoc($sqll)) {
			$message[]=$roww;
		}
	}
	$b = json_encode($message);
	echo $b;
	mysql_close($con);
?>