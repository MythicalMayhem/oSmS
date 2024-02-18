<?php


$con = mysqli_connect("localhost", "root", "") or die("" . mysqli_error($con));
mysqli_select_db($con, "osms") or die("" . mysqli_error($con));
$data = json_decode(file_get_contents('php://input'), true);
$id = $data['id'];

function getRecent($con, $id ) {
    $query = "SELECT * from history".$id." order by id desc limit 25 ";
    $result = mysqli_query($con, $query) or die("". mysqli_error($con));
    $rows = array();
    while ($r = mysqli_fetch_array($result)) {
        $rows[]=$r;
    };
    mysqli_close($con);
    return $rows;
}


echo json_encode(array(
    "code"=> "203",
    "comment"=>("success"),
    "content"=> getRecent($con,$id),
));
