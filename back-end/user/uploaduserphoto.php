<?php
  //本文件用于上传照片、修改照片
  //上传至七牛云的yangyang里
	include_once('../mysql/connect.php');
	include_once('../mysql/lib/mysql-fun.php');
	//上传至云所需要
	use Qiniu\Auth;
	use Qiniu\Processing\PersistentFop;
	use Qiniu\Storage\UploadManager;
					
	//secret_key 为前端传回来的数据
	$h_secret_key="ebd629e5b4c603bf5beae17440e039c7";
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
        	if(move_uploaded_file($_FILES['file']['tmp_name'],$uploadfile)){

            	if(!is_uploaded_file($_FILES['file']['tmp_name'])){
            		//如果上传服务器成功，执行从服务器上传至云储存
            		require_once('php-sdk/autoload.php');
				  	require_once __DIR__ . './php-sdk/autoload.php';
					$accessKey = 'CFqxI4hAzpmyZYvcUmBhLIxNKmvNU1L0TSRqxrh0';
				  	$secretKey = 'LY25gt1hGtF4E-QEaJCF1p_DPBT2SYrpN4pB5y5Y';
				  	$auth = new Auth($accessKey,$secretKey);
				  	$bucket = 'yangyang';
				  	$token = $auth->uploadToken($bucket);
				  	$uploadMgr = new UploadManager();
				  	$filename = $name;
				  	$uploadMgr->putFile($token,$filename,'C:/xampp/htdocs/Pets-Love/back-end/user/img/'.$name);
				  	$Outside_the_chain='http://ob22j2b3f.bkt.clouddn.com/'.$filename;
					update('host','h_photo',$Outside_the_chain,'h_secret_key',$h_secret_key);
                	// echo "<center>您的文件已经上传完毕 上传图片预览: </center><br><center><img src='$uploadfile'></center>";
                	// echo"<br><center><a href='javascrīpt:history.go(-1)'>继续上传</a></center>";
              	}
              	else{
                	echo "上传失败！";
              	}
        	}
   		}
?>