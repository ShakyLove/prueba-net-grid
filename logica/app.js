//EJERCICIO 1
function cruz(n) {
  var resultado = "";

  if (n == 0) console.log("error");

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (j == i || j == n - i - 1) {
        resultado += "X"
      } else {
        resultado += "_"
      }
    }
    resultado += "\n";
  }
  console.log(resultado)
}
console.log(cruz(5))
console.log(cruz(6))

//EJERCICIO 2
function bloque(array) {
  let tempArray = [];
  let fullArray = [];

  array.map((num, index) => {
    if (num != 0) {
      tempArray.push(num);
    } else {

      if (tempArray.length > 0) {
        fullArray.push(Array.from(tempArray).sort((a, b) => a - b).join(''));
        tempArray = [];
      } else {
        index == 0 ? fullArray.push('') : fullArray.push('X');
      }
      
    }

  })
  fullArray.push(Array.from(tempArray).sort((a, b) => a - b).join(''));
  console.log(fullArray);
}

var myArray = [1, 3, 2, 0, 7, 8, 1, 3, 0, 6, 7, 1];
var myArray2 = [0, 1, 3, 2, 0, 7, 8, 1, 3, 0, 6, 7, 1, 0];
var myArray3 = [2, 1, 0, 0, 3, 4];
console.log(bloque(myArray));
console.log(bloque(myArray2));
console.log(bloque(myArray3));