<? php
$srck = $_POST[srck];
$uid=$_POST[uid];
if($uid>0)
{
$re=mysql_query("select `lat`,`long` from pre_common_member where uid='$uid'")or die(mysql_error());
$row=mysql_fetch_assoc($re);
if(!empty($row[lat]) and !empty($row[long]))
{
$re0=mysql_query("select `username`,`lat`,`long` from pre_common_member where uid!='$uid'");
while($row0=mysql_fetch_assoc($re0))
{
$distance = getDistanceBetweenPointsNew($row['lat'], $row['long'], $row0['lat'], $row0['long']);
$row0[meter]=$distance[meters];
$arr[]=$row0;
}
$arr=array_sort($arr,'meter');
$arr = array_slice($arr,0,10); 
$data=json_encode($arr);
$s=mysql_errno();
//echo $data;
echo"{"s":$s,"data":$data}";
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
 $feet = $miles * 5280;
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