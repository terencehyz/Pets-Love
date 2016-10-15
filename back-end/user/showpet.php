<?php
	//本文件用于向用户展示个人宠物信息 前端将传来一个secret_key 通过secret_key辨识此人
	//function showpet($user_recognize){
		header( 'Access-Control-Allow-Origin:*' ); 
		//$user_recognize="ebd629e5b4c603bf5beae17440e039c7";//$_POST['h_secret_key'];
		include_once('../mysql/connect.php');
		include_once('../mysql/lib/mysql-fun.php');
		$user_recognize=$_GET['h_id'];

		$data=query('host','id',$user_recognize);
		$h_id=$data['id'];
		$sql="select * from pet where host_id=$h_id";
		$query=mysql_query($sql);
		while ($str = mysql_fetch_assoc($query)) {
				$pets_message['pets'][]=$str;
			}
		if(empty($pets_message)){
			$json=json_encode(0);
			echo $json;
		}
		else{
			$length=count($pets_message['pets']);
			for($i=0;$i<$length;$i++){
				$query=query('p_picture','pet_id',$pets_message['pets'][$i]['id']);
				$pets_message['pets'][$i]['p_img']=$query['p_img'];
			}
			//向前端传回用户的所有宠物信息
			// $json=json_encode($pets_message);
			$pets_message['judge']=1;
<<<<<<< HEAD
			echo json_encode($pets_message);
=======
			return $pets_message;
>>>>>>> origin/master
		}
	//}
?>