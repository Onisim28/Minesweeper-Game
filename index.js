//import {change_width_height_event} from "./on_mouseEvent.js";

let lastTime = 0;
const WIDTH = 405;
const HEIGHT = 405;


const grid = document.querySelector('.grid')

let begin_blocks = Array(81).fill('standard_block');



function create_arena() {


    for (let i = 0; i < 81; i++) {

        const square = document.createElement('div');
        square.setAttribute('id', i);
        square.classList.add(begin_blocks[i]);
        grid.appendChild(square);

        square.addEventListener('mouseover', () => {

            square.style.border='2px solid #494101';

        });

        square.addEventListener('mouseout', () => {
            square.style.border='0px';

        });


    }


}

create_arena();


