import './App.css';
import { useState } from 'react';

function App() {
  const [Nombre,setNombre] = useState("");
  const [Email,setEmail] = useState("");
  return (
    <div className="App">
      <div className='datos'>
        <label>Nombre: <input onChange={(event)=>{
          setNombre(event.target.value)}} 
          type='text'></input></label>
        <label>Email: <input onChange={(event)=>{
          setEmail(event.target.value)}}
          type='email'></input></label>
        <button>Registrar</button>
      </div>
    </div>
  );
}

export default App;
