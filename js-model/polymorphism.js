/*
 * @Descripttion: 
 * @version: 
 * @Author: tinghai
 * @Date: 2022-11-24 09:03:56
 */
// var Duck = function () { }
// var Chicken = function () { }

// var makeSound = function (animal) {
//   if (animal instanceof Duck) {
//     console.log("gaga");
//   } else if (animal instanceof Chicken) {
//     console.log("gege")
//   }
// }

// makeSound(new Duck());
// makeSound(new Chicken());

var Duck = function () { }
var Chicken = function () { }
var Dog = function () { }
Duck.prototype.sound = function () {
  console.log("gaga");
}
Chicken.prototype.sound = function () {
  console.log("gege");
}
Dog.prototype.sound = function () {
  console.log("wang wang");
}


var makeSound = function (animal) {
  animal.sound();
}

makeSound(new Duck());
makeSound(new Chicken());
makeSound(new Dog());
