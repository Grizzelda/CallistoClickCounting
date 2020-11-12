<?php
  $dbServerName = "auth_sql";
  $dbUserName = "root";
  $dbPassword = "gR1zzly";
  $dbName = "track";
  
  $u_ID = filter_var($_GET["un"], FILTER_SANITIZE_STRING);
  $u_PASS = filter_var($_GET["up"], FILTER_SANITIZE_STRING);
  $s_sl = filter_var($_GET["sl"], FILTER_SANITIZE_STRING);
  $s_pk = $s_ID . "_". $s_PASS;
  
  $conn = new mysqli($dbServerName, $dbUserName, $dbPassword, $dbName);
  if(strlen($u_ID)>0 && strlen($u_PASS)>0){
  
    if ($mysqli->connect_errno) {
        $conn->close();
        $userNotificationString="server DEAD";
        exit();
    }	
    $queryy = 'SELECT * FROM admin_users WHERE pass="'.$u_PASS.'" AND uname="'.$u_ID.'"';
    $inform='';
    if ($result = $conn -> query($queryy)) {
        $conn->close();
        $conn = new mysqli($dbServerName, $dbUserName, $dbPassword, $dbName);
        if( ($result -> num_rows)==1){
            $queryy = 'SELECT * FROM clickCount WHERE page="' . $s_sl . '"';
            if ($result = $conn -> query($queryy)) {
                $conn->close();
                $inform='1;';
                while($row=$result->fetch_array(MYSQLI_ASSOC)){
                    $inform.=$row['comp'].','.$row['counter'].';';
                }
            }
            echo $inform;
        }else{
            echo 0;
        };
    }
  }
?> 
