<?php
// discord_webhook.php

header("Content-Type: application/javascript");

$webhookUrl = 'https://discordapp.com/api/webhooks/1186593880636932179/wCQEzm13zb4yIEuU90GHLZrcn2CIjMQlyZ1_2JEE6HLJg2-geo4TtLoeluUJPnCVuL6i';
$mensaje = '¡Se ha realizado un avance en la página web!';

$options = [
    'http' => [
        'header'  => 'Content-type: application/json',
        'method'  => 'POST',
        'content' => json_encode(['content' => $mensaje]),
    ],
];

$context  = stream_context_create($options);
$result = file_get_contents($webhookUrl, false, $context);

if ($result === false) {
    echo 'callback({"status": "error", "message": "Error al enviar el mensaje a Discord"});';
} else {
    echo 'callback({"status": "success", "message": "Mensaje enviado a Discord con éxito"});';
}
?>
