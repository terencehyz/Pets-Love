<?php
	//本文件用于编辑、修改宠物图片
	include_once('../mysql/connect.php');
	include_once('../mysql/lib/mysql-fun.php');
  //上传至云所需要
  use Qiniu\Auth;
  use Qiniu\Processing\PersistentFop;
  use Qiniu\Storage\UploadManager;
   //secret_key id为前端传来的数据       
  $id = 1;
  	$uploaddir = "./petsimg/";//设置文件保存目录 注意包含/  
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
        echo $uploadfile;
        	if(move_uploaded_file($_FILES['file']['tmp_name'],$uploadfile)){

            	if(!is_uploaded_file($_FILES['file']['tmp_name'])){
            	 require_once('php-sdk/autoload.php');
               require_once __DIR__ . './php-sdk/autoload.php';
               $accessKey = 'CFqxI4hAzpmyZYvcUmBhLIxNKmvNU1L0TSRqxrh0';
               $secretKey = 'LY25gt1hGtF4E-QEaJCF1p_DPBT2SYrpN4pB5y5Y';
               $auth = new Auth($accessKey,$secretKey);
               $bucket = 'pets';
                $token = $auth->uploadToken($bucket);
               $uploadMgr = new UploadManager();
               $filename = $name;
               $uploadMgr->putFile($token,$filename,'D:/xampp/htdocs/Pets-Love/back-end/user/petsimg/'.$name);
               $Outside_the_chain='http://ob82v1tc3.bkt.clouddn.com/'.$filename;
               update('p_picture','p_img',$Outside_the_chain,'id',$id);



              // //输出图片预览，后期需要删除
             //    	echo "<center>您的文件已经上传完毕 上传图片预览: </center><br><center><img src='$uploadfile'></center>";
             //    	echo"<br><center><a href='javascrīpt:history.go(-1)'>继续上传</a></center>";
              	}
              	else{
                	echo "上传失败！";
              	}
        	}
   		}
      mysql_close($con);
?>