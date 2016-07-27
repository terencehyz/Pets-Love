<?php 
	include_once('../mysql/lib/mysql-fun.php');
	require_once('../mysql/connect.php');
	//array_message 为前端传输来的数据
	$array_message=array(
		'p_sex'=>'雄性',
		'p_type'=>'金毛',
		'p_age'=>'',
		'h_location'=>''
		);
	if($array_message['h_location']){
		//如果用户搜索宠物时填写了location信息
		$h_message=query('host','h_location',$array_message['h_location']);
		$h_id=$h_message['id'];
		echo $h_id;
		$pets_message=query('pet','host_id',$h_id);
		print_r($pets_message);
		//将$pets_message的信息传给前端
	}
	else{
		//如果用户未填写location信息
		$sql="select * from pet where $array_message = ";
		$query=mysql_query($sql);
		$return=mysql_fetch_array($query,MYSQL_ASSOC);

	}	

?>