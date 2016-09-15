<?php
	require_once('../mysql/connect.php');
	require_once('../mysql/lib/mysql-fun.php');
	//前端传来用户的信息
	$new['p_name']="小A";
	$new['p_sex']="雄性";
	$new['p_type']="狗";
	$new['p_age']="三个月";
	$new['host_id']="23";
	$new['p_about']="这是一只刚出生的小狗";
	$new['p_detail_type']="藏獒";
	$sql="select * from pet where host_id=$new[host_id]";
	$query=mysql_query($sql);
	$all_pets=array();
	while($str=mysql_fetch_assoc($query)){
		$all_pets[]=$str;
	}
	$length=count($all_pets);
	$judge=0;;
	//如果有重复的信息 将$judge置为1；
	for($i=0;$i<$length;$i++){
		if(array_intersect($all_pets[$i], $new)==$new){//交集判断函数，判断$new与$all_pets($i)是否有交集，而且交集是否等于$new
			$index=$i;
			$judge=1;
		}
	}
	//如果没有重复的信息 将执行插入操作并返回1;
	if($judge==0){
		$sql="insert into pet (p_name,p_sex,p_type,p_age,host_id,p_about,p_detail_type) values ('$new[p_name]','$new[p_sex]','$new[p_type]','$new[p_age]','$new[host_id]','$new[p_about]','$new[p_detail_type]')";
		if(mysql_query($sql)){
			$return =1;
			$json=json_encode($return);
			echo $json;
		}
		else{
			$return =0;
			$json=json_encode($return);
			echo $json;
		}
	}
	//如果有重复信息的话
	else {
		$return=0;
		$json=json_encode($return);
		echo $json;
	}
	mysql_close($con);
	//test
?>
