import * as ui from "@dcl/ui-scene-utils";

let base = new Entity();

base.addComponent(new GLTFShape("models/Theatre.glb"));
base.addComponent(
  new Transform({
    position: new Vector3(8, 0, 8),
    rotation: Quaternion.Euler(0, -90, 0),
  })
);
engine.addEntity(base);



//-------------------------------------

let table = new Entity();
let coin = new Entity();

engine.addEntity(table);
engine.addEntity(coin);

coin.addComponent(new GLTFShape("models/coin_withTossAnim.glb"));
table.addComponent(new GLTFShape("models/Lp_wc_As_table.glb"));

coin.addComponent(
  new Transform({
    position: new Vector3(8, 0, 4),
    // rotation: Quaternion.Euler(0,0,0),
  })
);
table.addComponent(
  new Transform({
    position: new Vector3(8, 0, 4),
    // rotation: Quaternion.Euler(0,0,0),
  })
);
coin.addComponent(new Animator());
coin.getComponent(Animator).addClip(new AnimationState("Toss", { looping: false }));
table.addComponent(
  new AudioSource(new AudioClip("sounds/coin_toss_audio.mp3"))
);
// 

function Results(sum:number){
      if (sum >= 6) {
        log("win");
        new ui.OkPrompt(
          "Final Results : WON",
          () => {
            log(`store data here`);
          },
          "Next",
          true
        );
        // return 1;
      } 
      else {
        log("loss");
        new ui.OkPrompt(
          "Final Results : LOST",
          () => {
            log(`store data here`);
          },
          "Next",
          true
        );
        // return 0;
      }
    }

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

function subToss(p1: number) {
  let r: Number = getRandomInt(2);
  if (r == p1) {
    new ui.OkPrompt(
      "You won ",
      () => {
        log(`Correct prediction`);
      },
      "Next",
      true
    );
    return 0;
  } else {
    new ui.OkPrompt(
      "You Lost ",
      () => {
        log(`Wrong prediction`);
      },
      "Next",
      true
    );
    return 1;
  }
}

// engine.addSystem(tossEvent)

let sum: number = 0;
var i=0;

coinToss()

function coinToss(){
    table.addComponent(
        new OnPointerDown(
            (e) => {
              log("toss event started");
              let j: number = 0;
                new ui.OptionPrompt(
                  "Toss!" + i,
                  "choose a side",
                  () => {
                    log(`picked Tails`);
                    log(i)
                    j = 0;
                    i++;
                    sum += subToss(j);
                    if (i==11) {
                      i=0;
                      Results(sum)
                    }
                  },
                  () => {
                    log(`picked heads`);
                    log(i)
                    j = 1;
                    i++;
                    sum += subToss(j);
                    if (i==11) {
                      i=0;
                      Results(sum)
                    }
                  },
                  "Tails",
                  "Heads"
                  );
                  coin.getComponent(Animator).getClip("Toss").play();
                  table.getComponent(AudioSource).playOnce();
            },
            { button: ActionButton.POINTER, hoverText: "Toss" }
          )

    )
}