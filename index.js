//import {change_width_height_event} from "./on_mouseEvent.js";

let lastTime = 0;
const WIDTH = 405;
const HEIGHT = 405;
const width_in_blocks = 9;
const heaight_in_blocks = 9;


const grid = document.querySelector('.grid')

const number_of_blocks = 81;
let gameOver = false;
let you_won = false;
let number_ofFlags_text = document.getElementById('nr_flags');
let youWon_text = document.getElementById('you_won_text');
let number_ofFlags = 10;


let begin_blocks = Array(number_of_blocks).fill('standard_block');

const nr_ofBombs = 10;
let bombs_locations = Array(nr_ofBombs).fill(-1);
let bombs = Array(nr_ofBombs).fill('bomb_block');

let which_numberBlock = Array(number_of_blocks).fill(0);

let number_of_blocks_withoutBombs = number_of_blocks - nr_ofBombs;


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
                    console.log("i= " + i);
                }


                for (let m = 1; m < 10; m++) {

                    if (i === m * width_in_blocks - 1) { // determines if a bomb is located in the right edge
                        is_rightScreen = true;

                        console.log("rg: " + i);
                        break;
                    }
                }

                which_numberBlock[i] = -1;
                //console.log("bomb location: " + i + ",  " + which_numberBlock[i]);

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

        // for (let j = 0; j < nr_ofBombs; j++) {
        //     if (bombs_locations[j] === i) {
        //         square.classList.remove(begin_blocks[i]);
        //         square.classList.add(bombs[j]);
        //         break;
        //
        //     }
        // }


        grid.appendChild(square);

        square.addEventListener('mouseover', showBorder);

        square.addEventListener('mouseout', function () {

            on_hover_out(square);

        });

        // square.removeEventListener('mouseover', on_hover);


        square.addEventListener('click', function (e) {

            click(which_numberBlock[i], i);

        })


        square.oncontextmenu = function (e) {
            e.preventDefault()
            addFlag(i);
        }


    }


    add_numbersBlocks();


    // for (let i=0; i<number_of_blocks; i++){
    //     let sq = document.getElementById(i);
    //     sq.classList.remove("standard_block");
    //
    //     which_number_block(which_numberBlock[i], i);
    //
    // }


    //console.log("Positions of the blocks: " + which_numberBlock);

}


function on_hover_out(square) {
    square.style.border = '0px';
}


function showBorder(e) {
    this.style.border = '3px solid #494101';
}


function click(number, i) { //Action on a click event

    let square = document.getElementById(i);

    if (square.classList.contains('standard_block')) {

        square.classList.remove('standard_block');

        which_number_block(number, i);

        square.style.border = '2px solid #09781e';


        checks_forNeighbours(i);


        if (square.classList.contains('bomb_block')) {

            gameOver = true;
            square.classList.remove('bomb_block');

        }

        if (gameOver) {

            console.log("Game Over!");

            for (let j = 0; j < number_of_blocks; j++) {
                which_number_block(which_numberBlock[j], j);

            }

            youWon_text.innerHTML = 'GAME OVER!';

            return;
        }

        checks_forWin();

        if (you_won) {

            for (let j = 0; j < number_of_blocks; j++) {
                which_number_block(which_numberBlock[j], j);
            }

            youWon_text.innerHTML = 'CONGRATULATIONS! YOU WON!';

        }

    }

}


function addFlag(i) { // add or remove a flag

    let square = document.getElementById(i);

    if ((square.classList.contains('standard_block')) && (number_ofFlags > 0)) {
        square.classList.remove('standard_block');
        square.classList.add('flag');
        number_ofFlags--;

        number_ofFlags_text.innerHTML = `Flags: ${number_ofFlags}`;

    } else if (square.classList.contains('flag')) {
        square.classList.remove('flag');
        square.classList.add('standard_block');
        number_ofFlags++;

        number_ofFlags_text.innerHTML = `Flags: ${number_ofFlags}`;

    }


    checks_forWin();

    if (you_won) {

        for (let j = 0; j < number_of_blocks; j++) {
            which_number_block(which_numberBlock[j], j);
        }

        youWon_text.innerHTML = 'CONGRATULATIONS! YOU WON!';

    }


}


