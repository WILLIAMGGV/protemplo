import React, { useState, useEffect} from 'react'
import { useNavigate, useParams } from "react-router-dom"
import { Link } from 'react-router-dom'
import {collection, getDocs, getDoc, deleteDoc, doc, addDoc, setDoc, query, where} from 'firebase/firestore'
import { db } from '../firebaseConfig/firebase'
import Logo from '../logo.png'

import Swal from 'sweetalert2'




const Mostrardetalles = () => {


//hooks
const [detallespro, setDetallespro] = useState( [] )
const [monto, setMonto] = useState(0)
const [descripcion, setDescripcion] = useState('')

const navigate = useNavigate()

var total = 0
var costo = 0

detallespro.map( (detallespro) => (
  total = total+parseInt(detallespro.total)
))




const {id} = useParams()


const citiesRef = collection(db, "detalles-protemplo");



//cargar la data
const getDetallespro = async() => {
    const q = query(citiesRef, where("idprotemplo", "==", id));


    const querySnapshot = await getDocs(q);

        
    setDetallespro(
      querySnapshot.docs.map( (doc) => ( {...doc.data(),id:doc.id}
      ))
  
    )
    }


    const getCosto = async (id) => {
      
      const product = await getDoc( doc(db, "protemplo", id) )
      if(product.exists()) {
          
        setMonto(product.data().monto)    
        setDescripcion(product.data().nombre)
      }else{
          console.log('El producto no existe')
      }
  }


  



       //4 - Funcion para eliminar un Doc
       const deleteDetallespro = async (id) => {
        const detalledoc = doc(db, "detalles-protemplo", id)
        await deleteDoc(detalledoc)  
            getDetallespro()
        }

            //5 - funcion para confirmacion para sweetalert2
    const confirmDeleteDetalles = (id) => {
        Swal.fire({
            title: "Desea Eliminar este Registro de Venta?",
            text: "",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Eliminar"
          }).then((result) => {
            if (result.isConfirmed) {
                deleteDetallespro(id)
      
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
            getDetallespro()
            getCosto(id)

        }, [])

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
                  <Link to={`/registroventa/${id}`}><a className="btn btn-large btn-primary" href="#">
                  <i class="fa-solid fa-burger fa-2xl"></i><br></br>Nueva Venta</a></Link>
                  </div>
                  </td>
                  <td>
                  <div className='d-grid gap2' align="left">
                  <Link to="/"><a className="btn btn-large btn-success" href="#">
                  <i class="fa-solid fa-church fa-2xl"></i><br></br>Pro-Templo</a></Link>
                  </div>
                  </td>
                </tr>
              </table>
           
        
              <hr></hr>
            <div class="alert alert-warning titulo2" role="alert">{descripcion}</div>

            <table className='table table-success table-hover'>
                <thead>
                    <tr class="table-primary">
                        <th>Nombre</th>
                        <th>Forma de Pago</th>
                        <th>Cantidad</th>
                        <th>Total (Bs)</th>
                        <th><i class="fa-solid fa-hand-point-down fa-lg"></i></th>
                    </tr>
                </thead>

                <tbody>
                    { detallespro.map( (detallespro) => (
                        <tr key={detallespro.id}>
                   
                        <td>{detallespro.nombre}</td>
                        <td>{detallespro.tipodepago}</td>
                        <td>{detallespro.cantidad}</td>
                        <td>{detallespro.total}</td>
                        <td>
                        <button onClick={() => { confirmDeleteDetalles(detallespro.id) } } className='btn btn-danger'><i className="fa-solid fa-trash-can"></i></button>
                        </td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
    <tr>
      <th colSpan='2'><strong>Costo (Bs): </strong><span className='titulo3'>{monto}</span></th>
  
      <th><strong>Total (Bs)</strong></th>
      <td bgcolor="white"><span className='titulo3'>{total}</span></td>
      <td></td>
    </tr>
  </tfoot>
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

export default Mostrardetalles
