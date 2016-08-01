<?php
//需要判断是否重复
	include_once('../mysql/connect.php');
	include_once('../mysql/lib/mysql-fun.php');
	// $pet_id=2;//$_POST['id'];
	// $pet_name='1';//$_POST['p_name'];
	// $pet_sex='1';//$_POST['p_sex'];
	// $pet_type='1';//$_POST['p_type'];
	// $pet_age='1';//$_POST['p_age'];
	// $pet_about='1';//$_POST['p_about'];
	// $sql="select * from pet where host_id='$pet_id'";
	$new['id']="2";
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
	$length=count($all_pets);//将用户的宠物数量记录
	$judge=0;;
	//如果有重复的信息 将$judge置为1；
	for($i=0;$i<$length;$i++){
		if(array_intersect($all_pets[$i], $new)==$new){//交集判断函数，判断$new与$all_pets($i)是否有交集，而且交集是否等于$new
			$index=$i;
			$judge=1;
		}
	}
	if($judge==0){
		$sql="update pet set p_name='new[pet_name]' and p_sex='new[pet_sex]' and p_type='new[pet_type]' and p_age='new[pet_age]' and p_about='new[pet_about]' where id=new[id] ";
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
?>