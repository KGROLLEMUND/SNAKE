window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;


const start = null;

const d = document.getElementById("SomeElementYouWantToAnimate");
const lastframe = 0;
const fpstime = 0;
const framecount = 0;
const fps = 60;
const  audio = document.querySelector('audio')

function step(timestamp) {
  var progress;
  if (start === null) start = timestamp;
  progress = timestamp - start;
  d.style.left = Math.min(progress/10, 200) + "px";
  if (progress < 2000) {
    requestAnimationFrame(step);
  }
}

requestAnimationFrame(step);


window.onload = function(){
    const canvasWidth = 1600;
    const canvasHeight = 800;
    const blockSize = 30;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const widthInBlocks = canvasWidth/blockSize;
    const heightInBlocks = canvasHeight/blockSize; 
    const centreX = canvasWidth / 2;
    const centreY = canvasHeight / 2;
    const  start = document.querySelector('.start')
    const menu = document.getElementById("menu")
    const initialized = false;
    
   
    
    const eatAudio = new Audio()
        eatAudio.src = 'audio/eat.mp3'
    
    const deadAudio = new Audio()
        deadAudio.src = 'audio/dead.mp3'
    
    const backgroundGameover = new Image()
        backgroundGameover.src = 'asset/akatsuki.png'
    
       const background = new Image()
        background.src = 'asset/mapsnakecoding.png'
    const snakeeImg= new Image()
        snakeeImg.src = 'asset/serpent.png'; 

        const backgroundMenu = new Image()
        backgroundMenu.src = 'asset/melvin-uchiwa.png'
    
    
    let delay;
    let snakee ;
   
    let food;
    
    const foodImg = new Image()
    foodImg.src = 'asset/smile.png'; 

    //const narutoImg  = new Image()
   // narutoImg.src = 'asset/narutokyubimode.gif'; 

    let score;
    let timeOut;
    let up = new Audio();
    let right = new Audio();
    let left = new Audio();
    let down = new Audio();


  
    
    up.src =    "audio/5.mp3";
    right.src = "audio/2.mp3";
    left.src = "audio/3.mp3";
    down.src = "audio/1.mp3";
    
    init();
    start.innerText = 'Start Fight!'
  
  
    function Gamepause() {

        document.onkeypress = (e) => {
            if (e.code == "Enter") alert("pause")
        };

        ctx.save();
        ctx.font = "bold 70px sans-serif";
        ctx.fillStyle = "#000";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.strokeStyle = "white";
        ctx.lineWidth = 5;

        ctx.strokeText("Game Over", centreX, centreY - 360);
        ctx.fillText("Game Over", centreX, centreY - 360);
        ctx.font = "'Lucida Console', Monaco, monospace";
        ctx.strokeText("Appuyer sur la touche Espace pour rejouer", centreX, centreY - 280);
        ctx.fillText("Appuyer sur la touche Espace pour rejouer", centreX, centreY - 280);
        ctx.strokeText("Vous êtes nul", centreX, centreY + 90);
        ctx.fillText("Vous êtes nul", centreX, centreY + 90);
        backgroundAudio()
        ctx.drawImage(backgroundMenu, 0, 0);
        ctx.restore();






    }

  function backgroundAudio() {
   audio.src = 'audio/naruto-sad.wav'
   audio.play()
  }



  function gameOverAudio() {
    audio.src = 'audio/Akatsuki Theme song.mp3'
    audio.play()
  }



/*
    function loadImages(imagefiles) {
        // Initialize variables
        loadcount = 0;
        loadtotal = imagefiles.length;
        preloaded = false;
        
        // Load the images
        var loadedimages = [];
        for (var i=0; i<imagefiles.length; i++) {
            // Create the image object
            var image = new Image();
            
            // Add onload event handler
            image.onload = function () {
                loadcount++;
                if (loadcount == loadtotal) {
                    // Done loading
                    preloaded = true;
                }
            };
            
            // Set the source url of the image
            image.src = imagefiles[i];
            
            // Save to the image array
            loadedimages[i] = image;
        }
        
        // Return an array of images
        return loadedimages;
    }
    

*/

    function init(){
       
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        canvas.style.border = "30px solid green";
        canvas.style.margin = "50px auto";
        canvas.style.display = "block";
        canvas.style.backgroundColor = "#ddd";
        document.body.appendChild(canvas);
        launch();
        Gamepause();
        
    }

    function launch(){
        
        
        start.innerText = 'Start Fight!'
        snakee = new Snake([[6,4],[5,4],[4,4],[3,4],[2,4]],"right");
        food = new Apple([10,10]);
        
        score = 0;
        clearTimeout(timeOut);
        delay = 100;
        refreshCanvas();
       
        
    }
    
    function refreshCanvas(){
        
        ctx.drawImage(backgroundGameover,0,0); // Quand il y a game over l'arrière plan apparait
      
        snakee.advance();
        
        if (snakee.checkCollision()){
            gameOver();
            deadAudio.play()
            
            
        } else {
            if (snakee.isEatingApple(food)){
                score++;
                snakee.ateApple = true;
                eatAudio.play() 
                do {

                    
                    food.setNewPosition(); 
                    
                } while(food.isOnSnake(snakee));
                
                if(score % 5 == 0){
                    speedUp();
                }
            }
            ctx.clearRect(0,0,canvasWidth,canvasHeight);
            drawScore();
            snakee.draw();
            food.draw();
            
            
            timeOut = setTimeout(refreshCanvas,delay);
         }
    }
    
    function speedUp(){
        delay /= 2;
    }
    
    function gameOver(){
        ctx.save();
        ctx.font = "bold 70px sans-serif";
        ctx.fillStyle = "#000";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.strokeStyle = "white";
        ctx.lineWidth = 5;

        ctx.strokeText("Game Over", centreX, centreY - 360);
        ctx.fillText("Game Over", centreX, centreY - 360);
        ctx.font = "'Lucida Console', Monaco, monospace";
        ctx.strokeText("Appuyer sur la touche Espace pour rejouer", centreX, centreY - 280);
        ctx.fillText("Appuyer sur la touche Espace pour rejouer", centreX, centreY - 280);
        ctx.strokeText("Vous êtes nul", centreX, centreY + 90);
        ctx.fillText("Vous êtes nul", centreX, centreY + 90);
        gameOverAudio()
        ctx.restore();
        
    }
    
    
    
    function drawScore(){
        ctx.drawImage(background,0,0);  // C'est ici qu'apparait l'arrière plan 
        ctx.save(); 
        ctx.font = "bold 200px sans-serif";
        ctx.fillStyle = "gray";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        
        ctx.fillText(score.toString(), centreX, centreY);
        ctx.restore();
        
    }
    
    function drawBlock(ctx, position){
        
        const x = position[0]*blockSize;
        const y = position[1]*blockSize;
        ctx.fillRect(x,y,blockSize,blockSize);
    }
    
    function Snake(body, direction){
        
        this.body = body;
        this.direction = direction;
        this.ateApple = false;
        
        
        this.draw = function(){
            
            ctx.save();
            ctx.fillStyle="#5F9EA0";
            for (let i=0 ; i < this.body.length ; i++){
                drawBlock(ctx,this.body[i]);
            }
            ctx.restore();
        };
        
        this.advance = function(){
            const head = this.body[0];
            const nextPosition = this.body[0].slice();
            switch(this.direction){
                case "left":
                    nextPosition[0] -= 1;
                    if (head[0]== -1) {
                        nextPosition[0]=53;
                    }
                    break;
                case "right":
                    nextPosition[0] += 1;
                    if (head[0] == 53){
                        nextPosition[0]=0;
                    }

                    break;
                case "down":
                  nextPosition[1] += 1;
                    if (head[1]== 26) {
                        nextPosition[1]=-1;
                   }
                    break;
                case "up":

                    nextPosition[1] -= 1;
                   if (head[1]== -1) {
                       nextPosition[1] =26
                   }
                    break;
                default:
                    throw("invalid direction");

             
            }
            this.body.unshift(nextPosition);
            if (!this.ateApple)
                this.body.pop();
            else
                this.ateApple = false;
        };
        
        this.setDirection = function(newDirection){
            let allowedDirections;
            switch(this.direction){
                case "left":
                    left.play();
                case "right":
                    right.play();
                    allowedDirections=["up","down"];
                    break;
                case "down":
                    down.play();
                case "up":
                    up.play();
                    allowedDirections=["left","right"];
                    break;  
               default:
                    throw("invalid direction");
            }
            if (allowedDirections.indexOf(newDirection) > -1){
                this.direction = newDirection;
            }
        };
        
        //this.wall = function() {
            
        //    let snakeX = head[0];
        //    let snakeY = head[1];
        //    const minX = 0;
        //    const minY = 0;
        //    const isNotBetweenHorizontalWalls = snakeX < minX || snakeX > maxX;
        //    const isNotBetweenVerticalWalls = snakeY < minY || snakeY > maxY;
        //    const nextPosition = this.body[0].slice();

        //    snakee = new Snake([[4,snakeY],[3,snakeY],[2,snakeY],[1,snakeY],[0,snakeY]],"right");

            



        //}
       

        this.checkCollision = function(){
           // let wallCollision = false;
            let snakeCollision = false;
            const head = this.body[0];
            const rest = this.body.slice(1);
            let snakeX = head[0];
            let snakeY = head[1];
            const minX = 0;
            const minY = 0;
            const maxX = widthInBlocks - 1;
            const maxY = heightInBlocks - 1;
            const isNotBetweenHorizontalWalls = snakeX < minX || snakeX > maxX;
            const isNotBetweenVerticalWalls = snakeY < minY || snakeY > maxY;
            
            
          //if (isNotBetweenHorizontalWalls || isNotBetweenVerticalWalls)
           // wallCollision = true;
                
            
            
               // console.log('snakeX'+ snakeX); 
              //  console.log('head0 '+ head[0]);    
              //  console.log('snakeY'+ snakeY); 
               // console.log('head1 '+ head[1]);      
            
            for (let i=0 ; i<rest.length ; i++){
                if (snakeX === rest[i][0] && snakeY === rest[i][1])
                    snakeCollision = true;
            }
            
            // return  wallCollision || snakeCollision; 
            return snakeCollision;       
        };
        
        this.isEatingApple = function(appleToEat){
            const head = this.body[0];
            if (head[0] === appleToEat.position[0] && head[1] === appleToEat.position[1])
                return true;
            else
                return false;
        }
        
    }
    
    function Apple(position){
        
        
     
        this.position = position;
        
        this.draw = function(){
       // const newX = Math.round(Math.random()*(widthInBlocks-1));
        //const newY = Math.round(Math.random()*(heightInBlocks-1)); 
         //ctx.drawImage(foodImg,newX, newY)
         
        //ctx.drawImage(narutoImg, newx, newy);

        const radius = blockSize/2;
        const x = this.position[0]*blockSize + radius;
        const y = this.position[1]*blockSize + radius; 
        ctx.drawImage(foodImg, x, y);
        ctx.drawImage(foodImg,radius, 0);
        ctx.drawImage(foodImg,Math.PI*2, true);
         
          ctx.save(); 
          ctx.fillStyle = "#FF0000";
          ctx.beginPath();
          
          //void ctx.drawImage(foodImg, x, y, radius,0,Math.PI*2, true);
          
          ctx.arc(x, y, radius, 0, Math.PI*2, true);
          ctx.fill();
          ctx.restore();
        };
         
        this.setNewPosition = function(){
            
            const newX = Math.round(Math.random()*(widthInBlocks-1));
            const newY = Math.round(Math.random()*(heightInBlocks-1));
            
            this.position = [newX,newY];
             
            
        }; 
        
        this.isOnSnake = function(snakeToCheck){
            
            let isOnSnake = false;
            for (let i=0 ; i < snakeToCheck.body.length ; i++){
                if(this.position[0] === snakeToCheck.body[i][0] && this.position[1] === snakeToCheck.body[i][1]){
                    isOnSnake = true;     
                }
            }
            return isOnSnake;
        };

    }
    
    document.onkeydown = function handleKeyDown(e){
        
        const key = e.keyCode;
        let newDirection;
        switch(key){
            case 37:
                newDirection = "left";
                break;
            case 38:
                newDirection = "up";
                break;
            case 39:
                newDirection = "right";
                break;
            case 40:
                newDirection = "down";
                break;
            case 13:
                Gamepause();
                return;
            case 32:
                launch();
                return;
            default:
                return;
        }
        
        snakee.setDirection(newDirection);
        
    };
    
}


