setOperator(isOperation = true) {

  let last = ''

  for (let i = this._operation.length - 1; i >= 0; i--) {

    if (this.isOperator(this._operation[i]) == isOperation) {

      last = this._operation[i];

      break;
    }
  }

  if (!last) {

    last = (isOperation) ? this._lastOperator : this._lastNumber;
  }

  return last;
}


//Altera o ultimo numero de uma array
setLastNumber(isOperation = false, array, value) {

  let last = ''

  for (let i = array.length - 1; i >= 0; i--) {

    if (this.isOperator(array[i]) == isOperation) {

      array[i] = value;
      break;

    } else if (this.isOperator(array[i]) == !isOperation) {

      last = array[i];
      array[array.length - 1] = this._maskOperation[this.indexOperator(value)];
    }

  }


  if (!last) {

    last = (isOperation) ? this._lastOperator : this._lastNumber;
  }

  return last;
}

//
// //Retorna a ultima operação
// setLastOperation(value) {
//
//   this._operation[this._operation.length - 1] = value;
//   if (this.isOperator(value)) {
//     this._memoryCalc[this._memoryCalc.length - 1] = this._maskOperation[this.indexOperator(value)];
//   } else {
//     this._memoryCalc[this._memoryCalc.length - 1] = value
//   }
// }
//
