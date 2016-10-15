<?php
	header( 'Access-Control-Allow-Origin:*' ); 
	require('../mysql/connect.php');
	$h_id = $_GET['h_id'];
	$sql = "select id,p_sex,p_type,p_detail_type,p_age from pet where host_id = '$h_id'";//找到当前主人的ID
	$sql1 = "select * from pet where host_id !='$h_id'";//找其他宠物
	$res1 = mysql_query($sql1);
	$outher=0;
	$userhost=0;
	while($row2 = mysql_fetch_assoc($res1))
	{
		$message_outher[]=$row2;
		$id = $row2['id'];
		$outher++;//存其他宠物长度为outher
	}
	$res = mysql_query($sql);
	while($row = mysql_fetch_assoc($res))
	{
		//print_r($row);
		$message_userhost[]=$row;
		$userhost++;//存自己宠物长度为outher
	}
	for($i=0;$i<$userhost;$i++)
	{//循环套数组
		for($j=0;$j<$outher;$j++)
		{//算法部分
			$recommendnum=0;
			if($message_userhost[$i]['p_sex'] == $message_outher[$j]['p_sex'])
			{
				$recommendnum = $recommendnum+10;
			}
			else
			{
				$recommendnum = $recommendnum+4;
			}
			if($message_userhost[$i] == $message_outher[$j]['p_type'])
			{
				$recommendnum = $recommendnum+5;
			}
			else
			{
				$recommendnum = $recommendnum-5;
			}
			$recommendum = $recommendnum +10-abs(($message_userhost[$i]['p_age']-$message_outher[$j]['p_age']));
			if($message_userhost[$i]['p_detail_type'] == $message_outher[$j]['p_detail_type'])
			{
				$recommendnum = $recommendnum+10;
			}
			else
			{
				$recommendnum = $recommendnum+5;
			}
			$message_outher[$j]['recommendnum'] = 100-$recommendnum;
		}
	}
	for($jj=0;$jj<$outher;$jj++)
	{
		$pid = $message_outher[$jj]['id'];
		$sql3 = "select p_img from p_picture where pet_id = '$pid'";
		$res = mysql_query($sql3);
		$row=mysql_fetch_assoc($res);
		$message_outher[$jj]['p_img'] = $row['p_img'];
		$hostid = $message_outher[$jj]['host_id'];
		$sql4 = "select * from host where id = '$hostid'";
		$res4 = mysql_query($sql4);
		$row4=mysql_fetch_assoc($res4);//以下返回的是主人信息
		$message_outher[$jj]['h_id'] = $row4['id'];
		$message_outher[$jj]['h_name'] = $row4['h_name'];
		$message_outher[$jj]['h_call'] = $row4['h_call'];
		$message_outher[$jj]['h_location'] = $row4['h_location'];
		$message_outher[$jj]['h_account'] = $row4['h_account'];
		$message_outher[$jj]['h_email'] = $row4['h_email'];
		$message_outher[$jj]['h_photo'] = $row4['h_photo'];
		/*while($res = mysql_query($sql3))
		{
			$row=mysql_fetch_assoc($res);
			$message_outher[$jj]['p_img'] = $row['p_img'];
		}//给每个宠物配上图片*/
	}
	/*for($k=0;$k<$outher;$k++)
	{
		for($kk=0;$kk<$outher-$k;$kk++)
		{
			if($message_outher[$kk]['recommendnum']<$message_outher[$kk+1]['recommendnum'])
			{
				$xx = $kk+1;
				$test[] = $message_outher[$k];
				$message_outher[$kk] = $message_outher[$xx];
				$message_outher[$xx] = $test[1];
			}
		}
	}*/
	//echo json_encode($message_outher);
	$json=json_encode(multi_array_sort($message_outher,"recommendnum"));
	echo $json;
	
	function multi_array_sort($multi_array,$sort_key,$sort=SORT_ASC)
	{ 
		if(is_array($multi_array))
		{ 
			foreach ($multi_array as $row_array)
			{ 
				if(is_array($row_array))
				{ 
					//print_r($row_array);
					$key_array[] = $row_array[$sort_key];
				}
				else
				{ 
					return false; 
				} 
			} 
		}
		else
		{ 
			return false; 
		} 
			array_multisort($key_array,$sort,$multi_array); 
			return $multi_array; 
	} 
	/*function recommend($message1,$message2)
	{
		$recommendnum=0;
		if($message1['p_sex'] == $message2['p_sex'])
		{
			$recommendnum = $recommendnum+10;
		}
		else
		{
			$recommendnum = $recommendnum+4;
		}
		if($message1['p_type'] == $message2['p_type'])
		{
			$recommendnum = $recommendnum+5;
		}
		else
		{
			$recommendnum = $recommendnum-5;
		}
		$recommendum = $recommendnum +10-abs(($message1['p_age']-$message2['p_age']));
		if($message1['p_detail_type'] == $message2['p_detail_type'])
		{
			$recommendnum = $recommendnum+10;
		}
		else
		{
			$recommendnum = $recommendnum+5;
		}
		return $recommendnum;
	}*/
?>