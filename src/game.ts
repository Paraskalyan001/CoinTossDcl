//imports
import * as ui from "@dcl/ui-scene-utils";
import * as utils from "@dcl/ecs-scene-utils";
import { requirePayment } from "@decentraland/EthereumController";

//Global variables
let sum: number = 0;
var i = 0;

//Extra entity theater
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

// Main code

// adding entity table and coin with audio and animation

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
coin
  .getComponent(Animator)
  .addClip(new AnimationState("Toss", { looping: false }));
table.addComponent(
  new AudioSource(new AudioClip("sounds/coin_toss_audio.mp3"))
);

// fucntion for showing final results out of 11 tosses
function Results(sum: number) {
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
  } else {
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

// random number genrator
function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

// subtoss function calculates the resultes of a round and updates sum according to it
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
    sum++;
  } else {
    new ui.OkPrompt(
      "You Lost ",
      () => {
        log(`Wrong prediction`);
      },
      "Next",
      true
    );
  }
}

//delay function this plays audio and animations and calls for main subtoss function after a delay of 2000ms
function subTossHelper(p1: number) {
  coin.getComponent(Animator).getClip("Toss").play();
  table.getComponent(AudioSource).playOnce();
  utils.setTimeout(2000, () => {
    subToss(p1);
  });
}

// this functions adds a onpointer on table so when you click on table it does following
// updates i so we can do toss upto 11 rounds and after that a final resut will be give and calls subtoss function on basis of option selected by player
function coinToss() {
  table.addComponent(
    new OnPointerDown(
      (e) => {

        log("toss event started");

        i++;
        if (i == 12) {
          i = 0;
          Results(sum);
          return;
        }

        new ui.OptionPrompt(
          "Toss!" + i,
          "choose a side",
          () => {
            log(`picked Tails`);
            subTossHelper(0);
          },
          () => {
            log(`picked heads`);
            subTossHelper(1);
          },
          "Tails",
          "Heads"
        );
      },
      { button: ActionButton.POINTER, hoverText: "Toss" }
    )
  );
}

coinToss();

