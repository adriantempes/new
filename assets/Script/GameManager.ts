import BallScript, { ColorEnum } from "./BallScript";
import SimplePool from "./SimplePool";


const { ccclass, property } = cc._decorator;

@ccclass
export default class GameManager extends cc.Component {
    @property(cc.Prefab)
    BallPrefab: cc.Prefab = null;
    TestBallList: BallScript[] = [];
    CurrentBall: BallScript;
    AnotherBall: BallScript;
    

    public static instance : GameManager
    protected onLoad(): void {
        GameManager.instance = this;
    }
    protected start(): void {
        let self = this;
        // this.schedule(function() {
            // Here this refers to component
            self.SpawnBall();
            // self.SpawnAtLine();
        // }, 3);
    }
   SpawnBall(){
    this.CurrentBall = SimplePool.instance.Spawn(this.BallPrefab,this.node).getComponent(BallScript);
           
    this.TestBallList.push(this.CurrentBall);
    // this.CurrentBall.node.position = cc.v3(-200+400*Math.random(),-300 + 600*Math.random());
    this.CurrentBall.node.position = cc.v3(-5,-390)
    // this.CurrentBall.Shoot(cc.v3(-200+400*Math.random(),-300 + 600*Math.random()));
    this.CurrentBall.SetState(this.RandomColor());

   }
   SpawnAtLine(){

    this.AnotherBall  = SimplePool.instance.Spawn(this.BallPrefab,this.node).getComponent(BallScript);
    this.TestBallList.push(this.AnotherBall);
    this.AnotherBall.node.position = cc.v3(0,-200);
    this.AnotherBall.SetState(this.RandomColor());
    
   }
    RandomColor(): ColorEnum {
        var randomNumber: number = Math.floor(Math.random() * 5);
        return ColorEnum[ColorEnum[randomNumber]];
    }
}
