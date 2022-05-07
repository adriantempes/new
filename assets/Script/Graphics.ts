import BallScript, { ColorEnum } from "./BallScript";
import GameManager from "./GameManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Graphics extends cc.Component {


@property(cc.Graphics)
Drawing: cc.Graphics;
isCanTouch: boolean = true;
@property(cc.Node)
TouchNode : cc.Node = null;

radius : number = 335;
diameter : number = 670;
high : number;

    start () {
        this.LineControl();
 
        
    }
 
    protected onLoad(): void {
        this.TouchNode.on(cc.Node.EventType.TOUCH_START, (event) => { 
            
    
            this.isCanTouch = true;

     
            if (!this.isCanTouch) return;
      
            
            let mouse_pos = this.node.convertToNodeSpaceAR(event.getLocation()); //toa do tro chuot
            this.high = this.radius*mouse_pos.y/mouse_pos.x;
           
            console.log(mouse_pos.x,mouse_pos.y)
            this.Drawing.clear();
            // this.Drawing.clear();
            this.Drawing.moveTo(0,0)
            if(mouse_pos.x > 0 && mouse_pos.y > 0){
            this.Drawing.lineTo(this.radius,(mouse_pos.y*this.radius/mouse_pos.x));
            this.Drawing.moveTo(this.radius,this.radius*mouse_pos.y/mouse_pos.x)
            this.Drawing.lineTo(-this.radius,this.diameter*mouse_pos.y/mouse_pos.x)
            this.Drawing.stroke();
            this.Drawing.fill();
        
            this.Drawing.moveTo(-this.radius,this.diameter*mouse_pos.y/mouse_pos.x)
            this.Drawing.lineTo(this.radius,2*this.diameter*mouse_pos.y/mouse_pos.x)
            this.Drawing.stroke();
            this.Drawing.fill();
            GameManager.instance.CurrentBall.Shoot(cc.v3(this.radius,this.high))
            
            

            
            }
            if(mouse_pos.x < 0 && mouse_pos.y > 0){
                
                this.Drawing.lineTo(-this.radius,(mouse_pos.y*this.radius/Math.abs(mouse_pos.x)));
                this.Drawing.moveTo(-this.radius,this.radius*mouse_pos.y/Math.abs(mouse_pos.x))
                this.Drawing.lineTo(this.radius,this.diameter*mouse_pos.y/Math.abs(mouse_pos.x))
                this.Drawing.stroke();
                this.Drawing.fill();
            
                this.Drawing.moveTo(this.radius,this.diameter*mouse_pos.y/Math.abs(mouse_pos.x))
                this.Drawing.lineTo(-this.radius,this.diameter*2*mouse_pos.y/Math.abs(mouse_pos.x) )
                this.Drawing.stroke();
                this.Drawing.fill();
            }
           
            
            this.Drawing.lineWidth = 6;
      

            this.Drawing.strokeColor = cc.Color.RED;
            // this.Drawing.clear();
            
            this.Drawing.stroke();
            this.Drawing.fill();
            cc.tween(GameManager.instance.CurrentBall)
            .call(()=> { BallScript.instance.Shoot(cc.v3(this.radius,this.high))})
            .start
       

        
            
        

                
         }, this);

         this.TouchNode.on(cc.Node.EventType.TOUCH_MOVE, (event) => { 
            this.isCanTouch = true;
            

     
            if (!this.isCanTouch) return;
            
            let mouse_pos = this.node.convertToNodeSpaceAR(event.getLocation()); 
            console.log(mouse_pos.x,mouse_pos.y)
            this.Drawing.clear();

            this.Drawing.moveTo(0,0)
            if(mouse_pos.x > 0 && mouse_pos.y > 0){
            this.Drawing.lineTo(this.radius,(mouse_pos.y*this.radius/mouse_pos.x));
            this.Drawing.moveTo(this.radius,this.radius*mouse_pos.y/mouse_pos.x)
            this.Drawing.lineTo(-this.radius,this.diameter*mouse_pos.y/mouse_pos.x)
            this.Drawing.stroke();
            this.Drawing.fill();
        
            this.Drawing.moveTo(-this.radius,this.diameter*mouse_pos.y/mouse_pos.x)
            this.Drawing.lineTo(this.radius,2*this.diameter*mouse_pos.y/mouse_pos.x)
            this.Drawing.stroke();
            this.Drawing.fill();
        
            }
            if(mouse_pos.x < 0 && mouse_pos.y > 0){
                
                this.Drawing.lineTo(-this.radius,(mouse_pos.y*this.radius/Math.abs(mouse_pos.x)));
                this.Drawing.moveTo(-this.radius,this.radius*mouse_pos.y/Math.abs(mouse_pos.x))
                this.Drawing.lineTo(this.radius,this.diameter*mouse_pos.y/Math.abs(mouse_pos.x))
                this.Drawing.stroke();
                this.Drawing.fill();
            
                this.Drawing.moveTo(this.radius,this.diameter*mouse_pos.y/Math.abs(mouse_pos.x))
                this.Drawing.lineTo(-this.radius,this.diameter*2*mouse_pos.y/Math.abs(mouse_pos.x) )
                this.Drawing.stroke();
                this.Drawing.fill();
                // GameManager.instance.CurrentBall.Shoot(cc.v3(-this.radius,this.high )),this.TurnRight(1)
                    
                }
            
     
            
            this.Drawing.lineWidth = 6;
      

            this.Drawing.strokeColor = cc.Color.RED;
           
            
            this.Drawing.stroke();
            this.Drawing.fill();
        

        }, this);

        this.TouchNode.on(cc.Node.EventType.TOUCH_END, (event) => { 
            this.isCanTouch = true;

     
     
            GameManager.instance.SpawnBall();


        }, this);
    }

  LineControl(){
   
  }
  TurnLeft(n:number){
    
        this.node.on('mousedown', function ( event ) {
            let mouse_pos = this.node.convertToNodeSpaceAR(event.getLocation());
            this.high = this.radius*mouse_pos.y/mouse_pos.x;
            GameManager.instance.CurrentBall.Shoot(cc.v3(this.radius,2*this.high + n*4*this.high))
            if(GameManager.instance.CurrentBall.node.position.x < -this.radius){
                this.TurnRight(1);
            console.log( " 123123" + this.high)
            }
        })
     
  }
  TurnRight(m:number){
    this.node.on('mousedown', function ( event ) {
        let mouse_pos = this.node.convertToNodeSpaceAR(event.getLocation());
        this.high = this.radius*mouse_pos.y/mouse_pos.x;
        GameManager.instance.CurrentBall.Shoot(cc.v3(-this.radius,2*this.high + m*4*this.high))
        if(GameManager.instance.CurrentBall.node.position.x < -this.radius){
            this.TurnLeft(1);
        }
    })
  }
}

