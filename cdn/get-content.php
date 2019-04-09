<?php
// $url=$_GET['userurl'];
// $ch=curl_init();
// $timeout=5;
//
// curl_setopt($ch, CURLOPT_URL, $url);
// curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
// curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
//
// // Get URL content
// $lines_string=curl_exec($ch);
// // close handle to release resources
// curl_close($ch);
// //output, you can also save it locally on the server
//
// echo $lines_string;


$url=$_GET['userurl'];
$html_select = file_get_contents($url);
// echo $html_select;
echo str_replace(
   '<head>',
   '<head><base href="'.$url.'" target="_blank">',
    $html_select
);



// $preSiteContent = strstr($lines_string, '</head>');
//
// $nextSiteContent = strstr($lines_string, '</head>', true);
//
//
// $finalString = $preSiteContent.'<script src="http://amins-macbook-pro.local:5757/sabetmikonimv2/assets/js/campaignModal.js/"></script>'.$nextSiteContent;
//
// echo $finalString;


?>
