var isplaying = false;
var score = 0;
var lifeline = 3;
var fruits = ["/images/apple.png", "/images/banana.png", "/images/cherries.png", "/images/grapes.png", 
                "/images/mango.png", "/images/orange.png", "/images/peach.png", "/images/watermelon.png"];

$("document").ready(
    function()
    {        
        $("#startgame").click(function(){

            if(isplaying)
            {
                location.reload();
            }
            else{
                isplaying = true;
                score = 0;
                lifeline = 3;

                $("#gameover").css("display", "none");

                //change the startgame button
                $("#startgame").html("Reset Game");

                //reset the lifeline
                document.getElementById("lifeline").style.visibility = "visible";
                var hearts = document.getElementsByClassName("heart");
                for(var i=0;i<hearts.length;i++)
                    hearts[i].style.visibility = "visible";

                //reset the scoreboard
                $("#scorevalue").html(score);

                //playgame
                playgame();
                
            }
            
        });

        $("#fruitimg").mouseover(function(){

            clearInterval(movefruit);
            $("#fruitimg").hide(500);
            score++;
            $("#scorevalue").html(score);
            $("#soundeffect")[0].play();
            
            setTimeout(playgame, 500);
        });
    }
);

var lastverticalpos;
function playgame()
{
    var fruitindex = Math.floor(Math.random()*fruits.length);
    var chosenfruit = fruits[fruitindex];

    var horizontalpixel = Math.floor(Math.random()*550);
    var verticalpixel_start = -100;
    var verticalpixel_end = 400;

    $("#fruitimg").attr('src', chosenfruit);

    step = 1 + Math.round(Math.random()*5);
    lastverticalpos = verticalpixel_start;
    movefruit = setInterval(function(){

        $("#fruitimg").show();
        if(lastverticalpos>verticalpixel_end)
        {
            decreaselifeline();
        }
        else{
            lastverticalpos += step;
            $("#fruitimg").css("left", horizontalpixel);
            $("#fruitimg").css("top", lastverticalpos);
        }
        
    }, 10);
}

function decreaselifeline()
{
    lifeline--;
    var hearts = document.getElementsByClassName("heart");
    hearts[lifeline].style.visibility = "hidden";
    clearInterval(movefruit);
    if(lifeline==0)
    {
        gameover();
    }
    else{
        playgame();
    }
}

function gameover()
{
    $("#lifeline").css("visibility", "hidden");
    $("#finalscore").html(score);
    $("#gameover").css("display", "block");
    $("#startgame").html("Start Game");
    isplaying = false;
}