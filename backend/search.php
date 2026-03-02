<?php
require_once "lib/db.php";
require_once "lib/logging.php";
require_once "lib/var_dump_plus.php";
require_once "lib/sql.php";


header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}
function searchPlayer(string $name) {
    try {
        $out = query(
            "SELECT id, name, role, rating 
             FROM players 
             WHERE name LIKE :name 
             ORDER BY rating DESC 
             LIMIT 10",
            [":name" => "%" . $name . "%"]
        );
    } catch (PDOException) {
        return false;
    }

    if ($out instanceof PDOException) {
        return false;
    }

    return $out->fetchAll(PDO::FETCH_ASSOC);
}

$name = $_GET["name"] ?? "";

if (trim($name) === "") {
    echo json_encode([]);
    exit;
}

$result = searchPlayer($name);

if ($result === false) {
    http_response_code(500);
    echo json_encode(["error" => "Search failed"]);
    exit;
}

echo json_encode($result);