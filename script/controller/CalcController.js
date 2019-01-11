class CalcController {

  constructor() {

    this._calcDisplayEl = $('#display');
    this._novovo = $('#nove');
    this._allButtons = $('button');
    this._operation = [];
    // this._buttonSelect = '';
    // this.percorre();
    this.initButtonsEvents();
    //Retorna o ultimo numero digitado na calculadora
    this._lastNumber = '';
    this._lastOperator = '';

  }

  // getdisplay() {
  //
  // }

  setDisplay(value) {
    this._calcDisplayEl.text(value);
    console.log('cons1');
    console.log('O resultado da operação é '+value);

  }

  initButtonsEvents() {
    let _this = this
    this._allButtons.click(function() {
      // _this.setdisplay($(this).text());
      _this.turnButtonInfo($(this).text())
      console.log('cons2');


    });
  }

  turnButtonInfo(value) {

    switch (value) {
      case 'CE':
      this.clearAll();
      console.log('cons3');

      break;
      case 'C':
      this.cancelEntry();
      console.log('cons4');

      break;
      // case 'soma':
      //   this.addOperation('+');
      //   break;
      // case 'subtracao':
      //   this.addOperation('-');
      //   break;
      // case '÷':
      //   this.addOperation('/');
      //   break;
      // case 'X':
      //   this.addOperation('*');
      //   break;
      // case '%':
      //   this.addOperation('%');
      //   break;
      // case '←':
      //   this.addOperation('%');
      //   break;
      // case '√':
      //   this.addOperation('%');
      //   break;
      // case 'x²':
      //   this.addOperation('%');
      //   break;
      // case '¹/x':
      //   this.addOperation('%');
      //   break;
      // case '=':
      //   this.calc();
      //   break;
      case '.':
      this.addDot();
      break;
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

      this.addOperation(value);
      break;
      console.log('cons5');

      default:
      // setError();

    };
  }

  //Limpa a calculadora e retorna zero no display
  clearAll() {
    this._operation = [];

    this._lastNumber = '0';
    this.setDisplay(this._lastNumber);
  }

  //Exclui a ultima operação digitada e retorna no display
  cancelEntry() {
    this._operation.pop();
    this.setLastNumberToDisplay();
  }

  //Grava no display o ultimo numero encontrado na array
  setLastNumberToDisplay() {


    let lastNumber = this.setOperator(false);
    console.log('cons5');

    // let lastNumber = this._lastNumber;

    if (!lastNumber) lastNumber == 0;
    console.log('cons6');


    this.setDisplay(this._lastNumber);
    console.log('cons7');
    console.log('cons7' + this._lastNumber);


  }

  addOperation(value) {
    if ((isNaN(this.getLastOperation()))) {
      console.log('cons8');
      console.log('o ultimo elemento da array não é um numero, é o operador: '+this._lastOperator );



      this.setDisplay(value);
      console.log('cons9 ' + value);


      let isOperator = this.isOperator(value)
      console.log('cons10 é operador? '+value);
      console.log('cons10 é operador? '+this.setOperator(isOperator));
      // console.log('cons10 é operador? '+this.pushOperation(value));

      this.isOperator(value) ? this.setLastOperation(value) : this.pushOperation(value);
      // console.log('cons11 é um operador ? '+ this.isOperator(value) + 'Se sim:' + this.setOperator(isOperator) + 'Se não:' + this.pushOperation(value) );
      console.log('cons11 é um operador ? '+ this.isOperator(value) );


    } else {
      if (this.isOperator(value)) {
      console.log('cons12');

        this.setDisplay(value);
        console.log('cons13');

        this.pushOperation(value);
        console.log('cons14');


      } else {

        let newValue = this.getLastOperation().toString() + value.toString();
        console.log('cons15');

        this.setLastOperation(newValue);
        console.log('cons16');

        this.setDisplay(newValue);
        console.log('cons17');

      }

    }
    // (isNaN(this.getLastOperation())) ? this._operation.push(value) : console.log('Não é numero');
  }

  calc() {



    this._lastOperator = this._operation.pop();
    console.log('cons18');


    this._lastNumber =  this.getResult();
    console.log('cons19');

    this._operation = [this._lastNumber,this._lastOperator];
    console.log('cons20');





    this.setLastNumberToDisplay();
    console.log('cons21');

  }

  getResult() {
    try {
      return eval(this._operation.join(''));
      console.log('cons22');

    } catch (e) {
      setTimeout(() => {
        this.setError();
      }, 1);
    }
  }


  pushOperation(value) {

    this._operation.push(value);
    console.log('cons23');

    if (this._operation.length > 3) this.calc();
    console.log('cons24' + value);


  }

  getLastOperation() {

    return this._operation[this._operation.length - 1]
    console.log('cons25');

  }

  setLastOperation(value) {

    this._operation[this._operation.length - 1] = value;
    console.log('cons26');

  }


  isOperator(value) {
    return (['+', '-', '*', '/', '%'].indexOf(value) > -1);
    console.log('cons27');

  }

  setOperator(isOperation = true) {

    let last = ''
    console.log('cons28 last' + last);

    for (let i = this._operation.length-1; i >= 0; i--) {

      if (this.isOperator(this._operation[i]) == isOperation) {
        console.log('cons29 é um operador? ');

        last = this._operation[i];
        console.log('cons30 o operador é? '+ last);



        break;
      }
    }
    if (!last) {
      console.log('cons31');

      last = (isOperation) ? this._lastOperator : this._lastNumber;

      // this.pushOperation(value);
    }


    console.log('cons32'+last);

    return last;
  }



}
