<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="chat.css">
</head>

<body>

    <section class="main">
        <div class="chats">
            <div class='add'>
                <div class="input">
                    <input placeholder="type user id" id="addid">
                    <button id='add' class="addsubmit">add</button>
                </div>
            </div>
            <div class="head">
                <!--     
                <span class="name">mayhem mayhew</span><br>
                <span class="lastmsg">hey guys <span class="date"></span></span>
                -->
            </div>
        </div>
        <div class="current">
            <div class="history">
                <!-- 
                <div class="received"> i received</div>
                <div class="sent"> i sent</div>
                -->
            </div>
            <div class="input">
                <textarea class="area" type="text"></textarea>
                <button class="send">send</button>
            </div>
        </div>
    </section>
    <script src="./chat.js"></script>
</body>

</html>