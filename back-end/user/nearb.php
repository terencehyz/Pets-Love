<?php
	error_reporting(0);
	header( 'Access-Control-Allow-Origin:*' );
	require_once('../mysql/connect.php');
	$hlongitude = '22.36';//$_GET['longitude'];
	$hlatitude = '111.11';//$_GET['latitude'];
	$h_secret_key = '9133417e627f15948f896f0ebf254458';//$_GET['h_secret_key'];
	$sqll = "update host set h_longitude = '$hlongitude', h_latitude = '$hlatitude' where h_secret_key = '$h_secret_key'";
	mysql_query($sqll);//此语句用于更新表中的用户经纬度
	$sql = "select id from host where h_secret_key = '$h_secret_key'";//找语句用于到当前发送请求的用户
	$res1 = mysql_query($sql);
	$row1 = mysql_fetch_assoc($res1);//row1['id']为当前用户的ID
	$sql2 = "select id,h_name,h_sex,h_call,h_location,h_account,h_email,h_photo,h_longitude,h_latitude from host where h_secret_key !='$h_secret_key'";//找到其他用户
	$res2 = mysql_query($sql2);
	$userlenth = 0;
	while($row2 = mysql_fetch_assoc($res2))
	{
		$distance = getDistanceBetweenPointsNew($hlatitude,$hlongitude,$row2['h_latitude'],$row2['h_longitude']);
		if($distance['kilometers']<=10)
		{
			$user['data']['host']['h_id'] = $row2['id'];
			$user['data']['host']['h_name'] = $row2['h_name'];
			$user['data']['host']['h_sex'] = $row2['h_sex'];
			$user['data']['host']['h_call'] = $row2['h_call'];
			$user['data']['host']['h_location'] = $row2['h_location'];
			$user['data']['host']['h_account'] = $row2['h_account'];
			$user['data']['host']['h_email'] = $row2['h_email'];
			$user['data']['host']['h_photo'] = $row2['h_photo'];
			$user['data']['host']['h_distance'] = round($distance['kilometers'],2);
			$userlenth++;
		}
	}
	if($userlenth == 0)
	{
		$judge['judge']=0;
		$json = json_encode($judge);
		echo $json;
		return ;
	}
	else
	{
		$user['judge'] = 1;
		$j=json_encode($judge);
		//echo $j;
	}
	for($i=0;$i<$userlenth;$i++)
	{
		$petnum = 0;
		$uid = $user['data']['host']['h_id'];
		$sql4 = "select id,p_name,p_sex,p_age,p_about,p_type,p_detail_type from pet where host_id = '$uid'";//根据主人id找宠物
		$res4 = mysql_query($sql4);
		while($row4 = mysql_fetch_assoc($res4))//每找到一条进入循环
		{
			$pid = $row4['id'];
			$sql5 = "select p_img from p_picture where pet_id ='$pid'";
			$res5 = mysql_query($sql5);
			$row5 = mysql_fetch_assoc($res5);
			$user['data']['pets'][$petnum]['p_id'] = $row4['id'];
			$user['data']['pets'][$petnum]['p_name'] = $row4['p_name'];
			$user['data']['pets'][$petnum]['p_sex'] = $row4['p_sex'];
			$user['data']['pets'][$petnum]['p_age'] = $row4['p_age'];
			$user['data']['pets'][$petnum]['p_about'] = $row4['p_about'];
			$user['data']['pets'][$petnum]['p_type'] = $row4['p_type'];
			$user['data']['pets'][$petnum]['p_detail_type'] = $row4['p_detail_type'];
			$user['data']['pets'][$petnum]['p_img'] = $row5['p_img'];
			$petnum++;

		}
	}
	$json = json_encode(arraySortByKey($user,"h_distance", $asc = true));
	echo $json;
	function arraySortByKey(array $array, $key, $asc = true) 
	{
	  $result = array();
	  // 整理出准备排序的数组
	  foreach ( $array as $k => &$v ) {
	    $values[$k] = isset($v[$key]) ? $v[$key] : '';
	  }
	  unset($v);
	  // 对需要排序键值进行排序
	  $asc ? asort($values) : arsort($values);
	  // 重新排列原有数组
	  foreach ( $values as $k => $v ) {
	    $result[$k] = $array[$k];
	  }
	  
	  return $result;
	}

	function getDistanceBetweenPointsNew($latitude1, $longitude1, $latitude2, $longitude2)
	{
		 $theta = $longitude1 - $longitude2;
		 $miles = (sin(deg2rad($latitude1)) * sin(deg2rad($latitude2))) + (cos(deg2rad($latitude1)) * cos(deg2rad($latitude2)) * cos(deg2rad($theta)));
		 $miles = acos($miles);
		 $miles = rad2deg($miles);
		 $miles = $miles * 60 * 1.1515;
		 $feet = $miles * 6378.137 ;
		 $yards = $feet / 3;
		 $kilometers = $miles * 1.609344;
		 $meters = $kilometers * 1000;
		 return compact('miles', 'feet', 'yards', 'kilometers', 'meters');
	}
?>