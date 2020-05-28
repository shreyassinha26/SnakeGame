class Square extends BaseClass {
    constructor(x , y){
        super(x , y , 10 , 10);

    }
    display(color){
        rectMode(CENTER);
        fill(color);
        rect(this.body.position.x , this.body.position.y , 10 , 10);
    }
}