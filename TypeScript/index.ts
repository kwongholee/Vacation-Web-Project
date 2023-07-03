namespace dog {
  export type Dog = string;
}
interface Dog { name : string };

let dog1 :dog.Dog = 'bark';
let dog2 :Dog = { name : 'paw' }