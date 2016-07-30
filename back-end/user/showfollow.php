<?php
	require_once('../mysql/connect.php');
	require_once('../mysql/lib/mysql-fun.php');
	require_once('../lib/json-fun.php');
	$userid = 23;
	$sql = mysql_query(" select h_follower from follower where h_id = '$userid'");
	while ($row = mysql_fetch_array($sql)) {
		# code...
		$sqll = mysql_query(" select h_account,h_location,h_photo from host where id = $row[h_follower]");
		while ($roww = mysql_fetch_array($sqll)) {
			$message[]=$roww;
		}
	
		echo  "<br/>";
	}
	$b = ch_json_encode($message);
	echo $b;
?>