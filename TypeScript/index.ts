type Name = string | number;

let 이름 :Name = 'kim';

function func(x :number) :number {
  return x * 2;
}

type Member = [number, boolean];
let john :Member = [123, true];

type Member2 = {
  [key :string]: string
}
let jon :Member2 = {name: 'kim'};