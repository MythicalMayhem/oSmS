<?php

header('Content-Type: application/json');
function death($con, $line = 'ok')
{
    die(json_encode(array("code" => 450, "comment" => $line . strval(mysqli_error($con)))));
}

$con = mysqli_connect("localhost", "root", "") or death($con);
mysqli_select_db($con, "osms") or death($con);
$data = json_decode(file_get_contents('php://input'), true);

$fid = $data['fid'];
$client = $data['client'];


$userexists = mysqli_query($con, "SELECT * from users where userid='$fid'") or death($con);
/*
mysqli_query($con,"delete from convo") or death($con);   
mysqli_query($con,"update users set convos=''") or death($con);   
mysqli_query($con,"drop table IF EXISTS history2005x2005") or death($con);   
mysqli_query($con,"drop table IF EXISTS history2005x2006") or death($con);   
mysqli_query($con,"drop table IF EXISTS history2006x2005") or death($con);   
mysqli_query($con,"drop table IF EXISTS history2006x2006") or death($con);   
*/
if (mysqli_num_rows($userexists) != 0) {
    $tableexists = mysqli_query($con, "SELECT convoid FROM convo WHERE convoid = '" . ($fid . 'x' . $client) . "' OR convoid = '" . ($client . 'x' . $fid) . "'") or death($con);
    $t = ($client . 'x' . $fid);
    if (mysqli_num_rows($tableexists) == 0) {
        $createNewConvo = "INSERT INTO `convo`(`convoid`, `name`, `members`, `admins`, `theme`) VALUES ('" . ($client . 'x' . $fid) . "','" . ($client . ' and ' . $fid) . "','" . ($client . ',' . $fid) . "','','default')";
        mysqli_query($con, $createNewConvo) or death($con);

        $createHistory =  "CREATE TABLE history" . $t . "(id int AUTO_INCREMENT PRIMARY KEY,userid varchar(100),content varchar(500),sentdate date)";
        mysqli_query($con, $createHistory) or death($con);

        $updateConvos = "UPDATE users set convos= CONCAT(',$t',(SELECT convos from users WHERE userid='$client')) WHERE userid='$client';  ";
        mysqli_query($con, $updateConvos) or death($con);


        echo json_encode(array(
            "code" => 202,
            "comment" => "validated",
            "content" => $t,
        ));
    } else {
        $total = mysqli_query($con, "SELECT convos from users where userid='$client'") or death($con);
        $total=mysqli_fetch_array($total)[0];
        $convoid = mysqli_fetch_array($tableexists)[0];
        if ((!(strpos($total, $convoid)))==1) {
            $updateConvos = "UPDATE users set convos= CONCAT(',$convoid',(SELECT convos from users WHERE userid='$client')) WHERE userid='$client'";
            mysqli_query($con, $updateConvos) or death($con, 'asdf');
        }

        echo json_encode(array(
            "code" => 203,
            "comment" => "already exists (refresh)" . !strval(strpos($client, $convoid)),
            "content" => $convoid,
        ));
    }
} else {
    echo json_encode(array(
        "code" => 422,
        "comment" => "user does not exist"
    ));
}
function convoexists($ch, $convo, $convo1)
{
    $arr =     explode(',', $ch);
    $i = 0;
    while ($temp = $arr[$i]) {
        $i = $i + 1;
        if (($temp == $convo) or ($temp == $convo1)) {
            return true;
        }
    }
    return false;
}
