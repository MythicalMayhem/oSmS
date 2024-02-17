<?php
$data = json_decode(file_get_contents('php://input'), true);
$type = $data['type'];
if ($type == 'login') {
    $userid = $data['userid'];
    $pw = $data['pw'];

    $con = mysqli_connect('localhost', 'root', '') or die('erreur connection' . mysqli_connect_error());
    mysqli_select_db($con, 'osms') or die('selection error');
    $req = "SELECT userid,pw from users where userid='$userid' and pw='$pw' ";
    $res = mysqli_query($con, $req) or die(mysqli_error($con));
    if (mysqli_num_rows($res) == 1) {
        echo 200;
    } elseif (mysqli_num_rows($res) > 1) {
        echo mysqli_error($con);
    } elseif (mysqli_num_rows($res) == 0) {
        echo 420;
    }
} elseif ($data['type'] == 'signup') {
    $userid = $data['userid'];
    $username = $data['username'];
    $pw = $data['pw'];
    $con = mysqli_connect('localhost', 'root', '') or die('erreur connection' . mysqli_connect_error());
    mysqli_select_db($con, 'osms') or die('selection error');
    $req = "SELECT userid from users where userid='$userid' ";
    $res = mysqli_query($con, $req) or die(mysqli_error($con));
    if (mysqli_num_rows($res) == 1) {
        echo 420;
    } elseif (mysqli_num_rows($res) > 1) {
        echo mysqli_error($con);
    } elseif (mysqli_num_rows($res) == 0) {
        $req = "INSERT INTO `users`(`userid`, `username`, `pw`, `convos`) VALUES ('$userid','$username','$pw','')";
        $res = mysqli_query($con, $req) or die(mysqli_error($con));
        if (mysqli_affected_rows($con) > 0) {
            echo 200;
        } else {
            echo mysqli_error($con);
        }
    }
}
