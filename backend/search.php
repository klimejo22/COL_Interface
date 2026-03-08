<?php
require_once "lib/db.php";
require_once "lib/logging.php";
require_once "lib/var_dump_plus.php";
require_once "lib/sql.php";

// ===== CORS =====
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// ===== Funkce pro hledání hráčů =====
function searchPlayer(string $name) {
    global $db; // pokud query() používá $db
    try {
        $stmt = $db->prepare(
            "SELECT id, name, role, rating 
             FROM players 
             WHERE name LIKE :name 
             ORDER BY rating DESC 
             LIMIT 10"
        );
        $stmt->execute([":name" => "%" . $name . "%"]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    } catch (PDOException $e) {
        logMsg("log.txt", "Search failed: " . $e->getMessage(), __FILE__);
        return false;
    }
}

// ===== Získání parametru z GET =====
$name = $_GET["name"] ?? "";

if (trim($name) === "") {
    echo json_encode([]);
    exit;
}

// ===== Volání funkce a vrácení JSON =====
$result = searchPlayer($name);

if ($result === false) {
    http_response_code(500);
    echo json_encode(["error" => "Search failed"]);
    exit;
}

echo json_encode($result);