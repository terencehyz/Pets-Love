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
?>