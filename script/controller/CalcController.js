class CalcController {

  constructor() {

    this._calcDisplayEl = $('#display2');
    this._calcDisplayElOne = $('#display1');
    this._allButtons = $('button');
    this._operation = [];
    this._memoryCalc = [];
    this._maskOperation = ['+', '-', 'x', '÷', '%'];
    this._lastNumber = '';
    this._lastOperator = '';
    this._lastResultOperation = '';
    this.initButtonsEvents();
    this.initKeyboardEvents();
    this.pasteFromClipboard();

  };

  //Altera o valor no display
  setDisplay(value) {
    if (this.isOperator(value)) {


      this._calcDisplayEl.text(this._maskOperation[this.indexOperator(value)]);

    } else {
      this._calcDisplayEl.text(value);
    }

    this._calcDisplayElOne.text(this._memoryCalc.join(' ').toString());
  }

  //Retorna o valor do display
  getDisplay() {
    return this._calcDisplayEl.text();
  }

  //Metodo adiciona os eventos de mouse as teclas da calculadora
  initButtonsEvents() {

    let _this = this

    this._allButtons.click(function() {

      _this.turnButtonInfo($(this).text());
    })
  };

  //Transforma a informação capturada com o evento de clique no botão em metodos
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
      case ',':
        this.addDot(value);
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
        setError();

    };
  }

  //Retorna mensagem de erro no display
  setError() {

    this.displayCalcEl = "Error";
  }

  //Metodo adiciona os teclado a calculadora
  initKeyboardEvents() {

    $(document).keyup(e => {
      switch (e.key) {
        case 'Escape':
          this.clearAll();
          break;
        case 'Backspace':
          this.addOperation('←');
          break;
        case '+':
        case '-':
        case '/':
        case '*':
        case '%':
          this.addOperation(e.key);
          break;
        case 'Enter':
        case '=':
          this.calc();
          this.equalDisplay();
          break;
        case '.':
        case ',':
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
          this.addOperation(parseInt(e.key));
          break;
        case 'c':
          if (e.ctrlKey) this.copyToClipboard();
          break;
      }
    });
  }

  //Altera display para zero
  setDisplayToZero() {

    this._lastNumber = '0'
    this.setDisplay(this._lastNumber);

  }

  //Cancela a ultima entrada
  cancelEntry() {

    this._operation.pop();
    this._memoryCalc.pop();
    this.setDisplayToZero();
  }

  //Reinicia a calculadora
  clearAll() {

    this._operation = [];
    this._memoryCalc = [];
    this.setDisplayToZero();
  }

  //Reconfigura a memoria de calculo quando o botão '=' ou tecla Enter é acionada
  equalDisplay() {

    this._memoryCalc = [this._lastResultOperation, this._lastOperator];
    this._calcDisplayElOne.text(this._memoryCalc.join(' ').toString());
  }

  //Altera o ultimo numero de uma array
  setLastNumber(isOperation = false, array) {

    for (let i = array.length - 1; i >= 0; i--) {

      if (this.isOperator(array[i]) == isOperation) {

        array[i] = this._lastNumber;
        break;
      }
    }
  }

  //Retorna a ultima operação
  getLastOperation() {

    return this._operation[this._operation.length - 1]
  }

  //Retorna a ultima operação
  setLastOperation(value) {

    this._operation[this._operation.length - 1] = value;
    if (this.isOperator(value)) {
      this._memoryCalc[this._memoryCalc.length - 1] = this._maskOperation[this.indexOperator(value)];
    } else {
      this._memoryCalc[this._memoryCalc.length - 1] = value
    }
  }
  //Muda o numero de positivo para negativo ou vice versa o numero no display
  changeNegative() {

    this._lastNumber = this.setOperator(false) * -1;
    this.setLastNumber(false, this._operation);
    this.setLastNumber(false, this._memoryCalc);
    (this._lastNumber < 0) ? this._lastOperator = '+': this._lastOperator = '-';
    this.setDisplay(this._lastNumber);
  }

  //Grava o valor na array e retorna no display
  pushOperationSetDisplay(value) {

    this.setDisplay(value);
    this.pushOperation(value);
  }

  //Altera o ultimo numero da array e retorna no display
  setLastOperationDisplay(value) {

    this.setLastOperation(value);
    this.setDisplay(value);
  }

  //Valida os numeros e operadores digitados e determina qual operação será realizada para cada um deles
  addOperation(value) {

    //Verifica se o ultimo operador digitado é um numero
    if ((isNaN(this.getLastOperation()))) {

      //Se não for numero
      //Calcula raiz quadrada de um numero obtido de um calculo
      if (value == '√') {

        this._lastNumber = Math.sqrt(this._operation[0]);
        this.pushOperationSetDisplay(this._lastNumber);
        this.pushOperation(this._lastOperator);

      //Calcula elavado ao quadrado de um numero obtido de um calculo
      } else if (value == 'x²') {

        this._lastNumber = Math.pow(this._operation[0], 2)
        this.pushOperationSetDisplay(this._lastNumber);

      //Calcula a fração de um numero obtido de um calculo
      } else if (value == '¹/x') {

        this._lastNumber = (1 / this._operation[0]);
        this.pushOperationSetDisplay(this._lastNumber);

      //Apaga o ultimo registro digitado que ainda não foi calculado
      } else if (value == '←') {

        this.pushOperationSetDisplay(this._lastNumber);

      //Concatena um numero caso o ultimo operador digitado foi um ponto ou virgula
      } else if (this._operation.length > 0 && this.getLastOperation().indexOf(',') > -1) {

        let newValue = this.getLastOperation().toString() + value.toString();
        this.setLastOperationDisplay(newValue);

      } else {

        this.setDisplay(value);
        let isOperator = this.isOperator(value);

        //Se um operador for digitado sem que nenhum numero digitado antes grave 0 e o operador na array
        if (this._operation.length == 0 && isOperator == true) {

          this._operation = [0, value];
          this._memoryCalc = [0, value];

        } else {

          //Caso um operador for digitado duas vezes altere a array para o ultimo
          //Se for o primeiro numero digitado na calculadora grave na array
          isOperator ? this.setLastOperation(value) : this.pushOperation(value);


        }
      }

    //Se for numero
    } else {

      //
      if (this.isOperator(value)) {


        this.pushOperationSetDisplay(value);

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

        this.setLastOperationDisplay(newValue);
      }
    }
  }

  //Retorna o ultimo numero e operador utilizados
  getLastitens() {

    this._lastOperator = this.setOperator(true);
    this._lastNumber = this.setOperator(false);

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

      this._operation.pop();
    }

    this._lastResultOperation = this.getResult();
    this._operation = [this._lastResultOperation, this._lastOperator];
    this.setDisplay(this._lastResultOperation);

    // this.setLastOperationDisplay(this._lastResultOperation);


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
    // this.setDisplayOne();
    this.setDisplay();


    if (this._operation.length > 3) this.calc();


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

  //Metodo cola numeros coletados da area de transferência para a calculadora
  pasteFromClipboard() {
    //Metodo captura o evendo 'paste' e
    document.addEventListener('paste', e => {
      //Grava em text todo todo o texto que se encontra em clipboardData.getData
      let text = e.clipboardData.getData('Text');
      //grava no display da calculadora os numeros (parseFloat) contidos em text
      this.pushOperationSetDisplay(parseFloat(text));
      // this.setLastOperationDisplay((text));

    });
  }


  //Copia os numeros da calculadora para area de transferencia
  copyToClipboard() {
    //Cria um elemento input e grava na vareavel input na DOM
    let input = document.createElement('input');
    //Determina que o valor de input será o que está em displayCalc
    input.value = this.getDisplay();
    //Cria um elemento em body e adiciona o valor contido em input
    document.body.appendChild(input);
    //Seleciona input para determinar que este elemento é o que será copiado
    input.select();
    //Execulta o comando "Copy"
    document.execCommand("Copy");
    //Remove input da DOM
    input.remove();
  }

  addDot(value) {

    // let lastOperation = this.getLastOperation();

    if (typeof this.getLastOperation() === 'string' && this.getLastOperation().split('').indexOf('.') > -1) return;

    if (this.isOperator(this.getLastOperation()) || !this.getLastOperation()) {
      this.pushOperation('0.');
    } else {
      this.setLastOperation(this.getLastOperation().toString() + '.');
    }

    // text = parseInt(text);
    // lastOperation = this.getLastOperation();
    this.setDisplay(this.getLastOperation());
    // this.setDisplayOne();



  }




}
