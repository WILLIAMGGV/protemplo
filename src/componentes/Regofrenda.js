import React, { useState } from 'react'

import { useNavigate, useParams } from "react-router-dom"
import { db } from '../firebaseConfig/firebase'
import {collection, addDoc} from 'firebase/firestore'
import Logo from '../logo.png'

const Regofrenda = () => {

    
    const [ tipo, setTipo ] = useState('')
    const [ monto, setMonto ] = useState()
    const navigate = useNavigate()

    const {fecha} = useParams()

    

    const ofrendaCollection = collection(db, "ofrendas")

    const store = async (e) => {
        e.preventDefault()
        await addDoc(ofrendaCollection, { monto: monto, tipo: tipo, fecha: fecha})
        navigate('/mostrarofrenda')
    }

    const volveraofrendas = () => {
      navigate('/mostrarofrenda')
    }

  return (
    <div>
        <br></br>
    <div className='container'>
      <div className='row'>
          <div className='col'>
          <div align='center'><img src={Logo}></img></div>
              <div align='center' className='titulo1'><h2>C.C Un Nuevo Remanente</h2></div>
            <hr></hr>
            <div class="alert alert-warning titulo2" role="alert">Registrar Ofrenda</div>
                  <form onSubmit={store}>

                      <div className='mb-3' align='left'>
                        <br></br>
                          
                          
                          <div class="form-group">
                          <label className='form-label titulo3' align='left'>Forma de Ofrendar</label>
                             <select class="form-control" id="forma" value={tipo}
                          onChange={ (e) => setTipo(e.target.value)}>
                            <option></option>
                              <option>Efectivo</option>
                               <option>Transferencia</option>
                               <option>Pago Movil</option>
                                <option>Otros</option>
                               </select>
                          </div>
                          
                         
                      </div>

                      <div className='mb-3' align='left'>
                      <label className='form-label titulo3' align='left'>Monto</label>
                          <input
                          value={monto}
                          onChange={ (e) => setMonto(e.target.value)}
                          type='number'
                          className='form-control'
                          />
                      </div>
                      <button type='submit' className='btn btn-primary'><i class="fa-regular fa-floppy-disk fa-lg"></i> Guardar</button>&nbsp;
                      <button type='button' onClick={ volveraofrendas } className='btn btn-warning'><i class="fa-solid fa-xmark fa-lg"></i> Cancelar</button>
                  </form>

          </div>
      </div>
    </div>
  </div>
  )
}

export default Regofrenda
