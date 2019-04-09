<?php
ob_start();
session_start();
require_once('../config.php');


$errors         = array();  	// array to hold validation errors
$data 			= array(); 		// array to pass back data
// validate the variables ======================================================
	// if any of these variables don't exist, add an error to our $errors array


// Processor & Adding To DB ===========================================================




// return a response ===========================================================
	// if there are any errors in our errors array, return a success boolean of false
	if ( ! empty($errors)) {
		// if there are items in our errors array, return those errors
		$data['success'] = false;
		$data['errors']  = $errors;
	} else {
		// if there are no errors process our form, then return a message
		// DO ALL YOUR FORM PROCESSING HERE
		// THIS CAN BE WHATEVER YOU WANT TO DO (LOGIN, SAVE, UPDATE, WHATEVER)
		// show a message of success and provide a true success variable
		 $link = mysql_connect(DB_HOST, DB_USER, DB_PASSWORD);
		 if(!$link) {
		 die('error ' . mysql_error());
		 }

		 $db = mysql_select_db(DB_DATABASE);
		 if(!$db) {
		 die("error");
		 }

     $update = $_POST['update'];


     if ($update=='status') {
			 $cid = $_POST['cid'];
       $cidStatus = $_POST['cidStatus'];
       mysql_query("UPDATE campaigns SET status='$cidStatus' WHERE cid='$cid'");
     } elseif ($update=='deleteCampaign') {
			 $cid = $_POST['cid'];
        mysql_query("DELETE FROM campaigns WHERE cid='$cid'");
        mysql_query("DELETE FROM recent_activity WHERE cid='$cid'");
				mysql_query("DELETE FROM hot_streak WHERE cid='$cid'");
        mysql_query("DELETE FROM actions WHERE cid='$cid'");
     } elseif ($update=='deleteAction') {
	     	$contactID = $_POST['actionID'];
				mysql_query("DELETE FROM actions WHERE id='$contactID'");
     }

		 $data['success'] = true;
		 $data['message'] = 'Success!';


	}
	// return all our data to an AJAX call
	echo json_encode($data);
