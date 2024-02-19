<?php

$con = mysqli_connect("localhost", "root", "") or die("" . mysqli_error($con));
mysqli_select_db($con, "osms") or die("" . mysqli_error($con));
$data = json_decode(file_get_contents('php://input'), true);

$id = $data['id']; 

function death($con){die(json_encode(array("code" => 450, "comment" => strval(mysqli_error($con)))));}
 
$result = mysqli_query($con,"SELECT * from users where userid='$id'") or death($con);
 

echo json_encode(array(
    "code" => "203",
    "comment" => "success",
    "content" => mysqli_fetch_array($result),
));
