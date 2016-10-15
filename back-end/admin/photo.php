<?php
	header( 'Access-Control-Allow-Origin:*' ); 
	$json['url1'] = "http://ob82v1tc3.bkt.clouddn.com/%E8%BD%AE%E6%92%AD_0.jpg";
	$json['url2'] = "http://ob82v1tc3.bkt.clouddn.com/%E8%BD%AE%E6%92%AD_1.jpg";
	$json['url3'] = "http://ob82v1tc3.bkt.clouddn.com/%E8%BD%AE%E6%92%AD_2.jpg";
	$json['url4'] = "http://ob82v1tc3.bkt.clouddn.com/%E8%BD%AE%E6%92%AD_3.jpg";
	$json = json_encode($json);
	echo $json ;
?>