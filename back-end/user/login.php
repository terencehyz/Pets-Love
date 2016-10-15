<?php
	//本文件向前端返回值为h_secret_key judge id（id可以在添加宠物的时候更快捷） 用户头像地址（judge==0的情况为密码错误）
 	header( 'Access-Control-Allow-Origin:*' ); 
 	header( 'Access-Control-Allow-Origin:*' ); 
	require_once('../mysql/connect.php');
	include_once('../mysql/lib/mysql-fun.php');
	require_once('../lib/secret-key-fun.php');
	require_once('../lib/json-fun.php');
	//$array前端传输来的数据，此处为测试数据
	//$json=file_get_contents('php://input',true);
	//$array = json_decode($json,true);
	$array['h_email']=$_GET['email'];//"yangyangds@imudges.com";//
	$array['h_password']=$_GET['password'];//"123";
	$array['h_longitude']=$_GET['h_longitude'];
	$array['h_latitude']=$_GET['h_latitude'];
	$user_array=fetch_assoc("host","h_email",$array['h_email']);
	$judge=0;
	//此处的$array['h_password']为本文件中两次md5加密后的密码，在与前端对接完成后需改为一次md5加密
	$array['h_password']=md5($array['h_password']);
	if($user_array['h_password']==$array['h_password']){
		header( 'Access-Control-Allow-Origin:*' ); 
		//产生一个随机不重复的h_secret_key,以便于标识 登录用户
		$hash=random(10,'123456789abcdefghijklmnpqrstuvwxyzABCDEFGHIJKLMNPQRSTUVWXYZ');
		$hash=md5(md5($hash));
		// $secret_password=md5($array['h_password']);
		// echo $secret_password;
		// update("host","h_password_md5","$secret_password","h_account","yy");
		if(update('host',"h_secret_key","$hash","h_email",$array['h_email'])){
		//此处的yy为测试数据，后期需要修改,echo也需要删除
			//echo "密钥更新成功！";
			update('host',"h_longitude","$array[h_longitude]","h_email",$array['h_email']);
			update('host',"h_latitude","$array[h_latitude]","h_email",$array['h_email']);
		}
		else{
			//echo "密钥更新失败！";
		}
		$user_message=query('host','h_email',$array['h_email']);
		//require_once('showpet.php');
		//$data=showpet($hash);
		//登录成功向前端返回h_secret_key judge和本人头像位置信息信息
		
		// $return ['judge']=1;
		// $return ['h_secret_key']=$hash;
		// $return ['h_photo']=$user_message['h_photo'];
		// $return ['id']=$user_message['id'];
		$user_message['judge']=1;
<<<<<<< HEAD
		/*if($data==0)
=======
		if($data==0)
>>>>>>> origin/master
		{
			$user_message['pet']="";
		}
		else
		{
			$user_message['pet']=$data;
<<<<<<< HEAD
		}*/
=======
		}
>>>>>>> origin/master
		$json= json_encode($user_message);
		echo $json;
 	}
	else{
		//此处为密码错误的情况
		$return['judge']=0;
		$json= json_encode($return);
		echo $json;
	}
?>


