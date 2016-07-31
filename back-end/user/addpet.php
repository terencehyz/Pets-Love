<?php
	require_once('../mysql/connect.php');
	require_once('../mysql/lib/mysql-fun.php');
	//前端传来用户的信息
	$new['p_name']="1";
	$new['p_sex']="1";
	$new['p_type']="1";
	$new['p_age']="1";
	$new['host_id']="12";
	$new['p_about']="1";
	$new['p_detail_type']="1";
	$sql="select * from pet where host_id=$new[host_id]";
	$query=mysql_query($sql);
	while($str=mysql_fetch_assoc($query)){
		$all_pets[]=$str;
	}
	$length=count($all_pets);
	$judge=0;;
	//如果有重复的信息 将$judge置为1；
	for($i=0;$i<$length;$i++){
		if(array_intersect($all_pets[$i], $new)==$new){
			$index=$i;
			$judge=1;
		}
	}
	//如果没有重复的信息 将执行插入操作并返回1;
	if($judge==0){
		$sql="insert into pet (p_name,p_sex,p_type,p_age,host_id,p_about,p_detail_type) values ('$new[p_name]','$new[p_sex]','$new[p_type]','$new[p_age]','$new[host_id]','$new[p_about]','$new[p_detail_type]')";
		if(mysql_query($sql)){
		//////////////////////////////////////$json_encode(value)
		}
		else{
			$return =0;
			$json=json_encode($return);
			echo $json;
		}
	}
	else {
		$return=0;
		$json=json_encode($return);
		echo $json;
	}
?>