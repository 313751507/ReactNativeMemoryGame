<?php

// If you installed via composer, just use this code to requrie autoloader on the top of your projects.
require 'vendor/autoload.php';

// Using Medoo namespace
use Medoo\Medoo;

class HighScoreRow {
    public $player_id;
    public $score;
}

// Initialize
$database = new Medoo([
    'database_type' => 'mysql',
    'database_name' => 'memory_game',
    'server' => 'localhost',
    'username' => 'root',
    'password' => 'root'
]);

if (isset($_GET["method"]))
{
    switch ($_GET["method"]) {
        case 'submit_scores':
            {
                $sql = "INSERT INTO scores (user_game_id, score)";
                $database->insert('scores', [
                    'user_game_id' => $_GET['player_id'],
                    'score' => $_GET['score']
                ]);
                echo json_encode(array('submission' => true));
            }
            break;

        case 'fetch_high_scores':
            {

                $data = $database->query("SELECT `user_game_id` as `player_id`, SUM(`score`) as `score` FROM `scores`
                                    GROUP BY `player_id`
                                    ORDER BY `score` DESC LIMIT 10")->fetchAll(PDO::FETCH_CLASS, 'HighScoreRow');

                echo json_encode($data);
            }
            break;
    }
}

?>
