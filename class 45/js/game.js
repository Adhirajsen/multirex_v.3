class game{
    constructor(){
    }
    getState(){
       var gameStateRef= database.ref('gamestate');
       gameStateRef.on("value",function(data){
           gameState = data.val();
       });
    }
    update(state){
        database.ref('/').update({gameState:state});
    }
  async start(){
      if (gameState===0){
          player=new player();
          var playerCountRef= await database.ref('playerCount').once("value");
          if (playerCountRef.exists()){
              playerCount = playerCountRef.val();
              player.getCount();
          }
          form = new form();
          form.display();
       }
    } 
    
    
 play(){
    form.hide();
    player.getPlayerInfo();
    player.getTrexAtEnd();
    
    if(allPlayers!=undefined){
        background(rgb(198,135,103));
        image(groundimage,0-displayHeight*4,displayWidth,displayHeight*5);
        var index=0;
        var x=175;
        for(var plr in allPlayers){
            index=index+1;
            x=x+200;
            y=displayheight-allPlayers[plr].distance;
            trexes[index-1].x=x;
            trexes[index-1].y=y;
            if(index===player.index){
                stroke(10);
                fill("red");
                ellipse(x,y,60,60);
                trexes[index-1].shapeColor="red";
                camera.position.x=displayWidth/2;
                camera.position.y=trexes[index-1].y;
            }//if ending
        }//for ending
    }//if all players  
    if(player.distance>3860){
        gameState=2;
        player.rank+=1;
        player.updateTrexAtEnd(player.rank);
    }
    drawSprites();
  }//play ending

  end(){
      console.log("ended");
      console.log(player.rank);
  }
  
}//class ending