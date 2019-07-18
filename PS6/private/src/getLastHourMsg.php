<?php
/**
 * Filtering history.json content and returning messages sent not earlier than 1 hour ago
 * @param $msg - message from database
 * @return bool is it was sent earlier than 1 hour ago
 */
function getLastHourMsg($msg)
{
    date_default_timezone_set('Europe/Kiev');
    $sec_per_hour = 3600;
    $time_from = time() - $sec_per_hour;
    $msg_time = strtotime($msg['date'] . $msg['time']);
    return $msg_time > $time_from;
}