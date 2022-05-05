import SimplePool from "./SimplePool";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BallScript extends cc.Component {
    public static instance : BallScript
    @property(cc.Sprite)
    BallSprite: cc.Sprite = null;
    @property([cc.SpriteFrame])
    SpriteFrameList: cc.SpriteFrame[] = [];

    CurrentColorState: ColorEnum;
    // @property(cc.Graphics)
    // drawing: cc.Graphics = null;
      protected onLoad(): void {
          BallScript.instance = this;
          
      }
    protected start(): void {
      
    }
    SetState(NewState: ColorEnum) {
        this.CurrentColorState = NewState;
        // NewState = this.CurrentColorState
        this.BallSprite.spriteFrame = this.SpriteFrameList[this.CurrentColorState];
    }
    protected update(dt: number): void {
        if (this.IsShooting === true) {
            //this.node.position += this.CurrentVelocity*dt
            this.node.position = this.node.position.addSelf(this.CurrentVelocity.mul(dt));
            if (this.node.position.x > 400 || this.node.position.x < -400 || this.node.position.y < -1000 || this.node.position.y > 1000) {
                SimplePool.instance.Despawn(this.node);
            }
        }
    }
  
    IsShooting: boolean = false;
    CurrentVelocity: cc.Vec3;
    
    Shoot(velocity: cc.Vec3) {
        this.IsShooting = true;
        this.CurrentVelocity = velocity.clone();

    }
}

export enum ColorEnum {
    blue = 0,
    green = 1,
    orange = 2,
    red = 3,
    violet = 4,

}