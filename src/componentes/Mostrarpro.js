import React, { useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import {collection, getDocs, getDoc, deleteDoc, doc} from 'firebase/firestore'
import { db } from '../firebaseConfig/firebase'
import Logo from '../logo.png'

import Swal from 'sweetalert2'



const Mostrarpro = () => {

    const Swal = require('sweetalert2')

    //1 - configuracion de hooks
    const [protemplo, setProtemplo] = useState( [] )

    //2 - referenciamos a la DB firestore
    const protemploCollection = collection(db, "protemplo")
    
    //3 - Funcion para mostrar todos los Docs
    const getProtemplo = async() => {
    const data = await getDocs(protemploCollection)
        //console.log(data.docs)
    setProtemplo(
        data.docs.map( (doc) => ( {...doc.data(),id:doc.id}))
    )

}
    //4 - Funcion para eliminar un Doc
    const deleteProtemplo = async (id) => {
        const protemplodoc = doc(db, "protemplo", id)
        await deleteDoc(protemplodoc)  
            getProtemplo()
        }
    //5 - funcion para confirmacion para sweetalert2
    const confirmDelete = (id) => {
        Swal.fire({
            title: "Desea Eliminar este Registro?",
            text: "!Advertencia! si Elimina este registro se eliminaran todas las ventas de este protemplo",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Eliminar"
          }).then((result) => {
            if (result.isConfirmed) {
                deleteProtemplo(id)
              Swal.fire({
                title: "Eliminado!",
                text: "El Registro se Elimino",
                icon: "success"
              });
            }
          });
    }
    //6 - usamos useEffect
    useEffect( () => {
        getProtemplo()
    }, [])


    //7 - devolvemos vista de nuestro componente


  return (
    <>
    <div>
      <br></br>
      <div className='container'>
        <div className='row'>
            <div className='col'>
              <div align='center'><img src={Logo}></img></div>
              <div align='center' className='titulo1'><h2>C.C Un Nuevo Remanente</h2></div>
            <hr></hr>
              <table>
                <tr>
                  <td>
                  <div className='d-grid gap2' align="left">
                  <Link to="/create"><a className="btn btn-large btn-primary" href="#">
                  <i class="fa-solid fa-church fa-2xl"></i><br></br>Nuevo Registro</a></Link>
                  </div>
                  </td>
                  <td>
                  <div className='d-grid gap2' align="left">
                  <Link to="/mostrarofrenda"><a className="btn btn-large btn-success" href="#">
                  <i class="fa-solid fa-money-check-dollar fa-2xl"></i><br></br>Ofrendas y Diezmos</a></Link>
                  </div>
                  </td>
                </tr>
              </table>
              <br></br>
            
            <table className='table table-success table-hover'>
                <thead>
                    <tr  class="table-primary">
                        <th>Nombre</th>
                        <th>Monto (BS)</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    { protemplo.map( (protemplo) => (
                        <tr key={protemplo.id}>
                        <td>{protemplo.nombre}</td>
                        <td>{protemplo.monto}</td>
                        <td>
                        <Link to={`/editofrenda/${protemplo.id}`} className='btn btn-light'><i className="fa-solid fa-house"></i> Entrar</Link>
                        &nbsp;<button onClick={() => { confirmDelete(protemplo.id) } } className='btn btn-danger'><i className="fa-solid fa-trash-can"></i></button>
                        </td>
                        </tr>
                    ))}
                </tbody>

            </table>

            </div>
        </div>
      </div>
    </div>


    
    <br></br>
    <br></br>
    <hr></hr>
    
    
    <div className='container'>
    <div class="alert alert-primary" role="alert">
    <figure class="text-center">
  <blockquote class="blockquote">
  <i class="fa-solid fa-book-bible fa-xl"></i>
  
    <p>pero hágase todo decentemente y con orden.</p>
  </blockquote>
  <figcaption class="blockquote-footer">
  1 Corintios 14:40<cite title="Source Title"></cite>
  </figcaption>
</figure>
    </div>
    </div>

    <div className='container'>

    <div class="alert alert-dark" role="alert">
          <div><strong>Desarrollado Por:</strong> William Godoy</div>
          <div>Protemplo v1.0</div>
          <hr></hr>
          <table align='center' width="40%">
            <tr>
              <td width="20%"><a href='https://www.tiktok.com/@williamggv' target='_blank'><i className="fa-brands fa-tiktok fa-2xl colortiktok"></i></a></td>
              <td width="20%"><a href='https://www.facebook.com/williamgrevill/' target='_blank'><i className="fa-brands fa-facebook fa-2xl colorfacebook"></i></a></td>
              <td  width="20%"><a href='https://wa.me/+584126515046' target='_blank'><i className="fa-brands fa-whatsapp fa-2xl colorwhatsapp"></i></a></td>
            </tr>
          </table>
          </div>         

   </div>
    </>
  )
}

export default Mostrarpro
