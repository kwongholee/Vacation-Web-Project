interface Calc {
  plus : (a :number, b :number) => number
  minus : (a :number, b :number) => number
}

let object :Calc = {
  plus(a,b) {
    return a+b;
  },
  minus(a,b) {
    return a-b;
  }
}