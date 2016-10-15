<?php
	header( 'Access-Control-Allow-Origin:*' );
	require_once('../mysql/connect.php');
	require_once('../mysql/lib/mysql-fun.php');
	//$message由前端传来的搜索关键字
	$message=$_GET['message'];
	$sql="select * from pet where p_name like '%$message%' or p_type like '%$message%' or p_age like '%$message%' or p_about like '%$message%'";
	//echo $sql;
	$query=mysql_query($sql);
	while($str=mysql_fetch_assoc($query)){
		$search_message['pets'][]=$str;
	}
	if(empty($search_message)){
		$judge['judge']=0;
		$json=json_encode($judge);
		echo $json;
	}
	else{
		//将对应宠物图片存入$search_message
		for($i=0;$i<sizeof($search_message['pets']); $i++){
			$pet_id = $search_message['pets'][$i]['id'];
			$sql="select p_img from p_picture where pet_id = $pet_id ";
			$query=mysql_query($sql);
			while($p_img=mysql_fetch_assoc($query)){
				$search_message['pets'][$i]['p_imgs'][]=$p_img['p_img'];
				$search_message['pets'][$i]['p_img']=$p_img['p_img'];
			}
		}
		//将主人的信息存入$search_message
		for($i=0;$i<sizeof($search_message['pets']); $i++){
			$phost_id = $search_message['pets'][$i]['host_id'];
			$sql="select * from host where id = $phost_id ";
			if($query=mysql_query($sql)){
				$h_message=mysql_fetch_assoc($query);	
				$search_message['pets'][$i]['host']=$h_message;
			}
		}
		//$search_message['pets'][$i]['p_img']=$search_message['pets'][$i]['p_img'][1];
		$search_message['judge']=1;
		$json=json_encode($search_message);
		echo $json;	
	}
?>