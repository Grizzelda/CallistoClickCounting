<?php
  $dbServerName = "auth_sql";
  $dbUserName = "root";
  $dbPassword = "gR1zzly";
  $dbName = "track";
  
  $s_page = filter_var($_GET["pagename"], FILTER_SANITIZE_STRING);
  $s_comp = filter_var($_GET["elmnId"], FILTER_SANITIZE_STRING);
  
  $s_pk = $s_page . "_". $s_comp;
  // (pk varchar(160) NOT NULL, page varchar(80) NOT NULL, comp varchar(80) NOT NULL ,counter int, PRIMARY KEY(pk));
  if(strlen($s_comp)>0 && strlen($s_page)>0){
    $conn = new mysqli($dbServerName, $dbUserName, $dbPassword, $dbName);
    if ($mysqli->connect_errno) {
      $conn->close();
      exit();
    }	 
    $queryy = 'INSERT INTO clickCount (pk, page, comp, counter) VALUES ("'.$s_pk.'", "'.$s_page.'", "'.$s_comp.'", 1) ON DUPLICATE KEY UPDATE counter=counter+1';
    if ($result = $conn -> query($queryy)) {
      $conn->close();
      echo 1;
    }else
      echo 0;
  }else
  echo 0;
?> 
