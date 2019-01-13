class CalcController {

  constructor() {

    this._calcDisplayEl = $('#display2');
    this._calcDisplayElOne = $('#display1');
    this._memoryCalc = [];
    this._novovo = $('#nove');
    this._allButtons = $('button');
    this._operation = [];
    this._maskOperation = ['+', '-', 'x', '÷', '%'];
    // this._buttonSelect = '';
    // this.percorre();
    this.initButtonsEvents();
    //Retorna o ultimo numero digitado na calculadora
    this._lastNumber = '';
    this._lastOperator = '';
    this._result = '';

  }

  // getdisplay() {
  //
  // }

  setDisplay(value) {

    if (this.isOperator(value)) {

      this._calcDisplayEl.text(this._maskOperation[this.indexOperator(value)]);

    } else {

      this._calcDisplayEl.text(value);

    };

  }

  setDisplayOne() {

    // let valueToString = value.toString();
    this._calcDisplayElOne.text(this._memoryCalc.join(' ').toString());

  }


  initButtonsEvents() {
    let _this = this
    this._allButtons.click(function() {
      // _this.setdisplay($(this).text());
      _this.turnButtonInfo($(this).text());

    })
  };

  turnButtonInfo(value) {
    switch (value) {
      case 'C':
        this.clearAll();
        break;
      case 'CE':
        this.cancelEntry();
        break;
      case '÷':
        this.addOperation('/');
        break;
      case 'X':
        this.addOperation('*');
        break;
      case '±':
        this.changeNegative();
        break;
      case '=':
        this.calc();
        this.equalDisplay();
        break;
      case '.':
        this.addDot();
        break;
      case '←':
      case '√':
      case 'x²':
      case '¹/x':
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
      case '+':
      case '-':
      case '%':
        this.addOperation(value);
        break;

      default:
        // setError();

    };
  }

  setDisplayToZero() {
    this._lastNumber = '0'
    this.setDisplay(this._lastNumber);
    this.setDisplayOne(this._lastNumber);
  }

  //Exclui a ultima operação digitada e retorna no display
  cancelEntry() {
    this._operation.pop();
    this._memoryCalc.pop();
    this.pushOperation('0');
    this.setDisplayToZero();
  }

  //Limpa a calculadora e retorna zero no display
  clearAll() {
    this._operation = [];
    this._memoryCalc = [];
    this.setDisplayToZero();
  }

  equalDisplay() {
    this._memoryCalc = [this._result, this._lastOperator];
    this.setDisplayOne();
  }


  setLastNumber(isOperation = false, array) {

    for (let i = array.length - 1; i >= 0; i--) {

      if (this.isOperator(array[i]) == isOperation) {

        array[i] = this._lastNumber;
        break;
      }
    }

  }

  changeNegative() {

    this._lastNumber = this.setOperator(false) * -1;

    this.setLastNumber(false, this._operation);
    this.setLastNumber(false, this._memoryCalc);

    (this._lastNumber < 0) ? this._lastOperator = '+': this._lastOperator = '-';


    this.setDisplay(this._lastNumber);

  }

  pushOperationSetDysplay(value) {

    this.pushOperation(value);
    this.setDisplay(value);

  }

  addOperation(value) {
    if ((isNaN(this.getLastOperation()))) {
      if (value == '√') {
        this._lastNumber = Math.sqrt(this._operation[0]);
        this.pushOperationSetDysplay(this._lastNumber);
        this.pushOperation(this._lastOperator);

      } else if (value == 'x²') {
        this._lastNumber = Math.pow(this._operation[0], 2)
        this.pushOperationSetDysplay(this._lastNumber);

      } else if (value == '¹/x') {
        this._lastNumber = (1 / this._operation[0]);
        this.pushOperationSetDysplay(this._lastNumber);

      } else if (value == '←') {
        this.pushOperationSetDysplay(this._lastNumber);

      } else {

        this.setDisplay(value);


        let isOperator = this.isOperator(value)
        if (this._operation.length == 0 && isOperator == true) {
          this._operation = [0, value];
          this._memoryCalc = [0, value];

        } else {

          isOperator ? this.setLastOperation(value) : this.pushOperation(value);

        }


      }


    } else {
      if (this.isOperator(value)) {

        this.setDisplay(value);

        this.pushOperation(value);

      } else {

        let newValue;

        if (value == '√') {

          newValue = Math.sqrt(this.getLastOperation());


        } else if (value == 'x²') {

          newValue = Math.pow(this.getLastOperation(), 2);


        } else if (value == '¹/x') {

          newValue = (1 / this.getLastOperation());


        } else if (value == '←') {

          newValue = this.getLastOperation().substring(0, this.getLastOperation().length - 1);


        } else {

          newValue = this.getLastOperation().toString() + value.toString();

        }

        if (newValue.length == 0) newValue = 0;
        this.setLastOperation(newValue);

        this.setDisplay(newValue);
        this.setDisplayOne();


      }

    }
  }

  getLastitens() {

    this._lastOperator = this.setOperator(true);
    this._lastNumber = this.setOperator(false);

  }

  setArray(array, operatorOne, operatorTwo, operatorThree) {
    array = [operatorOne, operatorTwo, operatorThree];
  }

  calc() {



    this.getLastitens();

    if (this._lastOperator == '%') {
      this._operation.pop();
      this.getLastitens();

      let firstNumber = this._operation[0];

      let resultPercent = (this._lastNumber / 100) * firstNumber;

      this._operation = [firstNumber, this._lastOperator, resultPercent];

    } else if (this._operation.length < 3) {

      if (!this._lastOperator) {
        this._operation[0]
      } else {
        this._operation.push(this._lastNumber);
      }


    } else if (this._operation.length > 3) {
      // this._lastOperator = this.getLastOperation();
      this._operation.pop();


    }

    this._result = this.getResult();
    this._operation = [this._result, this._lastOperator];

    this.setDisplay(this._result);

  }

  getResult() {
    try {
      return eval(this._operation.join(''));

    } catch (e) {
      setTimeout(() => {
        this.setError();
      }, 1);
    }
  }

  pushOperation(value) {

    this._operation.push(value);

    if (this.isOperator(value)) {
      this._memoryCalc.push(this._maskOperation[this.indexOperator(value)])
    } else {
      this._memoryCalc.push(value);
    }
    this.setDisplayOne();

    if (this._operation.length > 3) this.calc();

  }

  getLastOperation() {

    return this._operation[this._operation.length - 1]

  }

  setLastOperation(value) {

    this._operation[this._operation.length - 1] = value;
    if (this.isOperator(value)) {
      this._memoryCalc[this._memoryCalc.length - 1] = this._maskOperation[this.indexOperator(value)];
    } else {
      this._memoryCalc[this._memoryCalc.length - 1] = value
    }
  }

  indexOperator(value) {

    return ['+', '-', '*', '/', '%'].indexOf(value);

  }

  isOperator(value) {
    return (this.indexOperator(value) > -1);

  }

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



}
