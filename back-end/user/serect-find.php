<?php
	require_once('../mysql/connect.php');
	function serect_to_id($s)
		$sql = mysql_query("select id from host where h_secret_key = '$s'");
		$hid = mysql_fetch_array($sql);
		return $hid['id'];

?>