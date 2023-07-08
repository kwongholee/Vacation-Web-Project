import { useState } from 'react';
import './App.css';

let a = <div></div>;

function App() {
  let [user, setUser] = useState('kim');

  return (
    <div>
      <h4>hello</h4>
      <Profile name="철수"></Profile>
    </div>
  );
}

function Profile(props :{name :string}) :JSX.Element {
  return (
    <div>{props.name}</div>
  )
}

export default App;