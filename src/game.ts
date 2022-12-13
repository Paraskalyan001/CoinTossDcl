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

//----------------------------------

let cylinder = new CylinderShape();

let wheel1 = new Entity();
wheel1.addComponent(cylinder);
wheel1.addComponent(
  new Transform({
    position: new Vector3(6, 2, 11.9),
    rotation: Quaternion.Euler(90, 0, 0),
    scale: new Vector3(1, 0.05, 1),
  })
);

engine.addEntity(wheel1);

let wheel2 = new Entity();
wheel2.addComponent(cylinder);
wheel2.addComponent(
  new Transform({
    position: new Vector3(10, 2, 11.9),
    rotation: Quaternion.Euler(90, 0, 0),
    scale: new Vector3(1, 0.05, 1),
  })
);

engine.addEntity(wheel2);

let mymaterial = new Material();
mymaterial.albedoTexture = new Texture("materials/hypno-wheel.png");

wheel1.addComponent(mymaterial);
wheel2.addComponent(mymaterial);

wheel1.addComponent(
  new OnPointerDown(
    (e) => {
      log("wiii");
      new ui.OptionPrompt(
        "Pick an option!",
        "What will you choose?",
        () => {
          log(`picked option A`);
        },
        () => {
          log(`picked option B`);
        },
        "Pick A",
        "Pick B"
      );
    },
    { button: ActionButton.POINTER, hoverText: "spin" }
  )
);

wheel2.addComponent(
  new OnPointerDown(
    (e) => {
      new ui.OptionPrompt(
        "Pick an option!",
        "What will you choose?",
        () => {
          log(`picked option A`);
        },
        () => {
          log(`picked option B`);
        },
        "Pick A",
        "Pick B"
      );
      log("wiii");
    },
    { button: ActionButton.POINTER, hoverText: "spin" }
  )
);

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
coin
  .getComponent(Animator)
  .addClip(new AnimationState("Toss", { looping: false }));
table.addComponent(
  new AudioSource(new AudioClip("sounds/coin_toss_audio.mp3"))
);
table.addComponent(
  new OnPointerDown(
    (e) => {
      log("toss event started");
      let sum: number = 0;
      let j: number = 0;
      for (let i = 0; i < 11; i++) {
        new ui.OptionPrompt(
          "Toss!",
          "choose a side",
          () => {
            log(`picked Tails`);
            //   j = 0;
          },
          () => {
            log(`picked heads`);
            //   j = 1;
          },
          "Tails",
          "Heads"
        );
        coin.getComponent(Animator).getClip("Toss").play();
        table.getComponent(AudioSource).playOnce();
        sum += subToss(j);
      }

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
    },
    { button: ActionButton.POINTER, hoverText: "Toss" }
  )
);


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
