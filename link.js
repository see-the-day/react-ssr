class Link {
  constructor(value) {
    this._value = value;
  }
  add() {
    this._value += 1;
    return this;
  }
  take() {
    this._value *= 3;
    return this;
  }
  getValue() {
    return this._value;
  }
}

const link = new Link(3);

// console.log(link.add().take().getValue());

class Ref {
  constructor(v) {
    this._value = v;
  }
  get value() {
    console.log('get');
    return this._value;
  }
  set value(value) {
    console.log('set');
    this._value = value;
  }
}

let a = new Ref(1);
a.value = 2;
console.log(a.value);
