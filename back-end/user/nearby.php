	<?php 
		header( 'Access-Control-Allow-Origin:*' );
		require_once('../mysql/connect.php');
		$user_longtitude = $_GET['h_longtitude'];
		$user_latitude = $_GET['h_latitude'];
		$user_secret_key = $_GET['h_secret_key'];
		$sql = "update host set h_longtitude = '$user_longtitude', h_latitude = '$user_latitude' where h_secret_key = '$user_secret_key'";
		//更新用户坐标
		mysql_query($sql);
		$sql = "select  * from host where h_secret_key != '$user_secret_key'";
		$result = mysql_query($sql);
		while($res = mysql_fetch_assoc($result)){
			$user_message[]['host'] = $res;
		}
		$count = sizeof($user_message);
		for($i = 0; $i<$count ; $i++){
			$distance = getDistanceBetweenPointsNew($user_message[$i]['host']['h_latitude'],$user_message[$i]['host']['h_longtitude'],$user_latitude,$user_longtitude);
			$kilometers = sprintf("%.2f",$distance['kilometers']);
			$user_message[$i]['host']['distance']=$kilometers;
		}
		//排序
		$user_message = arraySortByKey($user_message,'distance',$asc = true);
		//加入宠物信息
		for($i = 0 ;$i<$count;$i++){
			$number = $user_message[$i]['host']['id'];
			$sql = "select * from pet where host_id = $number";
			$result = mysql_query($sql);
			if(mysql_fetch_assoc($result)){
				$Result = mysql_query($sql);
				while($row=mysql_fetch_assoc($Result)){
					$user_message[$i]['host']['pets'][]=$row;
					//加入img
					$SQL = "select * from p_picture where pet_id =$row[id] ";
					$RESULT = mysql_query($SQL);
					if(mysql_fetch_assoc($RESULT)){
						$RESULT = mysql_query($SQL);
						while($row = mysql_fetch_assoc($RESULT)){
							for($j = 0; $j<sizeof($user_message[$i]['host']['pets']); $j++){
								if($user_message[$i]['host']['pets'][$j]['id']==$row['pet_id']){
									//只返回该宠物的一张图片,注：用户登记注册宠物的时候必须上传图片
									$user_message[$i]['host']['pets'][$j]['img']=$row['p_img'];
								}
							}
						}
					}
					else{
						$user_message[$i]['host']['pets']['img'][]="";
					}
				}
			}
			else{
				$user_message[$i]['host']['pets']="";
			}
		}
		$json = json_encode($user_message);
		echo $json ; 
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
		/*
		function double LantitudeLongitudeDist(){

			$radLat1 = rad($lat1);  
	        double $radLat2 = rad($lat2);  
	  
	        double $radLon1 = rad($lon1);  
	        double $radLon2 = rad($lon2);  

	        if ($radLat1 < 0)  
	            $radLat1 = $PI / 2 + Math.abs($radLat1);// south  
	        if ($radLat1 > 0)  
	            $radLat1 = $PI / 2 - Math.abs($radLat1);// north  
	        if ($radLon1 < 0)  
	            $radLon1 = $PI * 2 - Math.abs($radLon1);// west  
	        if ($radLat2 < 0)  
	            $radLat2 = $PI / 2 + Math.abs($radLat2);// south  
	        if ($radLat2 > 0)  
	            $radLat2 = $PI / 2 - Math.abs($radLat2);// north  
	        if ($radLon2 < 0)  
	            $radLon2 = $PI * 2 - Math.abs($radLon2);// west  
	        double $x1 = EARTH_RADIUS * Math.cos($radLon1) * Math.sin($radLat1);  
	        double $y1 = EARTH_RADIUS * Math.sin($radLon1) * Math.sin($radLat1);  
	        double $z1 = EARTH_RADIUS * Math.cos($radLat1);  
	  
	        double x2 = EARTH_RADIUS * Math.cos(radLon2) * Math.sin(radLat2);  
	        double y2 = EARTH_RADIUS * Math.sin(radLon2) * Math.sin(radLat2);  
	        double z2 = EARTH_RADIUS * Math.cos(radLat2);  
	  
	        double d = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2)+ (z1 - z2) * (z1 - z2));  
	        //余弦定理求夹角  
	        double theta = Math.acos((EARTH_RADIUS * EARTH_RADIUS + EARTH_RADIUS * EARTH_RADIUS - d * d) / (2 * EARTH_RADIUS * EARTH_RADIUS));  
	        double dist = theta * EARTH_RADIUS;  
	        return dist;  
	    }
	    */
	?>