fill_bombs_locations();
create_arena();


function which_number_block(number, i) { // inserts the type of square that has to be for the given block

    let block = document.getElementById(i);
    block.classList.remove('standard_block');

    block.removeEventListener('mouseover', showBorder);


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
        if (which_numberBlock[i - 10] !== -1) {
            which_numberBlock[i - 10]++;
            // which_number_block(which_numberBlock[i - 10], i - 10)
            // aux2.classList.add("block_1");

        }
    }

    if (i - 9 >= 0) {
        let aux2 = document.getElementById(i - 9);
        if (which_numberBlock[i - 9] !== -1) {
            which_numberBlock[i - 9]++;
            //which_number_block(which_numberBlock[i - 9], i - 9)
            //aux2.classList.add("block_1");

        }
    }

    if ((i - 8 >= 0) && (!isRight_screen)) {
        let aux2 = document.getElementById(i - 8);
        if (which_numberBlock[i - 8] !== -1) {
            which_numberBlock[i - 8]++;
            //  which_number_block(which_numberBlock[i - 8], i - 8)
            //aux2.classList.add("block_1");

        }
    }

    if ((i - 1 >= 0) && (!isLeft_screen)) {
        let aux2 = document.getElementById(i - 1);
        if (which_numberBlock[i - 1] !== -1) {
            which_numberBlock[i - 1]++;
            // which_number_block(which_numberBlock[i - 1], i - 1)
            // aux2.classList.add("block_1");
        }
    }

    if ((i + 1 <= 80) && (!isRight_screen)) {
        let aux2 = document.getElementById(i + 1);
        if (which_numberBlock[i + 1] !== -1) {
            which_numberBlock[i + 1]++;
            // which_number_block(which_numberBlock[i + 1], i + 1)
            //aux2.classList.add("block_1");
        }
    }

    if ((i + 8 <= 80) && (!isLeft_screen)) {
        let aux2 = document.getElementById(i + 8);
        if (which_numberBlock[i + 8] !== -1) {
            which_numberBlock[i + 8]++;
            // which_number_block(which_numberBlock[i + 8], i + 8)
            // aux2.classList.add("block_1");
        }
    }

    if (i + 9 <= 80) {
        let aux2 = document.getElementById(i + 9);
        if (which_numberBlock[i + 9] !== -1) {
            which_numberBlock[i + 9]++;
            // which_number_block(which_numberBlock[i + 9], i + 9)
            // aux2.classList.add("block_1");
        }
    }

    if ((i + 10 <= 80) && (!isRight_screen)) {
        let aux2 = document.getElementById(i + 10);
        if (which_numberBlock[i + 10] !== -1) {
            which_numberBlock[i + 10]++;
            //  which_number_block(which_numberBlock[i + 10], i + 10)
            // aux2.classList.add("block_1");
        }
    }

}


