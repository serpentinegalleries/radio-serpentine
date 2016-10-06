<?php

function getMp3StreamTitle($steam_url)
{
    $result = false;
    $icy_metaint = -1;
    $needle = 'StreamTitle=';
    $ua = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.110 Safari/537.36';
    $opts = [
            'http' => [
                'method' => 'GET',
                'header' => 'Icy-MetaData: 1',
                'user_agent' => $ua,
            ],
        ];
    $default = stream_context_set_default($opts);
 
    $stream = fopen($steam_url, 'r');
 
    if ($stream && ($meta_data = stream_get_meta_data($stream)) && isset($meta_data['wrapper_data'])) {
        foreach ($meta_data['wrapper_data'] as $header) {
            if (strpos(strtolower($header), 'icy-metaint') !== false) {
                $tmp = explode(':', $header);
                $icy_metaint = trim($tmp[1]);
                break;
            }
        }
 
        foreach ($meta_data['wrapper_data'] as $header) {
            if (strpos(strtolower($header), 'icy-name') !== false) {
                $tmp = explode(':', $header);
                $icy_name = trim($tmp[1]);
                break;
            }
        }
    }
 
    if ($icy_metaint !== -1) {
        $buffer = stream_get_contents($stream, 300, $icy_metaint);
 
        if (strpos($buffer, $needle) !== false) {
            $title = explode($needle, $buffer);
            $title = trim($title[1]);
            $result = substr($title, 1, strpos($title, ';') - 2);
        } else {
            $result = $icy_name;
        }
    }
 
    if ($stream) {
        fclose($stream);
    }
 
    if (empty($result)) {
        $result = $icy_name;
    }
 
    return $result;
}


$steamurl = $_POST["streamurl"];
echo getMp3StreamTitle($steamurl);

?>


