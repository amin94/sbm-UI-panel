<?php
header('Access-Control-Allow-Origin: *');
header("Content-Type: application/json; charset=UTF-8");
ob_start();
session_start();
require_once('../config.php');


function url_test( $url ) {
  $timeout = 10;
  $ch = curl_init();
  curl_setopt ( $ch, CURLOPT_URL, $url );
  curl_setopt ( $ch, CURLOPT_RETURNTRANSFER, 1 );
  curl_setopt ( $ch, CURLOPT_TIMEOUT, $timeout );
  $http_respond = curl_exec($ch);
  $http_respond = trim( strip_tags( $http_respond ) );
  $http_code = curl_getinfo( $ch, CURLINFO_HTTP_CODE );
  if ( ( $http_code == "200" ) ) {
    return true;
  } else {
    // return $http_code;, possible too
    return false;
  }
  curl_close( $ch );
}



// user check
$link = mysql_connect(DB_HOST, DB_USER, DB_PASSWORD);
if(!$link) {
  die('error ' . mysql_error());
}

$db = mysql_select_db(DB_DATABASE);
if(!$db) {
  die("error");
}

$data = json_decode($_POST["x"], true);
$reqType = $data["reqType"];

if ($reqType=="notifs") {
  $i=0;
  $data = array();
  $outp = array();
  $data = json_decode($_POST["x"], false);

  $recentActivity = array();

  $newUserID = $data->userID;
  $newIP = $data->ip;
  $newCurrentURL = $data->currentUrl;
  $checkCookie = $data->checkCookie;
  $packID = $data->packid;
  $campaignCookieCheck = $data->campaignCookieCheck;

  if ($checkCookie == "cookieSet") {
    $packDifferenceCheck = "true";
  }


  // encode current url
  // $mainUrl = implode('/', array_map('rawurlencode', explode('/', $newCurrentURL)));
  // $mainUrl = implode('/', array_map('rawurldecode', explode('/', $newCurrentURL)));

  $domain = $newCurrentURL;

  if (substr($domain, -1) !== "/") {
    $domain = $domain."/";
  }

  $qry="SELECT * FROM users WHERE sId='$newUserID'";
  $result=mysql_query($qry);

  if($result) {
    if(mysql_num_rows($result) == 1) {

    $user = mysql_fetch_assoc($result);



      // verify site connection and update last connection to sabetMikonim Service
      $intgDate = date("Y/m/d H:i:sa");
      mysql_query("UPDATE users SET intgVerify='true' WHERE sId='$newUserID'");
      mysql_query("UPDATE users SET intg_date='$intgDate' WHERE sId='$newUserID'");






      // check uniqe visitor and update package usage
        $userPackage = $user['last_package'];
        $packageQry="SELECT * FROM buy_packages WHERE sId='$newUserID' AND package_name='$userPackage' AND status='active'";
        $packageResult=mysql_query($packageQry);

        if ($packageResult) {
          if (mysql_num_rows($packageResult) == 1) {


            $packageDetail = mysql_fetch_assoc($packageResult);

            $packageDetailId = $packageDetail['id'];
            $packageDetailName = $packageDetail['package_name'];
            $packageDetailVisitor = $packageDetail['package_visitor'];
            $packageDetailVisitorUsed = $packageDetail['used'];
            $packageDetailDate = $packageDetail['date'];
            $packageDetailDateExpire = $packageDetail['package_expire'];
            $packageDetailUpgradeStatus = $packageDetail['upgrade_status'];
            $todayDate = date('Y-m-d');

            if ($packageDetail['upgrade_status']) {

              // upgrade data
              $packageDetailUpgradeDate = $packageDetail['upgrade_date'];

              $packageUpgradeDateDifference = ( strtotime(date('Y-m-d')) - strtotime($packageDetailUpgradeDate) ) / 86400;

              if ($packageUpgradeDateDifference>=3) {

                mysql_query("UPDATE users SET status='deactive',reason='upgrade' WHERE sId='$newUserID'");
                mysql_query("UPDATE buy_packages SET status='deactive' WHERE sId='$newUserID' AND package_name='$userPackage' AND status='active'");

                $upgradeExpire = true;
              } else {
                $upgradeExpire = false;
              }


            } else {
              $upgradeExpire = false;
            }



            // upgrade 3 days check
            if (!$upgradeExpire) {

              // package date check
              $packageDateDifference = ( strtotime(date('Y-m-d')) - strtotime($packageDetailDate) ) / 86400;
              if ($packageDateDifference <= $packageDetailDateExpire) {

                // we have time so now check visitor used
                if ($packageDetailVisitorUsed > $packageDetailVisitor) {


                  if ($packageDetailUpgradeStatus!='true') {

                    // change user status to updgrade mode

                    // change current to package to next and higher package
                    if ($packageDetailName=='eco') {
                      $nextPackageName = 'co';
                    } elseif ($packageDetailName=='co') {
                      $nextPackageName = 'busi';
                    } elseif ($packageDetailName=='busi') {
                      $nextPackageName = 'org';
                    }


                    // $nextPackageQry="SELECT * FROM packages WHERE package_name='$nextPackageName'";
                    // $nextPackagesResult=mysql_query($nextPackageQry);
                    //
                    // if($nextPackagesResult) {
                    //   if(mysql_num_rows($nextPackagesResult)==1) {
                    //
                    //     $nextPackageDetail = mysql_fetch_assoc($nextPackagesResult);
                    //
                    //     $nextPackageVisitor = $nextPackageDetail['package_visitor'];
                    //
                    //   }
                    //
                    // }



                    // just +250 more visitor to upgrade
                    $nextPackageVisitor = $packageDetailVisitor + 250;

                    mysql_query("UPDATE users SET status='upgrade' WHERE sId='$newUserID'");
                    mysql_query("UPDATE buy_packages SET package_visitor='$nextPackageVisitor',upgrade_status='true',upgrade_date='$todayDate' WHERE sId='$newUserID' AND package_name='$userPackage' AND status='active'");

                  } elseif ($packageDetailUpgradeStatus=='true') {

                    mysql_query("UPDATE users SET status='deactive',reason='upgrade' WHERE sId='$newUserID'");
                    mysql_query("UPDATE buy_packages SET status='deactive' WHERE sId='$newUserID' AND package_name='$userPackage' AND status='active'");

                  }

              }

                  $serviceActivity = true;




              } else {

                if ($packageDetailName == 'test') {

                  mysql_query("UPDATE users SET status='deactive',reason='test_end' WHERE sId='$newUserID'");
                  mysql_query("UPDATE buy_packages SET status='deactive' WHERE sId='$newUserID' AND package_name='$userPackage' AND status='active'");

                } else {

                  mysql_query("UPDATE users SET status='deactive',reason='date' WHERE sId='$newUserID'");
                  mysql_query("UPDATE buy_packages SET status='deactive' WHERE sId='$newUserID' AND package_name='$userPackage' AND status='active'");

                }


                $serviceActivity = false;
              }



              if ($user['status']=='test') {
                // check user 14 days test
                $testDateHour = ( strtotime(date('Y-m-d')) - strtotime($user['date']) ) / 86400;
                if ($testDateHour<=14) {

                  $serviceActivity = true;

                } else {
                  mysql_query("UPDATE users SET status='deactive',reason='test_end' WHERE sId='$newUserID'");
                  mysql_query("UPDATE buy_packages SET status='deactive' WHERE sId='$newUserID' AND package_name='$userPackage' AND status='active'");
                  $serviceActivity = false;
                }


              }

            }



          } else {
            mysql_query("UPDATE users SET status='deactive' WHERE sId='$newUserID'");
            $serviceActivity = false;

          }

        }











    if ($serviceActivity) {


      $qry="SELECT * FROM campaigns WHERE user_id='$newUserID' AND status='active' ";
      $result=mysql_query($qry);

      if($result) {

        if(mysql_num_rows($result) >= 1) {

          $campaignCounter = 0;
          while ($campaign = mysql_fetch_assoc($result)) {

            $outp[$campaignCounter]['cid'] = $campaign['cid'];

            $pageViews = $campaign['page_views'];
            $campaignVisitors = $campaign['visitors'];

            // add campaign options
            $finalCampaignOptions = json_decode($campaign['options'], true);
            $outp[$campaignCounter]['options'] = $finalCampaignOptions;

            $cidName = $outp[$campaignCounter]['cid'];


                    // check display notifs
                    $displayPages = json_decode($campaign['display_pages'], true);

                    if ($displayPages!='') {

                      $j = sizeof($displayPages);
                      for ($i=0; $i < $j ; $i++) {

                        // check display condition
                        if ($displayPages['l'.$i]['condition']=="include") {

                          if (strcasecmp(substr($domain, 0, strlen($displayPages['l'.$i]['link'])), $displayPages['l'.$i]['link']) == 0) {

                              $displayCheck = true;

                          } else {

                            $displayLinkWithoutLastSlash = rtrim($displayPages['l'.$i]['link'],"/ ");

                            if ( strcasecmp(substr($domain, 0, strlen($displayLinkWithoutLastSlash)), $displayLinkWithoutLastSlash) == 0 ) {

                                $displayCheck = true;

                            } else {

                              $displayCheck = false;

                            }

                          }

                        } elseif ($displayPages['l'.$i]['condition']=="exact") {

                          if ( strcasecmp($displayPages['l'.$i]['link'], $domain) == 0 ) {

                            $displayCheck = true;

                          } else {
                            $displayCheck = false;
                          }

                        }

                        if ($displayCheck) {


                          $nextPageViews = $pageViews + 1;
                          mysql_query("UPDATE campaigns SET page_views='$nextPageViews' WHERE user_id='$newUserID' AND cid='$cidName' AND status='active'");






                          // Add visitors in package just once
                          if ($checkCookie == "cookieNotSet") {

                            // setcookie('sbm_packID', $packageDetailId, time() + (86400 * 30), "/");
                            $outp[0]['cookiePack']['status'] = 'add';
                            $outp[0]['cookiePack']['cookie'] = $packageDetailId;


                            $packageDetailVisitorUsed = $packageDetailVisitorUsed + 1;
                            mysql_query("UPDATE buy_packages SET used='$packageDetailVisitorUsed' WHERE sId='$newUserID' AND package_name='$userPackage' AND status='active'");

                            $checkCookie = "cookieSet";
                            $packDifferenceCheck = 'false';

                          } else {

                            if ( ($packID != $packageDetailId) AND ($packDifferenceCheck != 'false') ) {


                              // setcookie('sbm_packID', $packageDetailId, time() + (86400 * 30), "/");
                              $outp[0]['cookiePack']['status'] = 'update';
                              $outp[0]['cookiePack']['cookie'] = $packageDetailId;


                              $packageDetailVisitorUsed = $packageDetailVisitorUsed + 1;
                              mysql_query("UPDATE buy_packages SET used='$packageDetailVisitorUsed' WHERE sId='$newUserID' AND package_name='$userPackage' AND status='active'");


                            }

                          }





                          // Add visitors into each campaign seprate
                          if ($campaignCookieCheck == 'cookieNotSet') {

                            $finalCIDName = $finalCIDName.$cidName.',';

                            $outp[0]['cookieCampaign']['status'] = 'add';
                            $outp[0]['cookieCampaign']['cookie'] = $finalCIDName;

                            $finalCampaignVisitors = $campaignVisitors + 1;
                            mysql_query("UPDATE campaigns SET visitors='$finalCampaignVisitors' WHERE user_id='$newUserID' AND cid='$cidName' AND status='active'");

                          } else {

                            $cookieCID = explode(',', $campaignCookieCheck);
                            $finalCIDName = $campaignCookieCheck;

                            if (!in_array($cidName, $cookieCID)) {

                              $finalCIDName = $finalCIDName.$cidName.',';

                              $outp[0]['cookieCampaign']['status'] = 'update';
                              $outp[0]['cookieCampaign']['cookie'] = $finalCIDName;

                              // setcookie('sbm_camps', $finalCIDName, time() + (86400 * 30), "/");

                              $finalCampaignVisitors = $campaignVisitors + 1;
                              mysql_query("UPDATE campaigns SET visitors='$finalCampaignVisitors' WHERE user_id='$newUserID' AND cid='$cidName' AND status='active'");

                            }

                          }





                    // recent activity check
                    if ($campaign["recent_activity"] == true) {


                      $amin="SELECT * FROM recent_activity WHERE cid='".$cidName."'";
                      $aminRes=mysql_query($amin);

                      if ($aminRes) {

                        $recentActivity = mysql_fetch_assoc($aminRes);


                        $actionQry="SELECT * FROM actions WHERE cid='$cidName' ORDER BY id DESC";
                        $actionRes=mysql_query($actionQry);

                        if ($actionRes) {

                          if (mysql_num_rows($actionRes) != 0) {


                            $actionsCounter = 0;
                            // notifications list
                            while ($actions = mysql_fetch_assoc($actionRes)) {


                                // time calculate
                                // $timeDefference = $actions['time'] - date('H');
                                $timeDifference = ( strtotime(date('m/d/Y H:i:s')) - strtotime($actions['date']) ) / 3600;


                                // last days must pass to display notifs on site
                                $timeDifferencePerDay = $recentActivity['last_conversion_day'] * 24;

                                if ($timeDifference<=$timeDifferencePerDay) {

                                  if ($actionsCounter<$recentActivity['last_conversion_number']) {

                                    $outp[$campaignCounter][$cidName]['display_status'] = true;

                                    $outp[$campaignCounter][$cidName]['recent_activity']['notifs'][$actionsCounter]['name'] = $actions['name'];
                                    $outp[$campaignCounter][$cidName]['recent_activity']['notifs'][$actionsCounter]['location'] = $actions['location'];
                                    $outp[$campaignCounter][$cidName]['recent_activity']['notifs'][$actionsCounter]['user_pic'] = $actions['user_pic'];
                                    // recent activity options
                                    $outp[$campaignCounter][$cidName]['recent_activity']['notifs'][$actionsCounter]['message'] = $recentActivity['message'];

                                    $outp[$campaignCounter][$cidName]['recent_activity']['options']['loop'] = $recentActivity['notif_loop'];

                                    $raOptions = json_decode($recentActivity['options'], true);
                                    $outp[$campaignCounter][$cidName]['recent_activity']['options']['link'] = $raOptions['notifLink'];

                                    if ($timeDifference<=24) {
                                      if (floor($timeDifference)==0) {

                                        $timeDifference = ( strtotime(date('m/d/Y H:i:s')) - strtotime($actions['date']) ) / 60;

                                        $timeText = 'دقیقه';
                                        $timeDifference = floor($timeDifference);

                                      } else {

                                        $timeText = 'ساعت';
                                        $timeDifference = floor($timeDifference);

                                      }
                                    } else {
                                      $timeDifference = floor ($timeDifference / 24);
                                      $timeText = 'روز' ;
                                    }

                                    $outp[$campaignCounter][$cidName]['recent_activity']['notifs'][$actionsCounter]['time'] = abs($timeDifference).' '.$timeText;

                                    $actionsCounter++;

                                  }



                                } else {

                                  if (!$outp[$campaignCounter][$cidName]['display_status']) {

                                    $outp[$campaignCounter][$cidName]['display_status'] = false;

                                  }

                                }




                            } // recent activity notifs while


                            // it's ok to know we must display notifications
                            break;

                          } else {
                            $outp[$campaignCounter][$cidName]['display_status'] = false;
                          }

                        } // if actionRes


                      } //result rc

                    } // $campaign["recent_activity"]


                } // if current to display?

                else {

                  $outp[$campaignCounter][$cidName]['display_status'] = false;

                }

              } // while for display pages

            } else {
              $outp[$campaignCounter][$cidName]['display_status'] = false;

            }



            // =======================
            // check capture links
            $capturePages = json_decode($campaign['capture_links'], true);

            if ($capturePages!='') {

              $m = sizeof($capturePages);
              for ($n=0; $n < $m ; $n++) {


                // check capture condition
                if ($capturePages['l'.$n]['condition']=="include") {

                  if ( strcasecmp(substr($domain, 0, strlen($capturePages['l'.$n]['link'])), $capturePages['l'.$n]['link']) == 0 ) {

                      $captureCheck = true;

                  } else {
                    $captureLinkWithoutLastSlash = rtrim($capturePages['l'.$n]['link'],"/ ");

                    if ( strcasecmp(substr($domain, 0, strlen($captureLinkWithoutLastSlash)), $captureLinkWithoutLastSlash) == 0 ) {

                        $captureCheck = true;

                    } else {

                      $captureCheck = false;

                    }

                  }

                } elseif ($capturePages['l'.$n]['condition']=="exact") {

                  if ( strcasecmp($capturePages['l'.$n]['link'], $domain) == 0 ) {

                    $captureCheck = true;

                  } else {
                    $captureCheck = false;
                  }

                }



                if ($captureCheck) {

                  $outp[$campaignCounter][$cidName]['capture_status'] = true;

                  $captureOptions = json_decode($campaign['capture_options'], true);

                  $outp[$campaignCounter][$cidName]['capture']['email_capture_id'] = $captureOptions[$capturePages['l'.$n]['link']]['email_capture_id'];
                  $outp[$campaignCounter][$cidName]['capture']['name_capture_id'] = $captureOptions[$capturePages['l'.$n]['link']]['name_capture_id'];


                  break;

                } else {

                  $outp[$campaignCounter][$cidName]['capture_status'] = false;

                }

              }

            } else {

              $outp[$campaignCounter][$cidName]['capture_status'] = false;

            }




            // check minimum notifs to display on site
            if (sizeof($outp[$campaignCounter][$cidName]['recent_activity']['notifs']) < $recentActivity['min_display'] ) {

              $outp[$campaignCounter][$cidName]['display_status'] = false;

            }

            if (($outp[$campaignCounter][$cidName]['display_status']==false) && ($outp[$campaignCounter][$cidName]['capture_status']==false) ) {

                // ****** mohasebe camaign ha dar namayesh be moshkel khord ba in kar ******


                // unset($outp[$campaignCounter][$cidName]);
                // unset($outp[$campaignCounter]['cid']);
                // unset($outp[$campaignCounter]);

            }


            $campaignCounter+=1;

          } // while for campaigns

        } //check we have campaign or no

        echo json_encode($outp);
        // echo var_dump($outp);

      } // $result check


} // service activity check



    } //first mysql_num_rows($result)
  } else {

  } // first result check

}




