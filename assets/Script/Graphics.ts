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

    start () {
        this.LineControl();
      
        
    }
    protected onLoad(): void {
        this.TouchNode.on(cc.Node.EventType.TOUCH_START, (event) => { 
    
            this.isCanTouch = true;

     
            if (!this.isCanTouch) return;
      
            
            let mouse_pos = this.node.convertToNodeSpaceAR(event.getLocation()); //toa do tro chuot
           
            console.log(mouse_pos.x,mouse_pos.y)
            this.Drawing.clear();
            // this.Drawing.clear();
            this.Drawing.moveTo(0,200)
            this.Drawing.lineTo(mouse_pos.x,mouse_pos.y);
            
            this.Drawing.lineWidth = 6;
      

            this.Drawing.strokeColor = cc.Color.RED;
            // this.Drawing.clear();
            
            this.Drawing.stroke();
            this.Drawing.fill();
        GameManager.instance.CurrentBall.Shoot(cc.v3(mouse_pos.x,mouse_pos.y))
        if(BallScript.instance.IsShooting == true){
            GameManager.instance.SpawnBall();
        }

            
        

                
         }, this);

         this.TouchNode.on(cc.Node.EventType.TOUCH_MOVE, (event) => { 
            this.isCanTouch = true;

     
            if (!this.isCanTouch) return;
            
            let mouse_pos = this.node.convertToNodeSpaceAR(event.getLocation()); //toa do tro chuot
            console.log(mouse_pos.x,mouse_pos.y)
            this.Drawing.clear();

            this.Drawing.moveTo(0,200)
            this.Drawing.lineTo(mouse_pos.x,mouse_pos.y);
            
            this.Drawing.lineWidth = 6;
      

            this.Drawing.strokeColor = cc.Color.RED;
           
            
            this.Drawing.stroke();
            this.Drawing.fill();
        

        }, this);

        this.TouchNode.on(cc.Node.EventType.TOUCH_END, (event) => { 
            this.isCanTouch = true;

     
            if (!this.isCanTouch) return;

            let mouse_pos = this.node.convertToNodeSpaceAR(event.getLocation())
            GameManager.instance.AnotherBall.Shoot(cc.v3(mouse_pos.x,mouse_pos.y))

        }, this);
    }

  LineControl(){
        //    this.Drawing = this.node.getComponent(cc.Graphics);
    this.Drawing.lineWidth = 6;
    this.Drawing.moveTo(0, 200);
    this.Drawing.lineTo(0, 600);
    // if(GameManager.instance.AnotherBall.BallSprite.spriteFrame == ColorEnum[ColorEnum[0]] ){
    this.Drawing.strokeColor = cc.Color.RED;
    
    // if(GameManager.instance.AnotherBall == ColorEnum[ColorEnum[1]] ){
    //     this.Drawing.strokeColor = cc.Color.GREEN;
    // }
    // if(GameManager.instance.AnotherBall == ColorEnum[ColorEnum[2]] ){
    //     this.Drawing.strokeColor = cc.Color.ORANGE;
    // }
    // if(GameManager.instance.AnotherBall == ColorEnum[ColorEnum[3]] ){
    //     this.Drawing.strokeColor = cc.Color.RED;
    // }
    // if(GameManager.instance.AnotherBall == ColorEnum[ColorEnum[4]] ){
    //     this.Drawing.strokeColor = cc.Color.YELLOW;
    // }
    
    // this.Drawing.strokeColor = cc.Color.RED;
    this.Drawing.stroke();
  }
   
}
