import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
// import ProtectedRoute from './components/ProtectedRoute';
import OTPVerification from './components/authentication/OtpVerify';
import AccountSetup from './components/authentication/AccountSetup';
import Login from './components/authentication/Login';
import Registration from './components/authentication/Registration';
import Chat from "./components/Chat";
import History from "./components/History";
import './components/css/Star.css'
import { CRUDData } from './CRUDdata';

function Crud() {
  const [data,setData] =useState([]);
  const[firstName, setFirstName]= useState('')
  const[lastName, setLastName]= useState('')
  const[age, setAge]= useState(0)
  const[id, setId]= useState(0)
  const[isUpdate, setIsUpdate]=useState(false)

  useEffect(() =>{
    setData(CRUDData)
  },[]);

  const handleEdit =(id)=> {
    // alert(id);
    const dt = data.filter(item => item.id === id);
    if(dt !== undefined)
    {
      setIsUpdate(true)
      setId(id);
      setFirstName(dt[0].firstName);
      setLastName(dt[0].lastName);
      setAge(dt[0].age);
    }
  } 

  const handleDelete =(id)=> {
    // alert(id);
    if(id>0){
      if(window.confirm("Are you sure to delete this item?")){
      const dt =data.filter(item => item.id!==id);
      setData(dt);
      }

    }
  }
  const handleSave =(e)=> {
    let error = '';
    if(firstName === '')
      error += 'First Name is required, ';

    if(lastName === '')
      error += 'Last Name is required,';

    if(age <=0)
      error += 'age is required.';
    if (error === '')
    {
    e.preventDefault();
    const dt =[...data];
    const newObject =
    {
      
      id:CRUDData.length+1,
      firstName: firstName,
      lastName:lastName,
      age:age
    }
    dt.push(newObject);
  setData(dt);
  }
  else{
    alert(error);
  }
  }
  const handleUpdate =()=> {
    const index=data.map((item)=>{
      return item.id
    }).indexOf(id);
    const dt = [...data];
    dt[index].firstName = firstName;
    dt[index].lastName = lastName;
    dt[index].age = age;

    setData(dt);
    handleClear();
  }
  const handleClear =()=> {
    setId(0);
    setFirstName('');
    setLastName('');
    setAge('');
    setIsUpdate(false);
  }
  return (
    <div className='APP'>
      <div style={{display:'flex',justifyContent:"center" ,marginTop:"10px",marginBottom:"10px"}}>
        <div>
          <label>First Name:
            <input type='text' placeholder='Enter First Name' onChange={(e) => setFirstName(e.target.value)} value={firstName}/>

          </label>
        </div>
        <div>
          <label>Last Name:
            <input type='text' placeholder='Enter Last Name' onChange={(e) => setLastName(e.target.value)} value={lastName}/>

          </label>
        </div>
        <div>
          <label>Age:
            <input type='text' placeholder='Enter Age ' onChange={(e) => setAge(e.target.value)} value={age}/>

          </label>
        </div>
        <div>
          {
            !isUpdate ?
            <button className='btn btn-primary' onClick={(e)=> handleSave(e)}>Save</button>
            :
        <button className='btn btn-primary' onClick={()=> handleUpdate()}>Update</button>
          }
        
        <button className='btn btn-danger' onClick={()=> handleClear()}>Clear</button>
        </div>
      </div>


    
//       <table className='table table-hover'>
//         <thead>
//           <tr>
//             <td>Sr.no</td>
//             <td>Id</td>
//             <td>First Name</td>
//             <td>Last Name</td>
//             <td>age</td>
//             <td>Actions</td>
//           </tr>
//         </thead>
//         <tbody>
//           {
            data.map((item,index)=>{
              return(
                <tr key={index}>
                  <td>{index +1}</td>
                  <td>{item.id}</td>
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td>{item.age}</td>
                  <td>
                    <button className='btn btn-primary' onClick={()=> handleEdit(item.id)}>Edit</button>&nbsp;
                    <button className='btn btn-danger' onClick={()=> handleDelete(item.id)}>Delete</button>
                    
                  </td>
                </tr>
                
              )

            })
          }
        </tbody>
      </table>

    </div>





  );
}

export default Crud;
