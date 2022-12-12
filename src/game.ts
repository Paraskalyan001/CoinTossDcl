let base = new Entity()

base.addComponent(new GLTFShape("models/Theatre.glb"))
base.addComponent(new Transform({
    position: new Vector3(8,0,8),
    rotation: Quaternion.Euler(0,-90,0),
}))
engine.addEntity(base)


let table = new Entity()
table.addComponent(new GLTFShape("models/Lp_wc_As_table.glb"))
table.addComponent(new Transform({
    position: new Vector3(8,0,4),
    // rotation: Quaternion.Euler(0,0,0),
}))
table.addComponent(new Animator())
table.getComponent(Animator).addClip(new AnimationState("CylinderAction"))
table.addComponent(new AudioSource(new AudioClip("sounds/coin_toss_audio.mp3")))
table.addComponent(
    new OnClick((): void => {
        table.getComponent(Animator).getClip("CylinderAction").play();
        table.getComponent(AudioSource).playOnce();
        log("toss");
    })  
)

engine.addEntity(table)





function tossEvent(){
    const tossResults: number[] = new Array(11); 
    for (let i = 0; i < tossResults.length; i++) {
        const j = 0; // we will take j as input here using ui
        tossResults[i]  = subToss(j);
    }

    let sum:number = 0;
    for (let i = 0; i < tossResults.length; i++) {
        sum += tossResults[i];
    }

    if (sum >= 6) {
        log("win")
        return 1;
    }
    else{
        log("loss")
        return 0;
    }
}

function getRandomInt(max:number) {
    return Math.floor(Math.random() * max);
}

function subToss(p1:number) {
    let r:Number = getRandomInt(2);
    if (r == p1) {
        return 0;
    }
    else{
        return 1;
    }
}
