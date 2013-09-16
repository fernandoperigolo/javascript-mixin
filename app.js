'use strict';

// Adiciono ao prototype dos objetos o método addMixin
// Desta forma consigo de forma simples adicionar um mixin a um objeto
if (typeof Object.prototype.addMixin !== 'function') {
  Object.prototype.addMixin = function (mixin) {
    mixin.call(this.prototype);
  };
};

// Aqui declaro o Mixin asVehicle
// Toda vez que desejar que um objeto funciona como um veículo, usarei este Mixin
var asVehicle = function(){
  // Posso ter propriedades 
  this._isEngineChecked = false;
  this._isEngineStarted = false;

  // Ou métodos
  // Como este que verifico o motor
  this.checkEngine = function() {
    try {
      if (this._isEngineChecked) {
        throw new Error('The engine is already checked.');
      }
      console.log('vehicle - engine checked');
      this._isEngineChecked = true;
    } catch (exception) {
      console.error(exception.message);
    }
  };

  // Inicio o motor
  this.startEngine = function() {
    try {
      if (!this._isEngineChecked) {
        throw new Error('You must check the engine first.');
      }
      if (this._isEngineStarted) {
        throw new Error('The engine is already started.');
      }
      console.log('vehicle - engine started');
      this._isEngineStarted = true;
    } catch (exception) {
      console.error(exception.message);
    }
  };

  // Ou para o motor
  this.stopEngine = function() {
    try {
      if (!this._isEngineStarted) {
        throw new Error('You must start the engine first.');
      }
      console.log('vehicle - engine stopped');
      this._isEngineStarted = false;
    } catch (exception) {
      console.error(exception.message);
    }
  };

  // Todos os objetos com este Mixin, passa a ter estas propriedades e métodos
};

// Agora crio um objeto que convém um Mixin de veículo
var Motorcycle = function(){
  // Ele tem uma propriedade
  this._isDoingStunt = false;

  // E métodos próprios
  // Como este que inicia uma manobra
  this.startStunt = function() {
    try {
      if (!this._isEngineStarted) {
        throw new Error('You must start the engine first.');
      }
      if (this._isDoingStunt) {
        throw new Error('You are already doing a stunt.');
      }

      console.log('motorcycle - start stunt');
      this._isDoingStunt = true;
    } catch (exception) {
      console.error(exception.message);
    }
  };

  // Ou este que para uma manobra
  this.stopStunt = function() {
    try {
      if (!this._isDoingStunt) {
        throw new Error('You must start a stunt first.');
      }

      console.log('motorcycle - stop stunt');
      this._isDoingStunt = false;
    } catch (exception) {
      console.error(exception.message);
    }
  };
};

// Agora temos outro objeto que comvém um Mixin de veículo
var Car = function(){
  // Aqui um propriedade
  this._isDoorOpened = false;

  // Um método que abre a porta do motorista
  this.openDriversDoor = function() {
    try {
      if (this._isEngineStarted) {
        throw new Error('You can\'t open the door while the engine is running.');
      }
      if (this._isDoorOpened) {
        throw new Error('The door is already opened.');
      }
      console.log('car - door opened');
      this._isDoorOpened = true;
    } catch (exception) {
      console.error(exception.message);
    }
  };

  // Outro que fecha a porta do motorista 
  this.closeDriversDoor = function() {
    try {
      if (this._isEngineStarted) {
        throw new Error('You can\'t close the door while the engine is running.');
      }
      if (!this._isDoorOpened) {
        throw new Error('The door is already closed.');
      }
      console.log('car - door closed');
      this._isDoorOpened = false;
    } catch (exception) {
      console.error(exception.message);
    }
  };
};

// Agora começa a magia
// Os objetos Motorcycle recebe tudo que um veículo tem
Motorcycle.addMixin(asVehicle);

// Os objetos Car também recebem tudo que um veículo tem
Car.addMixin(asVehicle);

//Agora quando instanciamos um novo carro
var car = new Car();
// Eu posso usar um método do veículo
car.checkEngine(); // vehicle - engine checked
// E outros do proprio carro
car.openDriversDoor(); // car - door opened
car.closeDriversDoor(); // car - door closed
car.startEngine(); // vehicle - engine started
car.stopEngine(); // vehicle - engine stopped

// Instanciamos uma nova moto
var motorcycle = new Motorcycle();
// E aqui também podemos usar os métodos do veículo
motorcycle.checkEngine(); // vehicle - engine checked
motorcycle.startEngine(); // vehicle - engine started
// E outros da própria moto
motorcycle.startStunt(); // motorcycle - start stunt
motorcycle.stopStunt(); // motorcycle - stop stunt
motorcycle.stopEngine(); // vehicle - engine stopped