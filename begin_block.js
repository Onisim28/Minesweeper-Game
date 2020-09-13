export default class Begin_block {

    constructor(x, y) {

        this.block = document.getElementById("begin_block");
        this.width = 45;
        this.height = 45;

        this.position = {

            x: x,
            y: y

        };
//new

    }


    update() {


    }


    draw(ctx) {

        ctx.drawImage(this.block, this.position.x, this.position.y, this.width, this.height);

    }


}



