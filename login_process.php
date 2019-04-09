<?php
ob_start();
session_start();
require_once('config.php');

$errors         = array();  	// array to hold validation errors
$data 			= array(); 		// array to pass back data

// if there are no errors process our form, then return a message
// DO ALL YOUR FORM PROCESSING HERE
// THIS CAN BE WHATEVER YOU WANT TO DO (LOGIN, SAVE, UPDATE, WHATEVER)
// show a message of success and provide a true success variable
$con = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE);

if ($con->connect_error) {

   $data['success'] = false;
   $errors['reason'] = "systemError";
   $errors["errorText"] = "Connection failed: " . $con->connect_error;
   $data['errors']  = $errors;

} else {




// validate the variables ======================================================
	// if any of these variables don't exist, add an error to our $errors array
	if (($_POST['acc']!='') && ($_POST['request']=='emailVerify') ) {

		$acc = $_POST['acc'];
    $updateQry = "UPDATE users SET emailVerify='true' WHERE sId='$acc'";

    if (mysqli_query($con, $updateQry)) {

      $loginStatus = true;
  		$data['firstLogin'] = true;

      $data['success'] = true;
      $data['message'] = 'Success!';

   } else {
      $data['success'] = false;
      $errors['reason'] = "systemError";
      $errors["errorText"] = "Error updating record: " . mysqli_error($con);
      $data['errors']  = $errors;
   }


	} else {

		$email = $_POST['email'];
		$passwd = $_POST['passwd'];
    $newPasswd = md5($passwd);

		if (empty($email))
			$errors['email'] = 'آدرس ایمیلتان را وارد نمایید';
		if (empty($passwd))
			$errors['passwd'] = 'رمز عبورتان را وارد نمایید';
	}

// Processor & Adding To DB ===========================================================




// return a response ===========================================================
	// if there are any errors in our errors array, return a success boolean of false
	if ( ! empty($errors)) {

    $data['success'] = false;
    $errors['reason'] = "fields";
    $data['errors']  = $errors;

	} elseif ( (empty($errors)) || ($loginStatus) ) {

		if (!$loginStatus) {
			$qry="SELECT * FROM users WHERE email='$email' AND password='$newPasswd' ";
		} else {
			$qry="SELECT * FROM users WHERE sId='$acc'";
		}

    $result = mysqli_query($con, $qry);

    if (!$result) {

      $data['success'] = false;
      $errors['reason'] = "systemError";
      $errors["errorText"] = " can't verify user: " . mysqli_error($con);
      $data['errors']  = $errors;

    } else  {

			 if(mysqli_num_rows($result) > 0){

			 	 session_regenerate_id();
         $user = mysqli_fetch_assoc($result);

          $userPackage = $user['last_package_id'];
          $userID = $user['sId'];

			 		$_SESSION['SM_id'] = $user['sId'];
			 		$_SESSION['SM_email'] = $user['email'];
			 		$_SESSION['SM_name'] = $user['name'];

					// new user to read documents check
          $data['getStartStatus'] = $user['getstart_status'];


					// 14 days test check
					if ($user['status']=='test') {
						$testDateHour = ( strtotime(date('Y-m-d')) - strtotime($user['date']) ) / 86400;
						if ($testDateHour>=14) {

							$_SESSION['SM_expire'] = true;
							$_SESSION['SM_testProfile'] = true;

              mysqli_query($con, "UPDATE users SET status='deactive',reason='test_end' WHERE sId='$userID'");
              mysqli_query($con, "UPDATE buy_packages SET status='deactive' WHERE sId='$userID' AND package_name='$userPackage' AND status='active'");
						}

            $data['success'] = true;
            $data['message'] = 'Success!';

					} elseif ($user['status']=='deactive') {

						$_SESSION['SM_expire'] = true;
						$_SESSION['SM_expire_reason'] = $user['reason'];

            $data['success'] = true;
            $data['message'] = 'Success!';

					} elseif ($user['status']=='upgrade') {

            $userCurrentPackage = $user['last_package'];

            $packageQry="SELECT * FROM buy_packages WHERE sId='$userID' AND package_name='$userCurrentPackage' AND status='active' AND upgrade_status='true'";
            $packageResult=mysqli_query($con, $packageQry);

            if (!$packageResult) {

              $data['success'] = false;
              $errors['reason'] = "systemError";
              $errors["errorText"] = 'mysql error for select packages (upgrade): ' . mysqli_error($con);
              $data['errors']  = $errors;

            }
            else {
              if(mysqli_num_rows($packageResult) > 0){

                $packageDetail = mysqli_fetch_assoc($packageResult);

                $packageDetailUpgradeDate = $packageDetail['upgrade_date'];

                $packageUpgradeDateDifference = ( strtotime(date('Y-m-d')) - strtotime($packageDetailUpgradeDate) ) / 86400;

                if ($packageUpgradeDateDifference>=3) {

                  mysqli_query($con, "UPDATE users SET status='deactive',reason='upgrade' WHERE sId='$userID'");
                  mysqli_query($con, "UPDATE buy_packages SET status='deactive' WHERE sId='$userID' AND package_name='$userCurrentPackage' AND status='active' AND upgrade_status='true'");

                  $_SESSION['SM_expire'] = true;
      						$_SESSION['SM_expire_reason'] = 'upgrade';

                } else {

                  $_SESSION['SM_expire'] = false;

                }

              }

              $data['success'] = true;
              $data['message'] = 'Success!';

            }


          } else {
						$_SESSION['SM_expire'] = false;

            $data['success'] = true;
            $data['message'] = 'Success!';
					}



			} else {
        $data['success'] = false;
        $errors['reason'] = "userNotFound";
        $data['errors']  = $errors;
			}

    }



	}

}

	echo json_encode($data);
