// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class SimplePool
{
    private dictPool: {[name: string]: cc.NodePool} = {}
    private dictPrefab: {[name: string]: cc.Prefab} = {}
    private static Instance: SimplePool;

    public static get instance()
    {
        if (this.Instance)
        {
            return this.Instance;
        }

        this.Instance = new SimplePool();
        return this.Instance;
    }

    public Spawn(prefab: cc.Prefab, parent: cc.Node)
    {
        let name = prefab.data.name;
        this.dictPrefab[name] = prefab;
        let node: cc.Node;
        if (this.dictPool.hasOwnProperty(name))
        {
            //已有对应的对象池
            let pool = this.dictPool[name];
            if (pool.size() > 0)
            {
                node = pool.get()!;
            }
            else
            {
                node = cc.instantiate(prefab);
            }
        } else
        {
            //没有对应对象池，创建他！
            let pool = new cc.NodePool();
            this.dictPool[name] = pool;

            node = cc.instantiate(prefab);

        }
        parent.addChild(node);
        return node;
    }

    public Despawn(node: cc.Node)
    {
        let name = node.name;
        let pool = null;
        if (this.dictPool.hasOwnProperty(name))
        {
            //已有对应的对象池
            pool = this.dictPool[name];
        } else
        {
            //没有对应对象池，创建他！
            pool = new cc.NodePool();
            this.dictPool[name] = pool;
        }
        pool.put(node);
    }

    public ClearPool(name: string)
    {
        if (this.dictPool.hasOwnProperty(name))
        {
            let pool = this.dictPool[name];
            pool.clear();
        }
    }
}