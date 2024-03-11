import React, { useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import {collection, getDocs, getDoc, deleteDoc, doc, addDoc, setDoc, query, where} from 'firebase/firestore'
import { db } from '../firebaseConfig/firebase'
import Logo from '../logo.png'

import Swal from 'sweetalert2'




// CARGAMOS LA FECHA ACTUAL
const timestamp = Date.now();
var dateDB = new Date(timestamp);

var monthArrayNames = [];
monthArrayNames[0] = "01";
monthArrayNames[1] = "02";
monthArrayNames[2] = "03";
monthArrayNames[3] = "04";
monthArrayNames[4] = "05";
monthArrayNames[5] = "06";
monthArrayNames[6] = "07";
monthArrayNames[7] = "08";
monthArrayNames[8] = "09";
monthArrayNames[9] = "10";
monthArrayNames[10] = "11";
monthArrayNames[11] = "12";


var day = dateDB.getDate();
if (day === 1){
    day = '01'
} 
if (day === 2){
    day = '02'
} 
if (day === 3){
    day = '03'
} 
if (day === 4){
    day = '04'
} 
if (day === 5){
    day = '05'
} 
if (day === 6){
    day = '06'
} 
if (day === 7){
    day = '07'
} 
if (day === 8){
    day = '08'
} 
if (day === 9){
    day = '09'
} 

var month = monthArrayNames[dateDB.getMonth()];
var year = dateDB.getFullYear();
var timestampobj = `${year}-${month}-${day}`;

//FIN DE CARGA DE FECHA

const Mostrarofrenda = () => {






//hooks
const [ofrendas, setOfrendas] = useState( [] )

var total = 0;

ofrendas.map( (ofrendas) => (
  total = total+parseInt(ofrendas.monto)
))





const [fecha, setFecha] = useState(timestampobj)




//base de datos
const ofrendasCollection = collection(db, "ofrendas")


const citiesRef = collection(db, "ofrendas");



//cargar la data
const getOfrendas = async() => {
    const q = query(citiesRef, where("fecha", "==", fecha));


    const querySnapshot = await getDocs(q);

        
    setOfrendas(
      querySnapshot.docs.map( (doc) => ( {...doc.data(),id:doc.id}
      ))
    
      
     

    )


    }


  

    const mostrarfecha = () => {
        
  
    }

       //4 - Funcion para eliminar un Doc
       const deleteOfrenda = async (id) => {
        const ofrendadoc = doc(db, "ofrendas", id)
        await deleteDoc(ofrendadoc)  
            getOfrendas()
        }

            //5 - funcion para confirmacion para sweetalert2
    const confirmDeleteOfrenda = (id) => {
        Swal.fire({
            title: "Desea Eliminar este Registro de Ofrenda?",
            text: "",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Eliminar"
          }).then((result) => {
            if (result.isConfirmed) {
                deleteOfrenda(id)
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
            getOfrendas()
       
        }, [fecha])

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
                  <Link to={`/createofrenda/${fecha}`}><a className="btn btn-large btn-primary" href="#">
                  <i class="fa-solid fa-money-check-dollar fa-2xl"></i><br></br>Nuevo Registro</a></Link>
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
              <br></br>
              <div align="left"><input type="date" 
              value={fecha}
              onChange={ (e) => setFecha(e.target.value)}
              
                 className='titulo3' min="2024-01-01" max="2034-12-31"></input></div>
              <br></br>
            <table className='table table-success table-hover'>
                <thead>
                    <tr class="table-primary">
                        <th>Forma de Ofrendar</th>
                        <th>Total (Bs)</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    { ofrendas.map( (ofrendas) => (
                        <tr key={ofrendas.id}>
                   
                        <td>{ofrendas.tipo}</td>
                        <td>{ofrendas.monto}</td>
                        <td>
                        <button onClick={() => { confirmDeleteOfrenda(ofrendas.id) } } className='btn btn-danger'><i className="fa-solid fa-trash-can"></i></button>
                        </td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
    <tr>
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

export default Mostrarofrenda
