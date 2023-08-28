const prompt = require('prompt-sync')({ sigint: true });
const clear = require('clear-screen');
// สร้างตัวแปร  emoji แทนค่า 
const hat = '🎩';  
const hole = '🟡'; 
const fieldCharacter = '🟦'; 
const pathCharacter = '😺'; 

// สร้าง class field กำหนดObj  ก่อนเริ่มสร้างmap
class Field {
  constructor(rows, columns) {
    this.rows = rows;
    this.columns = columns; 
    this.field = this.generateField();
    this.positionX = 0;
    this.positionY = 0; //
    this.field[0][0] = pathCharacter; //กำหนดจุดเริ่มต้น
  }
  //----------------------------------------------------------------
  // ใช้ Array เพื่อ สร้าง map แบบ2มิติ 
  generateField() {
    const field = new Array(this.rows).fill(null).map(() => new Array(this.columns).fill(fieldCharacter));

    // เพิ่ม หมวกเข้าไปใน Map แบบRandom เวลาเริ่มเกมใหม่จะRandom  หมวกจุดใหม่ทุกครั้ง 
    const hatX = Math.floor(Math.random() * this.columns);
    const hatY = Math.floor(Math.random() * this.rows);
    field[hatY][hatX] = hat;

    // เพิ่ม หลุมเข้าไปใน Map แบบ Random  โดยใช้ do...while
    const numHoles = Math.floor((this.rows * this.columns) / 4);
    for (let i = 0; i < numHoles; i++) {
      let holeX, holeY;
      do {
        holeX = Math.floor(Math.random() * this.columns);
        holeY = Math.floor(Math.random() * this.rows);
      } while (
        field[holeY][holeX] !== fieldCharacter ||
        (holeX === 0 && holeY === 0) ||
        (holeX === hatX && holeY === hatY)
      );
      field[holeY][holeX] = hole;
    }

    return field;
  }

  // แสดงค่าปัจจุบันของmap
  print() {
    for (let row of this.field) {
      console.log(row.join(' '));
    }
  }

  // กำหนดค่าในการย้ายจุดในmap
  move(direction) {
    let newX = this.positionX;
    let newY = this.positionY;

    // สร้าง เงื่อนไขการเดินโด
    switch (direction) {
      case 'u':
        newY -= 1;
        break;
      case 'd':
        newY += 1;
        break;
      case 'l':
        newX -= 1;
        break;
      case 'r':
        newX += 1;
        break;
    }
    //สร้างเงื่อนไขการเล่นเกม
    if (
      newX < 0 ||
      newY < 0 ||
      newX >= this.columns ||
      newY >= this.rows ||
      this.field[newY][newX] === hole
    ) {
      console.log('Game over!');
      process.exit(0);
    } else if (this.field[newY][newX] === hat) {
      console.log('You win!');
      process.exit(0);
    } else if (this.field[newY][newX] !== fieldCharacter) {
      console.log('Game over!');
      process.exit(0);
    }
    clear();direction 
    // อัพเดต pathCharacter ใหม่
    this.field[this.positionY][this.positionX] = fieldCharacter;
    this.positionX = newX;
    this.positionY = newY;
    this.field[this.positionY][this.positionX] = pathCharacter;

    // เช็คmapอีกครั้ง
    this.print();
    }
}
// กำหนดขนาด field ใหม่
const field = new Field(10, 10);
field.print(); 

// กำหนดค่าให้เกมเคลื่อนที่ไปเรื่อยๆจนกว่าจะเข้าเงื่อไขที่กำหนด
 while (true) {
   const moveDirection = prompt('Hi! Welcome to the Game. Which way?  ');
   field.move(moveDirection);
   
 }