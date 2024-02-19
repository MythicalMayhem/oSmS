<?php
$data = json_decode(file_get_contents('php://input'), true);
$type = $data['type'];
$con = mysqli_connect('localhost', 'root', '') or death('erreur connection' . mysqli_connect_error());
mysqli_select_db($con, 'osms') or death('selection error');

function death($con, $line = '')
{
    die(json_encode(array("code" => 450, "comment" => $line . strval(mysqli_error($con)))));
}

if ($type == 'login') {
    $username = $data['username'];
    $pw = $data['pw'];

    $req = "SELECT username,pw from users where username='$username' and pw='$pw' ";
    $res = mysqli_query($con, $req) or death(mysqli_error($con));
    if (mysqli_num_rows($res) == 1) {
        echo json_encode(array(
            "code" => 200,
            "comment" => "validated",
        ));
    } elseif (mysqli_num_rows($res) == 0) {
        echo json_encode(array(
            "code" => 420,
            "comment" => "incorrect credentials",
        ));
    } else {
        echo json_encode(array(
            "code" => 530,
            "comment" => mysqli_error($con),
        ));
    }
} elseif ($data['type'] == 'signup') {
    $username = $data['username'];
    $pw = $data['pw'];

    $req = "SELECT username from users where username='$username' ";
    $res = mysqli_query($con, $req) or death(mysqli_error($con));
    if (mysqli_num_rows($res) == 1) {
        echo json_encode(array(
            "code" => 530,
            "comment" => "user already exists",
        ));
    } else if (mysqli_num_rows($res) == 0) {
        $req = "INSERT INTO `users`(`username`, `pw`, `convos`) VALUES ('$username','$pw','')";
        $res = mysqli_query($con, $req) or death(mysqli_error($con));
        if (mysqli_affected_rows($con) > 0) {
            echo json_encode(array(
                "code" => 200,
                "comment" => "authenticated",
            ));;
        } else {
            echo json_encode(array(
                "code" => 530,
                "comment" => mysqli_error($con),
            ));
        }
    } else {
        echo json_encode(array(
            "code" => 530,
            "comment" => mysqli_error($con),
        ));
    }
}
