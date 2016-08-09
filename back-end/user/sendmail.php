<?php
	header( 'Access-Control-Allow-Origin:*' );
	$email=$_GET['h_email'];
	include_once('../mysql/connect.php');
	include_once('../mysql/lib/mysql-fun.php');
	/**
	 * 注：本邮件类都是经过我测试成功了的，如果大家发送邮件的时候遇到了失败的问题，请从以下几点排查：
	 * 1. 用户名和密码是否正确；
	 * 2. 检查邮箱设置是否启用了smtp服务；
	 * 3. 是否是php环境的问题导致；
	 * 4. 将26行的$smtp->debug = false改为true，可以显示错误信息，然后可以复制报错信息到网上搜一下错误的原因；
	 * 5. 如果还是不能解决，可以访问：http://www.daixiaorui.com/read/16.html#viewpl 
	 *    下面的评论中，可能有你要找的答案。
	 */
	require_once "email.class.php";
	//******************** 配置信息 ********************************
	$smtpserver = "smtp.163.com";//SMTP服务器
	$smtpserverport =25;//SMTP服务器端口
	$smtpusermail = "id_for_vb@163.com";//SMTP服务器的用户邮箱
	$smtpemailto = $email;//发送给谁
	$smtpuser = "id_for_vb";//SMTP服务器的用户帐号
	$smtppass = "12345678910";//SMTP服务器的用户密码
	$mailtitle = '邮箱验证';//邮件主题
	//将email.html 内的代码读到$contents内，以html的格式发送邮件
	// $filename = 'email.html';
	// $handle = fopen($filename, "r");
	// $contents = fread($handle, filesize($filename));
	// fclose($handle);

	//生成验证码
	$captcha_code="";
    for($i=0;$i<6;$i++)
    {
        $data='1234567890';
        //从$data中随机取出元素
        $fontcontent=substr($data,rand(0,strlen($data)),1);
        $captcha_code .= $fontcontent;
    }
    //过期时间
    $time = time()+1800;
    //插入到数据库
    // $captcha_code=md5($captcha_code);
    // $sql="insert into captcha (contents,expiration_time,'h_email') values ('$captcha_code','$time','929144090@qq.com')";
    // mysql_query($sql);
	$mailcontent = "您的验证码为：$captcha_code <br>请在30mins内完成验证。";//邮件内容
	$mailtype = "HTML";//邮件格式（HTML/TXT）,TXT为文本邮件
	//插入到数据库
    $captcha_code=md5($captcha_code);
    $sql="insert into captcha (contents,expiration_time,h_email) values ('$captcha_code','$time','$email')";
    mysql_query($sql);
	//************************ 配置信息 ****************************
	$smtp = new smtp($smtpserver,$smtpserverport,true,$smtpuser,$smtppass);//这里面的一个true是表示使用身份验证,否则不使用身份验证.
	$smtp->debug = false;//是否显示发送的调试信息
	$state = $smtp->sendmail($smtpemailto, $smtpusermail, $mailtitle, $mailcontent, $mailtype);

	echo "<div style='width:300px; margin:36px auto;'>";
	if($state==""){
		$json['judge']=json_encode(0);
		return ;
	}
	$json['judge']=json_encode(1);

?>