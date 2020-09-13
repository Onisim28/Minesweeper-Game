import Begin_block from "./begin_block.js";
//import {change_width_height_event} from "./on_mouseEvent.js";

let lastTime = 0;
const WIDTH = 405;
const HEIGHT = 405;


let begin_block = new Begin_block(50, 100);
const grid = document.querySelector('.grid')

//let begin_blocks = [];

// function create_beginBlocks() {
//
//     for (let i = 0; i < 9; i++) {
//         begin_blocks[i] = [];
//         for (let j = 0; j < 9; j++) {
//
//             begin_blocks[i][j] = new Begin_block(i * 45, j * 45);
//
//         }
//     }
// }

// function ev(){
//
//     for (let i = 0; i < 9; i++)
//         for (let j = 0; j < 9; j++) {
//
//
//             begin_blocks[i][j].block.addEventListener('mouseover', () => {
//                 begin_blocks[i][j].height = 100;
//                 begin_blocks[i][j].width = 60;
//             });
//         }
// }


// function draw_beginBlocks(ctx) {
//
//     for (let i = 0; i < 9; i++)
//         for (let j = 0; j < 9; j++) {
//
//             begin_blocks[i][j].draw(ctx);
//
//         }
// }

//create_beginBlocks();
//ev();

//change_width_height_event(begin_blocks[0][0]);


function create_arena() {

    const square = document.createElement('div');
    // square.setAttribute('id', 'zaza');
    square.classList.add("block");


    square.addEventListener('mouseover', () => {
        square.style.height = '47px';
        square.style.width = '47px';

    });

    square.addEventListener('mouseout', () => {
        square.style.height = '45px';
        square.style.width = '45px';

    });

    grid.appendChild(square);


}

create_arena();


