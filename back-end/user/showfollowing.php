<?php
	require_once('../mysql/connect.php');
	require_once('../mysql/lib/mysql-fun.php');
	require_once('../lib/json-fun.php');
	$userid = 546;
	$sql = mysql_query(" select h_id from follower where h_follower = '$userid'");
	while ($row = mysql_fetch_array($sql)) {
		# code...
		$sqll = mysql_query(" select h_account,h_location,h_photo from host where id = $row[h_id]");
		while ($roww = mysql_fetch_array($sqll)) {
			$message[]=$row;
		}
	
		echo  "<br/>";
	}
	$b = ch_json_encode($message);
	echo ($b);
	mysql_close($con);
?>