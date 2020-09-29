//import {change_width_height_event} from "./on_mouseEvent.js";

let lastTime = 0;
const WIDTH = 405;
const HEIGHT = 405;
const width_in_blocks = 9;
const heaight_in_blocks = 9;


const grid = document.querySelector('.grid')

const number_of_blocks = 81;

let begin_blocks = Array(number_of_blocks).fill('standard_block');

const nr_ofBombs = 10;
let bombs_locations = Array(nr_ofBombs).fill(-1);
let bombs = Array(nr_ofBombs).fill('bomb_block');

let which_numberBlock = Array(number_of_blocks).fill(0);


function fill_bombs_locations() { // get some random and unique locations for each bomb

    for (let i = 0; i < nr_ofBombs; i++) {
        let still_search = true;

        let aux = Math.floor(Math.random() * number_of_blocks);

        while (still_search) {
            for (let j = 0; j < nr_ofBombs; j++) {

                if (aux === bombs_locations[j]) {
                    aux = Math.floor(Math.random() * number_of_blocks);
                    break;
                }

                if (j === nr_ofBombs - 1) {
                    still_search = false;
                }

            }
        }

        bombs_locations[i] = aux;
        console.log("bomb[" + i + "]=" + bombs_locations[i]);
    }
}


function add_numbersBlocks() { // iterates through every square and checks where the bombs are positioned to make changes based on bombs locations

    let is_leftScreen = false;
    let is_rightScreen = false;

    for (let i = 0; i < number_of_blocks; i++) {

        for (let j = 0; j < nr_ofBombs; j++) {

            if (i === bombs_locations[j]) {

                if (i % width_in_blocks === 0) { // determines if a bomb is located in the left edge
                    is_leftScreen = true;
                    console.log("i= "+i);
                }


                for (let m = 1; m < 10; m++) {

                    if (i === m * width_in_blocks - 1) { // determines if a bomb is located in the right edge
                        is_rightScreen = true;

                        console.log("rg: " + i);
                        break;
                    }
                }

                which_numberBlock[i] = -1;

                check_numbers(i, is_leftScreen, is_rightScreen);
                is_leftScreen = false;
                is_rightScreen = false;


            }

        }

    }
}


function create_arena() { // creating the arena for the gameplay

    for (let i = 0; i < number_of_blocks; i++) {

        const square = document.createElement('div');
        square.setAttribute('id', i);
        square.classList.add(begin_blocks[i]);

        for (let j = 0; j < nr_ofBombs; j++) {
            if (bombs_locations[j] === i) {
                square.classList.remove(begin_blocks[i]);
                square.classList.add(bombs[j]);
                break;

            }
        }


        grid.appendChild(square);

        square.addEventListener('mouseover', () => {

            square.style.border = '2px solid #494101';

        });

        square.addEventListener('mouseout', () => {
            square.style.border = '0px';

        });

    }


    add_numbersBlocks();

}


fill_bombs_locations();
create_arena();


function which_number_block(number, i) { // inserts the type of square that has to be for the given block

    let block = document.getElementById(i);

    switch (number) {

        case -1:
            block.classList.add("bomb_block");
            break;
        case 0:
            block.classList.add("safe_place");
            break;
        case 1:
            block.classList.add("block_1");
            break;
        case 2:
            block.classList.add("block_2");
            break;
        case 3:
            block.classList.add("block_3");
            break;
        case 4:
            block.classList.add("block_4");
            break;
        case 5:
            block.classList.add("block_5");
            break;
        case 6:
            block.classList.add("block_6");
            break;
        case 7:
            block.classList.add("block_7");
            break;
        case 8:
            block.classList.add("block_8");
            break;

    }

}


function check_numbers(i, isLeft_screen, isRight_screen) { //checks for each square whenever it has to be modified
    // Example : if 2 bombs reaches the same square, therefore that square will become number 2 image, meaning that there are 2 bombs near

    console.log("cat este: " + isLeft_screen);


        if ((i - 10 >= 0) && (!isLeft_screen)) {
            let aux2 = document.getElementById(i - 10);
            if (!aux2.classList.contains("bomb_block")) {
                which_numberBlock[i - 10]++;
                which_number_block(which_numberBlock[i - 10], i - 10)
               // aux2.classList.add("block_1");

            }
        }

        if (i - 9 >= 0) {
            let aux2 = document.getElementById(i - 9);
            if (!aux2.classList.contains("bomb_block")) {
                 which_numberBlock[i - 9]++;
                 which_number_block(which_numberBlock[i - 9], i - 9)
                //aux2.classList.add("block_1");

            }
        }

        if ((i - 8 >= 0) && (!isRight_screen)) {
            let aux2 = document.getElementById(i - 8);
            if (!aux2.classList.contains("bomb_block")) {
                which_numberBlock[i - 8]++;
                which_number_block(which_numberBlock[i - 8], i - 8)
                //aux2.classList.add("block_1");

            }
        }

        if ((i - 1 >= 0) && (!isLeft_screen)) {
            let aux2 = document.getElementById(i - 1);
            if (!aux2.classList.contains("bomb_block")) {
                which_numberBlock[i - 1]++;
                which_number_block(which_numberBlock[i - 1], i - 1)
                // aux2.classList.add("block_1");
            }
        }

        if ((i + 1 <= 80) && (!isRight_screen)) {
            let aux2 = document.getElementById(i + 1);
            if (!aux2.classList.contains("bomb_block")) {
                which_numberBlock[i + 1]++;
                which_number_block(which_numberBlock[i + 1], i + 1)
                //aux2.classList.add("block_1");
            }
        }

        if ((i + 8 <= 80) && (!isLeft_screen)) {
            let aux2 = document.getElementById(i + 8);
            if (!aux2.classList.contains("bomb_block")) {
                which_numberBlock[i + 8]++;
                which_number_block(which_numberBlock[i + 8], i + 8)
               // aux2.classList.add("block_1");
            }
        }

        if (i + 9 <= 80) {
            let aux2 = document.getElementById(i + 9);
            if (!aux2.classList.contains("bomb_block")) {
                which_numberBlock[i + 9]++;
                which_number_block(which_numberBlock[i + 9], i + 9)
               // aux2.classList.add("block_1");
            }
        }

        if ((i + 10 <= 80) && (!isRight_screen)) {
            let aux2 = document.getElementById(i + 10);
            if (!aux2.classList.contains("bomb_block")) {
                which_numberBlock[i + 10]++;
                which_number_block(which_numberBlock[i + 10], i + 10)
               // aux2.classList.add("block_1");
            }
        }

}

