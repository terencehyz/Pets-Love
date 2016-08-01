<?php
  //本文件用于上传照片、修改照片
	include_once('../mysql/connect.php');
	include_once('../mysql/lib/mysql-fun.php');
	$secret_key="b51e1ab9a3b6a5b4198232d5f1169e20";
  	$uploaddir = "./img/";//设置文件保存目录 注意包含/  
  	$type=array("jpg","gif","bmp","jpeg","png");//设置允许上传文件的类型
  	$patch="http://127.0.0.1/pets-love/back-end/user/";//程序所在路径
	// $patch="http://127.0.0.1/cr_downloadphp/upload/files/";//程序所在路径
  
   	//获取文件后缀名函数
    function fileext($filename)
    {
        //strrchr()返回指定符号之后的字符串
        return substr(strrchr($filename, '.'), 1);
    }
   //生成随机文件名函数  
    function random($length)
    {
        $hash = 'CR-';
        $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz';
        $max = strlen($chars) - 1;
        mt_srand((double)microtime() * 1000000);
            for($i = 0; $i < $length; $i++)
            {
                $hash .= $chars[mt_rand(0, $max)];
            }
        return $hash;
    }
   	$a=strtolower(fileext($_FILES['file']['name']));
   	//判断文件类型
   	//in_array — 检查数组中是否存在某个值
   	if(!in_array(strtolower(fileext($_FILES['file']['name'])),$type))
     	{
     	   //implode — 将一个一维数组的值转化为字符串
       		 $text=implode(",",$type);
       		 $return =0;
        	echo $return ;
        	//echo "您只能上传以下类型文件: ".$text."<br>";
     	}
   //生成目标文件的文件名  
   	else{
   		 //explode — 使用一个字符串分割另一个字符串
    		$filename=explode(".",$_FILES['file']['name']);
        	do
        	{
            	$filename[0]=random(10); //设置随机数长度
            	$name=implode(".",$filename);
            	//$name1=$name.".Mcncc";
            	$uploadfile=$uploaddir.$name;
        	}
   			while(file_exists($uploadfile));
   			//在于前端完成传递之后需要修改此处！！！
   			$h_secret_key="b51e1ab9a3b6a5b4198232d5f1169e20";
   			update('host','h_photo',$uploadfile,'h_secret_key',$h_secret_key);
        	if(move_uploaded_file($_FILES['file']['tmp_name'],$uploadfile)){

            	if(!is_uploaded_file($_FILES['file']['tmp_name'])){
            	//输出图片预览，后期需要删除
                	echo "<center>您的文件已经上传完毕 上传图片预览: </center><br><center><img src='$uploadfile'></center>";
                	echo"<br><center><a href='javascrīpt:history.go(-1)'>继续上传</a></center>";
              	}
              	else{
                	echo "上传失败！";
              	}
        	}
   		}
      mysql_close($con);
?>