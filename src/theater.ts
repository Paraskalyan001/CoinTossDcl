
// let cylinder = new CylinderShape()

// let wheel1 = new Entity()
// wheel1.addComponent(cylinder)
// wheel1.addComponent(new Transform({
//     position: new Vector3(6,2,11.9),
//     rotation: Quaternion.Euler(90,0,0),
//     scale: new Vector3(1,0.05,1)
// }))

// engine.addEntity(wheel1)

// let wheel2 = new Entity()
// wheel2.addComponent(cylinder)
// wheel2.addComponent(new Transform({
//     position: new Vector3(10,2,11.9),
//     rotation: Quaternion.Euler(90,0,0),
//     scale: new Vector3(1,0.05,1)
// }))

// engine.addEntity(wheel2)

// let mymaterial = new Material()
// mymaterial.albedoTexture = new Texture("materials/hypno-wheel.png")

// wheel1.addComponent(mymaterial)
// wheel2.addComponent(mymaterial)

// wheel1.addComponent(
//     new OnPointerDown(
//         (e) => {
//             log("wiii")
//         },
//         {button: ActionButton.POINTER, hoverText:"spin"}
//     )
// )

// wheel2.addComponent(
//     new OnPointerDown(
//         (e) => {
//             log("wiii")
//         },
//         {button: ActionButton.POINTER, hoverText:"spin"}
//     )
// )

// class RotatorSystem implements ISystem{
//     update(){
//         let transform = wheel1.getComponent(Transform)
        
//     }
// }



//==========================================================




// function tossEvent(){
//     let sum:number = 0;
//     let j:number = 0;
//     for (let i = 0; i < 11; i++) {
//         new ui.OptionPrompt(
//             'Toss!',
//             'choose a side',
//             () => {
//               log(`picked Tails`)
//             //   j = 0;
//             },
//             () => {
//               log(`picked heads`)
//             //   j = 1;
//             },
//             'Tails',
//             'Heads'
//         )
//         coin.getComponent(Animator).getClip("Toss").play();
//         table.getComponent(AudioSource).playOnce();
//         sum += subToss(j);
//     }

//     if (sum >= 6) {
//         log("win")
//         new ui.OkPrompt(
//             'Final Results : WON',
//             () => {
//               log(`store data here`)
//             },
//             'Next',
//             true
//         )
//         // return 1;
//     }
//     else{
//         log("loss")
//         new ui.OkPrompt(
//             'Final Results : LOST',
//             () => {
//               log(`store data here`)
//             },
//             'Next',
//             true
//         )
//         // return 0;
//     }
// }

//========================================


// table.addComponent(
    //   new OnPointerDown(
    //     (e) => {
    //       log("toss event started");
    //       let sum: number = 0;
    //       let j: number = 0;
    //       for (let i = 0; i < 11; i++) {
    //         new ui.OptionPrompt(
    //           "Toss!",
    //           "choose a side",
    //           () => {
    //             log(`picked Tails`);
    //               j = 0;
    //             sum += subToss(j);
    //           },
    //           () => {
    //             log(`picked heads`);
    //               j = 1;
    //             sum += subToss(j);
    //           },
    //           "Tails",
    //           "Heads"
    //           );
    //           coin.getComponent(Animator).getClip("Toss").play();
    //           table.getComponent(AudioSource).playOnce();
    //       }
    //     },
    //     { button: ActionButton.POINTER, hoverText: "Toss" }
    //   )
    // );