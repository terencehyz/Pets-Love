<?php
/**
	* 产生随机字符串
	*
	* @param    int        $length  输出长度
	* @param    string     $chars   可选的 ，默认为 0123456789
	* @return   string     字符串
	*/
	function random($length, $chars = '0123456789') {
	$hash = '';
	$max = strlen($chars) - 1;
	for($i = 0; $i < $length; $i++) {
		$hash .= $chars[mt_rand(0, $max)];
		}
	return $hash;
	}
?>