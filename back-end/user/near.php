<?php
require_once('../mysql/connect.php');
/*$srck = $_POST[srck];
$uid=$_POST[uid];*/
$uid = 15;
if($uid){
	# code...
$re=mysql_query("select h_lat,h_long  from host where id='$uid'")or die(mysql_error());
$row=mysql_fetch_assoc($re);
if(!empty($row['h_lat']) and !empty($row['h_long']))
{
$re0=mysql_query("select h_name,h_lat,h_long
 from host where id!='$uid'");
while($row0=mysql_fetch_assoc($re0))
{
$distance = getDistanceBetweenPointsNew($row['h_lat'], $row['h_long'], $row0['h_lat'], $row0['h_long']);
$row0['meters']=$distance['meters'];
$arr[]=$row0;
}
$arr=array_sort($arr,'meters');
$arr = array_slice($arr,0,10); 
$data=json_encode($arr);
$s=mysql_errno();
//echo $data;
//echo "{"s":$s,"data":$data}";
echo $data;
}
}
// 比较两个地点的距离
function getDistanceBetweenPointsNew($latitude1, $longitude1, $latitude2, $longitude2)
{
 $theta = $longitude1 - $longitude2;
 $miles = (sin(deg2rad($latitude1)) * sin(deg2rad($latitude2))) + (cos(deg2rad($latitude1)) * cos(deg2rad($latitude2)) * cos(deg2rad($theta)));
 $miles = acos($miles);
 $miles = rad2deg($miles);
 $miles = $miles * 60 * 1.1515;
 $feet = $miles * 6378.137 ;
 $yards = $feet / 3;
 $kilometers = $miles * 1.609344;
 $meters = $kilometers * 1000;
 return compact('miles', 'feet', 'yards', 'kilometers', 'meters');
}
// 二维数组按某个key排序
function array_sort($arr,$keys,$type='asc')
{
$keysvalue = $new_array = array();
foreach ($arr as $k=>$v){
$keysvalue[$k] = $v[$keys];
}
if($type == 'asc'){
asort($keysvalue);
}else{
arsort($keysvalue);
}
reset($keysvalue);
foreach ($keysvalue as $k=>$v){
$new_array[$k] = $arr[$k];
}
return $new_array; 
}
?>