
//
// ─── IMPORT ANY EXTERNAL FUNCTIONS WE NEED FOR THIS CLASS ───────────────────────
//

import aFunction from './es6.function';

//
// ─── DEFINE OUR TEST CLASS ──────────────────────────────────────────────────────
//

//define a class and export it
export class testClass {

  //define its defaults
  constructor(var1,var2){
    this.var1 = var1 || "default for var 1";
    this.var2 = var2 || "default for var 2";
  }

  //print out the val of var1
  printVar1(){
    console.log("The value of variable 1 is "+this.var1);
  }

  //print out the val of var2
  printVar2(){
    console.log("The value of variable 2 is "+this.var2);
  }

  //print our the output of an external imported function
  printExternalFunctionVar(){
    this.var3 = aFunction("hello world");
    console.log("The value returned from es6.function.js is "+this.var3);
  }

}