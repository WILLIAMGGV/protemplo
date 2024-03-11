import React, { useState, useEffect} from 'react'

import { useNavigate, useParams } from "react-router-dom"
import { db } from '../firebaseConfig/firebase'
import {collection, getDocs, getDoc, deleteDoc, doc, addDoc, setDoc, query, where} from 'firebase/firestore'
import Logo from '../logo.png'

const Registroventa = () => {

    
    const [ tipodepago, setTipodepago ] = useState('')
    const [ nombre, setNombre ] = useState('')
    const [ precio, setPrecio ] = useState(0)
    const [ cantidad, setCantidad ] = useState(0)
    const [ total, setTotal ] = useState(0)

    const navigate = useNavigate()

    const {id} = useParams()



    const detallesproCollection = collection(db, "detalles-protemplo")

    const store = async (e) => {
        e.preventDefault()
        await addDoc(detallesproCollection, { idprotemplo: id, cantidad: cantidad, nombre: nombre, precio: precio, tipodepago: tipodepago, total: total})
        navigate(`/editofrenda/${id}`)
    }

    const getCosto = async (id) => {
      
      const product = await getDoc( doc(db, "protemplo", id) )
      if(product.exists()) {

        setPrecio(product.data().monto) 
     
        setTotal(parseInt(cantidad)*parseInt(precio))
     
      }else{
          console.log('El producto no existe')
      }
      
  }

    const volveraofrendas = () => {
      navigate(`/editofrenda/${id}`)
    }

    useEffect( () => {

      getCosto(id)

  }, [cantidad])

  return (
    <div>
        <br></br>
    <div className='container'>
      <div className='row'>
          <div className='col'>
          <div align='center'><img src={Logo}></img></div>
              <div align='center' className='titulo1'><h2>C.C Un Nuevo Remanente</h2></div>
            <hr></hr>
            <div class="alert alert-warning titulo2" role="alert"> <i class="fa-solid fa-burger fa-2xl"></i> Registrar Venta</div>
                  <form onSubmit={store}>

                      <div className='mb-3' align='left'>

                          
                        <div className='mb-3' align='left'>
                      <label className='form-label titulo3' align='left'>Nombre</label>
                          <input
                          value={nombre}
                          onChange={ (e) => setNombre(e.target.value)}
                          type='text'
                          className='form-control'
                          />
                      </div>
                          
                          <div class="form-group">
                          <label className='form-label titulo3' align='left'>Forma de Pago</label>
                             <select class="form-control" id="tipodepago" value={tipodepago}
                          onChange={ (e) => setTipodepago(e.target.value)}>
                            <option value=''></option>
                              <option value='Efectivo'>Efectivo</option>
                              <option value='Punto de Venta'>Punto de Venta</option>
                               <option value='Transferencia'>Transferencia</option>
                               <option value='Pago Movil'>Pago Movil</option>
                                <option value='Prestamo'>Prestamo</option>
                               </select>
                          </div>

                          <div class="form-group">
                          <label className='form-label titulo3' align='left'>Cantidad</label>
                             <select class="form-control" id="cantidad" value={cantidad}
                          onChange={ (e) => setCantidad(e.target.value)}>
                            <option></option>
                              <option value='1' selected='selected'>1</option>
                              <option value='2'>2</option>
                               <option value='3'>3</option>
                               <option value='4'>4</option>
                                <option value='5'>5</option>
                                <option value='6'>6</option>
                                <option value='7'>7</option>
                                <option value='8'>8</option>
                                <option value='9'>9</option>
                                <option value='10'>10</option>
                             

                               </select>
                          </div>   
                          
                         
                      </div>

                      

                      <div class="alert alert-primary titulo3" role="alert"> <i class="fa-solid fa-file-invoice fa-2xl"></i> Total a Pagar: {total} Bs</div>
            
                      <button type='submit' className='btn btn-primary'><i class="fa-regular fa-floppy-disk fa-lg"></i> Guardar</button>&nbsp;
                      <button type='button' onClick={ volveraofrendas } className='btn btn-warning'><i class="fa-solid fa-xmark fa-lg"></i> Cancelar</button>
                  </form>

          </div>
      </div>
    </div>
  </div>
  )
}

export default Registroventa
