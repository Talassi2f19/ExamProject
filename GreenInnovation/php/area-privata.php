<?php
session_start();
if(!isset($_SESSION['loggato']) || $_SESSION['loggato'] !== true){
    header("location: login.html");
    exit;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Area Privata</title>
    <link rel="stylesheet" href="../css/chat.css">
</head>
<body>
    <h1>Area Privata</h1>
    <?php echo $_SESSION["username"]; ?>
    <a href="logout.php">Disconetti</a>

    <div class="container">
        <header>
            <div class="c1">
                <label for="my-id">My-ID</label>
                <input disabled type="text" name="" id="my-id" class="mID" />
            </div>
            <div class="c2">
                <label for="f-id">Connection-ID</label>
                <input type="text" name="" id="f-id" class="fID">
                <button id="conn">Connect</button>
            </div>
        </header>

        <main>
        </main>

        <footer>
            <textarea id="msg"></textarea>
            <button type="button" id="send">SEND</button>
        </footer>
    </div>

    <script src="https://unpkg.com/peerjs@1.5.1/dist/peerjs.min.js"></script>
    <script defer src="../js/index.js"></script>
</body>
</html>