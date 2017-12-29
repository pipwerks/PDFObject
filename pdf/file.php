<?php
//get target file via querystring
$item = !empty($_GET['item']) ? $_GET['item'] : false;

if($item != false){
	header('Content-type: application/pdf');
	header('Content-Length: ' . filesize($item . '.pdf'));
	header('Content-Disposition: inline; filename=' . basename($item . '.pdf'));
	readfile($item . '.pdf');
} else {
	echo "no file specified";
}
?>