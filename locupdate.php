<?php
require_once('config.php');
ob_start();
session_start();


$cities = array("Khorasan-e Razavi" => " خراسان رضوی ",
                "Mazandaran" => " مازندران ",
                "Hamadan" => " همدان ",
                "Esfahan" => " اصفهان ",
                "Fars" => " فارس ",
                "Yazd" => " یزد ",
                "Tehran" => " تهران ",
                "Alborz" => " البرز ",
                "Khorasan-e Jonubi" => " خراسان جنوبی ",
                "Gilan" => " گیلان ",
                "Khuzestan" => " خوزستان ",
              );


              foreach ( $cities as $city => $persianCity )
                {

                  if ($actions['location'] == $city) {

                    $actions['location'] = $persianCity;

                  }

                }


$con=mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE);
// Check connection
if (mysqli_connect_errno())
  {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }

$sql= "SELECT location FROM actions" ;

if ($result=mysqli_query($con,$sql))
  {
  // Fetch one and one row
  while ($actionDetail=mysqli_fetch_row($result))
    {

      echo $actionDetail['location'].' ';

    }
  // Free result set
  mysqli_free_result($result);
}

mysqli_close($con);



echo $errors['errorText'];


 ?>
