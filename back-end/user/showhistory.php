<?php
	//需要前端传来这只狗的ID
	//此处$pet_id为测试id，后期需要修改
	include_once('../mysql/connect.php');
	include_once('../mysql/lib/mysql-fun.php');
	include_once('../lib/json-fun.php');
	$pet_id="18";
	//找到它所有的EX_lover
	$sql="select * from pet_love_history where p_id=$pet_id";
	$query=mysql_query($sql);
	while($str=mysql_fetch_assoc($query)){
		if($str['temp']==1){
			$pets_message[]=$str;	
		}
	}
	if(empty($pets_message)){
		//如果数组为空，即该宠物没有恋爱历史 返回0
		$json=json_encode(0);
		echo $json;
		return ;
	}
	else{
		//var_dump($pets_message);
		//$pets_id are the pet's EX_lover's message
		$length =count($pets_message);
		//构建一个EX_lover的数组
		for($i=0;$i<$length;$i++){
			$pet_message[]=$pets_message[$i]['p_lover'];
		}
		//var_dump($pet_message);
		$length=count($pet_message);
		for($i=0;$i<$length;$i++){
			//从p_picture里查出当前pet 的EX_lover的图片url
			$data=query('p_picture','pet_id',$pet_message[$i]);
			$EX_lover[$i][]['p_id']=$pet_message[$i];
			$EX_lover[$i][]['p_img']=$data['p_img'];
			//从pet里查出当前pet 的EX_lover name 和简介
			$data=query('pet','id',$pet_message[$i]);
			$EX_lover[$i][]['p_name']=$data['p_name'];
			$data=query('pet','id',$pet_message[$i]);
			$EX_lover[$i][]['p_about']=$data['p_about'];
		}

		$json=ch_json_encode($EX_lover);
		echo $json;
		mysql_close($con);
	}

?>