function checks_forNeighbours(i) { //checks for neighbours if there are no bombs inside them, they should become safe_spot or a block number

    let k = 1000;

    let a = document.getElementById(i);

    if (a.classList.contains('safe_place'))
        setTimeout(() => {

                while (k > 0) {
                    k--;

                    let l_screen = false, r_screen = false;

                    if (checks_isLeftSide(i))
                        l_screen = true;

                    if (checks_isRightSide(i))
                        r_screen = true;

                    if ((i - 10 >= 0) && (!l_screen)) {
                        let aux2 = document.getElementById(i - 10);
                        if ((which_numberBlock[i - 10] === 0) && (aux2.classList.contains('standard_block'))) {
                            aux2.classList.remove('standard_block');
                            aux2.classList.add('safe_place');
                            aux2.removeEventListener('mouseover', showBorder);
                            i = i - 10;

                            let t = i;

                            simplify_equation(i);

                        }
                    }


                    if (i - 9 >= 0) {
                        let aux2 = document.getElementById(i - 9);
                        if ((which_numberBlock[i - 9] === 0) && (aux2.classList.contains('standard_block'))) {
                            aux2.classList.remove('standard_block');
                            aux2.classList.add('safe_place');
                            aux2.removeEventListener('mouseover', showBorder);
                            i = i - 9;

                            let t = i;

                            simplify_equation(i);

                            continue;
                        }

                    }

                    if ((i - 8 >= 0) && (!r_screen)) {
                        let aux2 = document.getElementById(i - 8);
                        if ((which_numberBlock[i - 8] === 0) && (aux2.classList.contains('standard_block'))) {
                            aux2.classList.remove('standard_block');
                            aux2.classList.add('safe_place');
                            aux2.removeEventListener('mouseover', showBorder);
                            i = i - 8;

                            let t = i;

                            simplify_equation(i);

                            continue;
                        }

                    }

                    if ((i - 1 >= 0) && (!l_screen)) {
                        let aux2 = document.getElementById(i - 1);
                        if ((which_numberBlock[i - 1] === 0) && (aux2.classList.contains('standard_block'))) {
                            aux2.classList.remove('standard_block');
                            aux2.classList.add('safe_place');
                            aux2.removeEventListener('mouseover', showBorder);
                            i = i - 1;

                            let t = i;

                            simplify_equation(i);

                            continue;
                        }

                    }

                    if ((i + 1 <= 80) && (!r_screen)) {
                        let aux2 = document.getElementById(i + 1);
                        if ((which_numberBlock[i + 1] === 0) && (aux2.classList.contains('standard_block'))) {
                            aux2.classList.remove('standard_block');
                            aux2.classList.add('safe_place');
                            aux2.removeEventListener('mouseover', showBorder);
                            i = i + 1;

                            let t = i;

                            simplify_equation(i);

                            continue;
                        }
                    }

                    if ((i + 8 <= 80) && (!l_screen)) {
                        let aux2 = document.getElementById(i + 8);
                        if ((which_numberBlock[i + 8] === 0) && (aux2.classList.contains('standard_block'))) {
                            aux2.classList.remove('standard_block');
                            aux2.classList.add('safe_place');
                            aux2.removeEventListener('mouseover', showBorder);
                            i = i + 8;

                            let t = i;

                            simplify_equation(i);

                            continue;
                        }

                    }

                    if (i + 9 <= 80) {
                        let aux2 = document.getElementById(i + 9);
                        if ((which_numberBlock[i + 9] === 0) && (aux2.classList.contains('standard_block'))) {
                            aux2.classList.remove('standard_block');
                            aux2.classList.add('safe_place');
                            aux2.removeEventListener('mouseover', showBorder);
                            i = i + 9;

                            let t = i;

                            simplify_equation(i);

                            continue;
                        }
                    }

                    if ((i + 10 <= 80) && (!r_screen)) {
                        let aux2 = document.getElementById(i + 10);
                        if ((which_numberBlock[i + 10] === 0) && (aux2.classList.contains('standard_block'))) {
                            aux2.classList.remove('standard_block');
                            aux2.classList.add('safe_place');
                            aux2.removeEventListener('mouseover', showBorder);
                            i = i + 10;

                            let t = i;

                            simplify_equation(i);

                        }
                    }
                }

            }
            ,
            10
        )

}


function checks_isLeftSide(i) {

    if (i % width_in_blocks === 0) { // determines if a bomb is located in the left edge
        return true;
    }

    return false;

}

function checks_isRightSide(i) {


    for (let m = 1; m < 10; m++) {

        if (i === m * width_in_blocks - 1) { // determines if a bomb is located in the right edge
            return true;

        }
    }

    return false;
}


