class CalcController {

  constructor() {

    this.initialize();
    this._calcDisplayEl = $('#display');
    this._buttons = $('button');
    this._operation = [];
    this._buttonSelect = '';
    this._lastOperator = '';
    // this._addOperation = addOperation(this._buttonSelect);
    this.initButtonsEvents();


  }

  initialize() {



    // let bosta = this._buttons;
    //  bosta.click(function(){
    //   // bIndex = buttons.index(this);
    //
    //   this.;
    //   // this.addOperation($(this).text());
    //   // this._buttonSelect = ;
    //   // this.setCalcDisplay($(this).text());

    // });



  }

  initButtonsEvents(){

    $('button').click( () => {
      let txt = $(this).text();
      this.addOperation(txt);
      this.setCalcDisplay(txt);
      // this._buttonSelect = $(this).index();
      // event.this.addOperation(this._buttonSelect);
      console.log(this._buttonSelect);
      // this.merda();
      // setCalcDisplay(txt);
    });




  };

//  merda(){
//   // $('button').eq(this._buttonSelect).click(function() {
//     // this._buttonSelect = $(this).index();
//     this.addOperation($('button').eq(this._buttonSelect).text());
//     console.log(this._buttonSelect);
//     // setCalcDisplay(txt);
//   // });
// }



  // addEventsListenerAll(element, events, fn) {
  //   //Cria uma array para os eventos que entraram no paramentro
  //   //Cada elemento da array foi nomeado como event
  //   events.split(' ').forEach(event => {
  //     //Para cada elemento informado como parametro adiciona um evento e uma função
  //     element.addEventListener(event, fn, false);
  //   });
  // }

  //Metodo adiciona os eventos de mouse as teclas da calculadora
  // initButtonsEvents() {
  //   //Encontra todos os botões na DOM
  //   let buttons = document.querySelectorAll("button");
  //   //Percorre os botões na DOM
  //   buttons.forEach((btn, index) => {
  //     //Adiciona varios eventos aos botões com o metodo addEventsListenerAll
  //     this.addEventsListener(btn, 'click', e => {
  //       //Seleciona a classe do botão e retira a String 'btn-' e transforma em texto
  //       // let textBtn = btn.className.baseVal.replace('btn-', '');
  //       //Informa ao metodo execBtn 0 botão clicado
  //       this.addOperation($(this).text());
  //     });
  //     // //Adiciona aos eventos de mouse a mudança do cursor para pointer
  //     // this.addEventsListenerAll(btn, 'mouseover mouseup mousedown', e => {
  //     //   btn.style.cursor = 'pointer'
  //     // });
  //
  //   })
  //
  // }

  getCalcDisplay() {
    return this._calcDisplayEl.text();

  }

  setCalcDisplay(value) {
    this._calcDisplayEl.text(value);

  }


  setLastOperator(value) {
    for (var i = this._operation.length; i >= 0; i--) {
      if (this.isOperator(this._operation[i])) {
        this._lastOperator = value;
        break;
      }
    }
  }

  getLastOperation() {

    return this._operation[this._operation.length - 1];
  }

  addOperation(value) {
    console.log('primeiro click '+value);
    console.log('array primeiro click '+this._operation);


    if (isNaN(this.getLastOperation())) {

      // (this.isOperator()) ? this.setLastOperator(value): this._operation.push(value);
      console.log('teste operador '+value);
      console.log('array teste operador '+this._operation);

    } else {
      let newValue = this.getLastOperation().string() + value.string();
      console.log('teste construindo numeros '+value);
      console.log('array construindo numeros  '+this._operation);
    }
  }

  isOperator(value) {

    return (['+', '-', '*', '/', '%'].indexOf(value) > -1);

  }








};