elseif($reqType=="submitForm") {

  $cid = $data["cid"];
  $email = $data['userEmail'];
  $name = $data['userName'];
  $date = date("Y/m/d H:i:sa");
  $ip = $data['ip'];
  $mainIpRegion = $data['ipRegion'];

  $cities = array(
                  "khorasan razavi" => "خراسان رضوی",
                  "khorasan jonubi" => "خراسان جنوبی",
                  "khorasan shomali" => "خراسان جنوبی",
                  "mazandaran" => "مازندران",
                  "hamadan" => "همدان",
                  "esfahan" => "اصفهان",
                  "fars" => "فارس",
                  "yazd" => "یزد",
                  "tehran" => "تهران",
                  "alborz" => "البرز",
                  "gilan" => "گیلان",
                  "khuzestan" => "خوزستان",
                  "qom" => "قم",
                  "lorestan" => "لرستان",
                  "ardabil" => "اردبیل",
                  "azarbayjan sharqi" => "آذربایجانی شرقی",
                  "azarbayjan gharbi" => "آذربایجانی غربی",
                  "bushehr" => "بوشهر",
                  "chahar mahaal and bakhtiari" => "چهار محال و بختیاری",
                  "golestan" => "گلستان",
                  "hormozgan" => "هرمزگان",
                  "elam" => "ایلام",
                  "kerman" => "کرمان",
                  "kermanshah" => "کرمانشاه",
                  "kohgiluyeh and boyer-ahmad" => "کهگیلویه و بویراحمد",
                  "kordestan" => "کردستان",
                  "markazi" => "مرکزی",
                  "qazvin" => "قزوین",
                  "semnan" => "سمنان",
                  "sistan and baluchestan" => "سیستان و بلوچستان",
                  "zanjan" => "زنجان",
                  "kish" => "کیش",
                );

foreach ( $cities as $city => $persianCity ) {

    if ( strcasecmp($city, $ipRegion) == 0 ) {

      $ipRegion = $persianCity;

      $outp['fcity'] = $persianCity;
      $outp['ecity'] = $city;
      $outp['ipRegion'] = $ipRegion;

      break;

    } else {

      preg_match_all('/[a-zA-Z]{3,}/', strtolower($data['ipRegion']), $pregCity);

      for ($k=0; $k < sizeof($pregCity[0]); $k++) {

        $outp['city'][$k] = $pregCity[0][$k];

        if ( strpos($city, $pregCity[0][$k]) !== false ) {

          $outp['city']['pregSize'][$k] = sizeof($pregCity[0]);

          $ipRegion = $persianCity;

          $cityCheck = 'true';

        } else {

          $ipRegion = $mainIpRegion;

          $cityCheck = 'false';

        }


      }

      if ($cityCheck == 'true') {

        break;

      }

    }

  }


  // user pic from gravatar
  $default = 'http://amins-macbook-pro.local:5757/sabetmikonimv2/assets/img/faces/face-1.jpg';
  $size = 150;

  $grav_pic = "https://www.gravatar.com/avatar/" . md5( strtolower( trim( $email ) ) ) . "?d=" . rawurlencode( $default ) . "&s=" . $size;

  if (url_test($grav_pic)) {
    $grav_pic = "https://www.gravatar.com/avatar/" . md5( strtolower( trim( $email ) ) ) . "?d=" . rawurlencode( $default ) . "&s=" . $size;
  } else {
    $grav_pic = "http://amins-macbook-pro.local:5757/sabetmikonimv2/assets/img/faces/face-1.jpg";
  }

  mysql_query("INSERT INTO actions (cid,email,name,user_pic,ip,location,date) VALUES ('$cid','$email','$name','$grav_pic','$ip','$ipRegion','$date')");

  $outp["status"] = "successfull";
  echo json_encode($outp);

}



elseif ($reqType=="campaignClick") {

  $cid = $data['cid'];

  $qry="SELECT * FROM campaigns WHERE cid='$cid'";
  $result=mysql_query($qry);

  if ($result) {

    if (mysql_num_rows($result) === 1) {

      $campaign = mysql_fetch_assoc($result);

      $currentClicks = $campaign['clicks'];

    }

  }

  $totalClicks = $currentClicks + 1;
  mysql_query("UPDATE campaigns SET clicks='$totalClicks' WHERE cid='$cid' AND status='active'");

  echo json_encode('click added.');

}



ob_end_flush();
?>
