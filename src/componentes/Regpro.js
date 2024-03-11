import React, { useState } from 'react'

import { useNavigate } from 'react-router-dom'
import { db } from '../firebaseConfig/firebase'
import {collection, addDoc} from 'firebase/firestore'
import Logo from '../logo.png'

const Regpro = () => {

    
    const [ nombre, setNombre ] = useState('')
    const [ monto, setMonto ] = useState()
    const navigate = useNavigate()

    const protemploCollection = collection(db, "protemplo")

    const store = async (e) => {
        e.preventDefault()
        await addDoc(protemploCollection, { nombre: nombre, monto: monto})
        navigate('/')
    }

    const volveraofrendas = () => {
      navigate('/')
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
            <div class="alert alert-warning titulo2" role="alert">Nuevo Protemplo</div>
                  <form onSubmit={store}>

                      <div className='mb-3' align='left'>
                        <br></br>
                          <label className='form-label titulo3' align='left'>Nombre</label>
                          <input
                          value={nombre}
                          onChange={ (e) => setNombre(e.target.value)}
                          type='text'
                          className='form-control'
                          />
                      </div>

                      <div className='mb-3' align='left'>
                      <label className='form-label titulo3' align='left'>Precio</label>
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

export default Regpro
