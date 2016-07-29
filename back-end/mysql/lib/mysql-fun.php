<?php
	function query($table_name,$row_name=NULL,$value=NULL){
		if($row_name==NULL){
			$sql="select * from $table_name";
			$query=mysql_query($sql);
			$return=mysql_fetch_array($query,MYSQL_ASSOC);
			return $return ;
		}
		else{
			$sql="select * from $table_name where $row_name = '$value'";
			$query=mysql_query($sql);
			$return=mysql_fetch_array($query,MYSQL_ASSOC);
			return $return ;
		}
	}
	function update($table_name,$row_name,$row_value,$key_row,$key_value){
		//update one message
		$sql="update $table_name set $row_name = '$row_value' where $key_row='$key_value'";
		if(mysql_query($sql)){
			$return =1;
			return $return ;
		}
		else{
			$return =0;
			return $return;
		}
	}
	function del($table_name,$row_name,$key_value){
		$sql="delete from $table_name where $row_name = '$key_value'";
		if(mysql_query($sql)){
			$return =1;
			return $return;
		} 
		else{
			$return =0;
			return $return ;
		}
	}
	function add_admin($table_name,$account_value,$password_value){
		$sql="insert into $table_name (admin_account,admin_password) values ('$account_value','$password_value')";
		if(mysql_query($sql)){
			$return = 1;
			return $return;
		}
		else{
			$return =0;
			return $return;
		}
	}
	function fetch_assoc($table_name,$row_name,$key_value){
		$sql="select * from $table_name where $row_name='$key_value'";
		$query=mysql_query($sql);
		$user_array=mysql_fetch_assoc($query);
		return $user_array;
	}
	function insert($user_array){
		foreach($user_array as $value){
			$array[]=$value;
		}
		$time=time();
		//将时间戳转化为mysql时间格式
		$query="select FROM_UNIXTIME($time)";
		$data1=mysql_query($query);
		$data2=mysql_fetch_array($data1,MYSQL_NUM);
		$register_time=$data2[0];
		$sql="insert into host (h_name,h_sex,h_call,h_location,h_account,h_password,h_email,h_register_time) 
			values('$array[0]','$array[1]','$array[2]','$array[3]','$array[4]','$array[5]','$array[6]','$register_time')";
		if(mysql_query($sql)){
			$return =1;
			return $return ;
		}
		else{
			$return =0;
			return $return ;
		}
	}
	function insert_register($user_array){
		$time=time();
		//将时间戳转化为mysql时间格式
		$query="select FROM_UNIXTIME($time)";
		$data1=mysql_query($query);
		$data2=mysql_fetch_array($data1,MYSQL_NUM);
		$register_time=$data2[0];
		foreach($user_array as $value){
			$array[]=$value;
		}
		$sql="insert into host (h_email,h_password,h_register_time) values('$array[0]','$array[1]','$data2[0]')";
		if(mysql_query($sql)){
			$return =1;
			return $return ;
		}
		else{
			$return =0;
			return $return ;
		}
	}
?>