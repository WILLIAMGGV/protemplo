
import './App.css';
import Mostrardetalles from './componentes/Mostrardetalles';
import Mostrarpro from './componentes/Mostrarpro';
import Registroventa from './componentes/Registroventa';
import Regpro from './componentes/Regpro'
import Regofrenda from './componentes/Regofrenda'
import Mostrarofrenda from './componentes/Mostrarofrenda'



import {BrowserRouter, Route, Routes} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <Mostrarpro />}/>
          <Route path='/create' element={ <Regpro />}/>
          <Route path='/createofrenda/:fecha' element={ <Regofrenda />}/>
          <Route path='/registroventa/:id' element={ <Registroventa />}/>
          <Route path='/mostrarofrenda' element={ <Mostrarofrenda />}/>
          <Route path='/editofrenda/:id' element={ <Mostrardetalles />}/>
        
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
