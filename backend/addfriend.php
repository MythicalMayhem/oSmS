<?php

header('Content-Type: application/json');

$con = mysqli_connect("localhost", "root", "") or die("" . mysqli_error($con));
mysqli_select_db($con, "osms") or die("" . mysqli_error($con));
$data = json_decode(file_get_contents('php://input'), true);

$fid = $data['fid'];
$client = $data['client'];

$userexists = mysqli_query($con, "SELECT * from users where userid='$fid'") or die("request error" . mysqli_error($con));


if (mysqli_num_rows($userexists) != 0) {
    $tableexists = mysqli_query($con, "SELECT * FROM convo WHERE convoid = '" . ($fid . 'x' . $client) . "' OR convoid = '" . ($client . 'x' . $fid) . "'") or die("" . mysqli_error($con));
    if (mysqli_num_rows($tableexists) == 0) {
        $createNewConvo = "INSERT INTO `convo`(`convoid`, `name`, `members`, `admins`, `theme`) VALUES ('" . ($client . 'x' . $fid) . "','" . ($client . ' and ' . $fid) . "','" . ($client . ',' . $fid) . "','','default')";
        mysqli_query($con, $createNewConvo) or die("" . mysqli_error($con));
        $createHistory =  "CREATE TABLE history" . ($client . 'x' . $fid) . "(userid varchar(100),content varchar(500),sentdate date)";
        mysqli_query($con, $createHistory) or die("" . mysqli_error($con));
        $updateConvos = "UPDATE users set convos= CONCAT(" . ($client . 'x' . $fid) . ",(SELECT convos from users WHERE userid='$client')) WHERE userid='$client';";;
        mysqli_query($con, $updateConvos) or die("" . mysqli_error($con));

        $t =  "history" . "($client" . "x$fid)";
        echo json_encode(array(
            "code" => 202,
            "content" => ($client . 'x' . $fid),
            "comment" => "validated"
        ));
    } else {
        echo json_encode(array(
            "code" => 421,
            "comment" => "already exists (refresh)"
        ));
    }
} else {
    echo json_encode(array(
        "code" => 422,
        "comment" => "user does not exist"
    ));
}
