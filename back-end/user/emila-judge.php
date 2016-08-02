<?php
//		验证邮箱地址合法
	$email_address = "zhangtaiyin@imudges.com";
        $pattern = "/^([0-9A-Za-z\\-_\\.]+)@([0-9a-z]+\\.[a-z]{2,3}(\\.[a-z]{2})?)$/i";
        if ( preg_match( $pattern, $email_address ) )
        {
            $reply = "您输入的电子邮件地址合法<br /><br />\n";
            $user_name = preg_replace( $pattern ,"$1", $email_address );
            $domain_name = preg_replace( $pattern ,"$2", $email_address );
            $reply .= "用户名：".$user_name."<br />\n";
            $reply .= "域名：".$domain_name."<br />\n\n";
        }
        else
        {
            $reply = "您输入的电子邮件地址不合法";
        }
    echo $reply;
    ?>