function simplify_equation(i) { // function that I need to insert multiple times for checking which number must be inserted

    let isLeft_screen = false, isRight_screen = false;

    if (checks_isLeftSide(i))
        isLeft_screen = true;

    if (checks_isRightSide(i))
        isRight_screen = true;

    if ((i - 10 >= 0) && (!isLeft_screen)) {
        let aux2 = document.getElementById(i - 10);


        if ((which_numberBlock[i - 10] > 0) && (aux2.classList.contains('standard_block'))) {
            aux2.classList.remove('standard_block');
            aux2.removeEventListener('mouseover', showBorder);
            which_number_block(which_numberBlock[i - 10], i - 10);
        }
    }

    if (i - 9 >= 0) {
        let aux2 = document.getElementById(i - 9);


        if ((which_numberBlock[i - 9] > 0) && (aux2.classList.contains('standard_block'))) {
            aux2.classList.remove('standard_block');
            aux2.removeEventListener('mouseover', showBorder);
            which_number_block(which_numberBlock[i - 9], i - 9);
        }
    }

    if ((i - 8 >= 0) && (!isRight_screen)) {
        let aux2 = document.getElementById(i - 8);


        if ((which_numberBlock[i - 8] > 0) && (aux2.classList.contains('standard_block'))) {
            aux2.classList.remove('standard_block');
            aux2.removeEventListener('mouseover', showBorder);
            which_number_block(which_numberBlock[i - 8], i - 8);
        }
    }

    if ((i - 1 >= 0) && (!isLeft_screen)) {
        let aux2 = document.getElementById(i - 1);
        if ((which_numberBlock[i - 1] > 0) && (aux2.classList.contains('standard_block'))) {
            aux2.classList.remove('standard_block');
            aux2.removeEventListener('mouseover', showBorder);
            which_number_block(which_numberBlock[i - 1], i - 1);
        }
    }

    if ((i + 1 <= 80) && (!isRight_screen)) {
        let aux2 = document.getElementById(i + 1);
        if ((which_numberBlock[i + 1] > 0) && (aux2.classList.contains('standard_block'))) {
            aux2.classList.remove('standard_block');
            aux2.removeEventListener('mouseover', showBorder);
            which_number_block(which_numberBlock[i + 1], i + 1);
        }
    }

    if ((i + 8 <= 80) && (!isLeft_screen)) {
        let aux2 = document.getElementById(i + 8);
        if ((which_numberBlock[i + 8] > 0) && (aux2.classList.contains('standard_block'))) {
            aux2.classList.remove('standard_block');
            aux2.removeEventListener('mouseover', showBorder);
            which_number_block(which_numberBlock[i + 8], i + 8);
        }
    }

    if (i + 9 <= 80) {
        let aux2 = document.getElementById(i + 9);
        if ((which_numberBlock[i + 9] > 0) && (aux2.classList.contains('standard_block'))) {
            aux2.classList.remove('standard_block');
            aux2.removeEventListener('mouseover', showBorder);
            which_number_block(which_numberBlock[i + 9], i + 9);
        }
    }

    if ((i + 10 <= 80) && (!isRight_screen)) {
        let aux2 = document.getElementById(i + 10);
        if ((which_numberBlock[i + 10] > 0) && (aux2.classList.contains('standard_block'))) {
            aux2.classList.remove('standard_block');
            aux2.removeEventListener('mouseover', showBorder);
            which_number_block(which_numberBlock[i + 10], i + 10);
        }
    }

}

function checks_forWin() { //Checks if the user won the game

    for (let i = 0; i < number_of_blocks; i++) {

        let aux = document.getElementById(i);


        if ((which_numberBlock[i] === -1) && (aux.classList.contains('bomb_block'))) {
            break;
        }


        if (aux.classList.contains('standard_block')) {
            break;

        }

        if (i === number_of_blocks - 1)
            you_won = true;

    }


}

