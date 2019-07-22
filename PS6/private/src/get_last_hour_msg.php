<?php
/**
 * Filtering array of messages and returning messages sent not earlier than 1 hour ago
 * @param $msgs - message from database
 * @return bool is it was sent earlier than 1 hour ago
 */
function getLastHourMsg($msgs)
{
    date_default_timezone_set('Europe/Kiev');
    $sec_per_hour = 3600;
    $time_from = time() - $sec_per_hour;
    $msg_time = strtotime($msgs['date'] . $msgs['time']);
    return $msg_time > $time_from;
}
