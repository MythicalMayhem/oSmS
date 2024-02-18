<?php
$con = mysqli_connect("localhost", "root", "") or die("" . mysqli_error($con));
mysqli_select_db($con, "osms") or die("" . mysqli_error($con));
$data = json_decode(file_get_contents('php://input'), true);
$id = $data['id'];
$userid = $data['userid'];
$content = $data['content'];
$date = date('Y-m-d');

function death($con,$temp){die(json_encode(array("code" => 450, "comment" => strval(mysqli_error($con)))));}

$query = "INSERT INTO `$id`(`userid`, `content`, `sentdate`) VALUES ('$userid','$content','$date')";
$result = mysqli_query($con, $query) or death(($con),$temp);
echo json_encode(array(
    "code"=> 204,
    "comment"=>("success"),
));
