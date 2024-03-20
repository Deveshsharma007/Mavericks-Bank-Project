import React, { useEffect, useState } from 'react';
import '../Components/AdminDashboard.css';
import CustomerService from '../Services/CustomerService';
import EmployeeService from '../Services/EmployeeService';
import { Link } from 'react-router-dom';
import AdminService from '../Services/AdminService';
import toast from 'react-hot-toast';
import { useAuth } from './AuthContext';

const AdminDashboard = () => {
  const [customerArray, setCustomerArray] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [empId,setEmpId]=useState();
  const [employeeName,setName]=useState();
  const [dateOfBirth,setDateOfBirth]=useState();
  const [address,setAddress]=useState();
  const [phoneNumber,setPhoneNumber]=useState();
  const [panCardNumber,setPanCardNumber]=useState();
  const [email,setEmail]=useState();
  const [username,setEmpUsername]=useState();
  const [password,setPassword]=useState();
  const [employee,setEmployee]=useState([]);
  const {token}=useAuth();


  useEffect(() => {
    fetchAllAccounts();
  }, []);

  const fetchEmployees=()=>{
    AdminService.viewAllEmployee(token).then((response)=>{
      console.log("Employee Response from api:- ",response.data);
      setEmployee(response.data);
    }).catch((error)=>{
      console.log(error);
    })
  }

  const handleAddEmployee=(e)=>{
    e.preventDefault();
    
    addEmployee();
  }

  const addEmployee=()=>{
const employee={employeeName,dateOfBirth,address,phoneNumber,panCardNumber,email};
console.log("employee data is:- ",employee);
      AdminService.addEmployee(employee,token).then((response)=>{
        console.log("Response from api:-",response.data);
        registerEmployee(response.data.employeeId,response.data.employeeName,response.data.email,username,password);
      }).catch((error)=>{
        console.log(error.response.data);
            if (error.response.data.phoneNumber) {
                toast.error(error.response.data.phoneNumber, {
                    autoClose: 90000, 
                });
            }
            if (error.response.data.panCardNumber) {
                toast.error(error.response.data.panCardNumber, {
                    autoClose: 90000, 
                });
            }
            if (error.response.data.age) {
              toast.error(error.response.data.age, {
                  autoClose: 90000,
              });
          }
    });
  }

 const registerEmployee=(customerId,name,email,username,password)=>{
    const details={customerId,name,email,username,password};
        AdminService.registerEmployee(details).then((response)=>{
          console.log("Response from api:-",response.data);
          toast.success(response.data);
        }).catch((error)=>{
          console.log(error.response.data);
        toast.error(error.response.data.message);
      });
  }

  const deleteEmployee=()=>{
    if (window.confirm("Do you want to DELETE this EMPLOYEE?")){
      AdminService.deleteEmployee(empId,token).then((response)=>{
        console.log("Response from api:-",response.data)
        toast.success(response.data);
      }).catch((error)=>{console.log(error)
      toast.error(error.response);
      });
    }
  }

  const getCustomerById = (customerId) => {
    CustomerService.getCustomerById(customerId,token).then((response) => {
      setCustomer(response.data);
      console.log("Customer Details :", response.data);
    }).catch((error) => { console.log(error) });
  }

  const fetchAllAccounts = () => {
    CustomerService.getAllAccounts(token)
      .then((response) => {
        console.log("All Account Response Received from API:- ", response.data);
        setCustomerArray(response.data);
      }).catch((error) => {
        console.log(error);
      });
  }

  const handleCustomerCheck = (e, customerId) => {
    e.preventDefault();
    console.log("Customer Id inside handle check function:- ", customerId);
    getCustomerById(customerId);
  }

  const handleActivate = (e, number) => {
    e.preventDefault();
    console.log("Id is:- ", number);
    EmployeeService.activateAccount(number,token).then((response) => {
      console.log("response from api:- ", response.data);
      toast.success(response.data);
      fetchAllAccounts();
    }).catch((error) => { console.log(error) })

  }

  const handleClose = (e, number) => {
    e.preventDefault();
    console.log("Id is:- ", number);
    EmployeeService.closeAccount(number,token).then((response) => {
      console.log("response from api:- ", response.data);
      toast.success(response.data);
      fetchAllAccounts();
    }).catch((error) => { console.log(error) })
  }


  return (
    <div className='admin-dashboard'>
      <div>
      <div><button className="btn btn-primary" style={{
                margin: '15px',
                float: 'left'
            }}
                type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fillRule="currentColor"
                    className="bi bi-list"
                    viewBox="0 0 16 16"
                >
                    <path
                        fillRule="evenodd"
                        d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
                    />
                </svg>Options
            </button></div>
            <div className="offcanvas offcanvas-bottom offcanvas-md"  id="offcanvasExample" aria-labelledby="offcanvasExampleLabel" style={{marginBottom:'7%'}}>
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasExampleLabel">Services</h5>
                </div>
                <div className="offcanvas-body" >
                    <div className='btn btn-group-vertical' >
                    <button type="button"
                      className="btn btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal3"
                      data-bs-dismiss="offcanvas" style={{ margin: '10px',color:'white' }} onClick={fetchEmployees}
                      >View Employees</button>
                      <button type="button"
                      className="btn btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal1" data-bs-dismiss="offcanvas" style={{ margin: '10px',color:'white' }}>Add Employee</button>
                      <button className="btn btn-danger" type="button"
                      data-bs-toggle="modal"
                      data-bs-dismiss="offcanvas"
                      data-bs-target="#exampleModal2" style={{ margin: '10px' }}>Delete Employee</button>
                      <Link to='/adminloandashboard'><button className="btn btn-primary" style={{ margin: '10px',color:'white' }}
                      data-bs-dismiss="offcanvas">Loan Dashboard</button></Link> 
                    </div>
                </div>
            </div>

        <h2 style={{ marginTop: '10px' }}>Admin Dashboard</h2>

        {/*Account Details */}
        <div className='account-details'>
          <h5>Account Details</h5><br />
          <div className='table'>
            <table style={{ padding: '10px' }}>
              <thead>
                <tr>
                  <td>Customer ID</td>
                  <td>Customer Name</td>
                  <td>Account Number</td>
                  <td>Account Type</td>
                  <td>Account Balance</td>
                  <td>Account Status</td>
                  <td>Activate</td>
                  <td>Close</td>
                  <td>Check Account</td>
                  <td>Check Customer</td>
                </tr>
              </thead>
              <tbody>
                {customerArray.map((c, k) => (
                  <tr key={k}>
                    <td>{c.customerId}</td>
                    <td>{c.customerName}</td>
                    <td>{c.accountNumber}</td>
                    <td>{c.accountType}</td>
                    <td>{c.accountBalance}</td>
                    <td>{c.accountStatus}</td>
                    <td><button className='btn btn-primary' onClick={(e) => { handleActivate(e, c.accountNumber) }}
                    disabled={c.accountStatus === "CLOSED" || c.accountStatus === "CLOSE_REQUEST" || c.accountStatus === "ACTIVE"}
                    >Activate</button></td>
                    <td><button className='btn btn-danger' onClick={(e) => { handleClose(e, c.accountNumber) }}
                    disabled={c.accountStatus === "CLOSED" || c.accountStatus === "INACTIVE"}
                    >Close</button></td>
                    <td><Link to={`/employeeaccountdashboard/${c.accountNumber}`}><button className='btn btn-primary'>Check</button></Link></td>
                    <td><button
                      type="button"
                      className="btn btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      onClick={(e) => { handleCustomerCheck(e, c.customerId) }}
                    >
                      Check
                    </button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <br /><br />
        {/*Check Customer details */}
        {/* <!-- Modal --> */}
        <div
          className="modal fade"
          id="exampleModal"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true" >
          <div className="modal-dialog modal-fullscreen">
            <div className="modal-content">
              <div className="modal-header">
                <h3 className="modal-title fs-5" id="exampleModalLabel">
                  Customer Details
                </h3>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <table className='table table-borderless'>
                  <thead>
                    <tr>
                      <td style={{ backgroundColor: "#566822", color: "white" }}>Customer Id</td>
                      <td style={{ backgroundColor: "#566822", color: "white" }}>Customer Name</td>
                      <td style={{ backgroundColor: "#566822", color: "white" }}>Phone Number</td>
                      <td style={{ backgroundColor: "#566822", color: "white" }}>Gender</td>
                      <td style={{ backgroundColor: "#566822", color: "white" }}>Email</td>
                      <td style={{ backgroundColor: "#566822", color: "white" }}>Pan Card Number</td>
                      <td style={{ backgroundColor: "#566822", color: "white" }}>Aadhar Number</td>
                      <td style={{ backgroundColor: "#566822", color: "white" }}>Address</td>
                      <td style={{ backgroundColor: "#566822", color: "white" }}>Date of Birth</td>
                      <td style={{ backgroundColor: "#566822", color: "white" }}>Age</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{customer.customerId}</td>
                      <td>{customer.customerName}</td>
                      <td>{customer.phoneNumber}</td>
                      <td>{customer.gender}</td>
                      <td>{customer.email}</td>
                      <td>{customer.panNumber}</td>
                      <td>{customer.aadharNumber}</td>
                      <td>{customer.address}</td>
                      <td>{customer.dateOfBirth}</td>
                      <td>{customer.age}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>

{/*Check Employee details */}
        {/* <!-- Modal --> */}
        <div
          className="modal fade"
          id="exampleModal3"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true" >
          <div className="modal-dialog modal-fullscreen">
            <div className="modal-content">
              <div className="modal-header">
                <h3 className="modal-title fs-5" id="exampleModalLabel">
                  Customer Details
                </h3>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <table className='table table-borderless'>
                  <thead>
                    <tr>
                      <td style={{ backgroundColor: "#566822", color: "white" }}>Employee Id</td>
                      <td style={{ backgroundColor: "#566822", color: "white" }}>Employee Name</td>
                      <td style={{ backgroundColor: "#566822", color: "white" }}>Phone Number</td>                      
                      <td style={{ backgroundColor: "#566822", color: "white" }}>Email</td>
                      <td style={{ backgroundColor: "#566822", color: "white" }}>Pan Card Number</td>
                      <td style={{ backgroundColor: "#566822", color: "white" }}>Status</td>
                      <td style={{ backgroundColor: "#566822", color: "white" }}>Address</td>
                      <td style={{ backgroundColor: "#566822", color: "white" }}>Date of Birth</td>
                      <td style={{ backgroundColor: "#566822", color: "white" }}>Age</td>
                    </tr>
                  </thead>
                  <tbody>
                    {employee.map((e,key)=>(
                        <tr key={key}>
                          <td>{e.employeeId}</td>
                          <td>{e.employeeName}</td>
                          <td>{e.phoneNumber}</td>
                          <td>{e.email}</td>
                          <td>{e.panCardNumber}</td>
                          <td>{e.employeeStatus}</td>
                          <td>{e.address}</td>
                          <td>{e.dateOfBirth}</td>
                          <td>{e.age}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- add employee Modal --> */}
        <div
          className="modal fade"
          id="exampleModal1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true" >
          <div className="modal-dialog">
            <div className="modal-content" >
              <div className="modal-header">
              <h4 className="modal-title " id="exampleModalLabel" style={{color:'black'}}>
                  Add Employee</h4>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
              <div className='add-emp-div' style={{display:'flex',float:'left',flexDirection:'column',textAlign:'left',color:'black',fontWeight:'bold'}}>
                <label> 
                  Enter Employee Name: 
                  <input id='input' type='text' placeholder='Name' onChange={(e)=>{setName(e.target.value)}} style={{margin:'10px'}}></input>
                </label>
                <label>
                  Enter Date of Birth: 
                  <input id='input' type='date' placeholder="DD-MM-YYYY" onChange={(e)=>{setDateOfBirth(e.target.value)}} style={{margin:'10px'}}></input>
                </label>
                <label>
                  Enter Address: 
                  <input id='input' type='text' placeholder='Address' onChange={(e)=>{setAddress(e.target.value)}} style={{margin:'10px'}}></input>
                </label>
                <label>
                  Enter Phone Number: 
                  <input id='input' type='text' placeholder='Phone Number' onChange={(e)=>{setPhoneNumber(e.target.value)}} style={{margin:'10px'}}></input>
                </label>
                <label>
                  Enter Pan Card Number: 
                  <input id='input' type='text' placeholder='Pan Card Number' onChange={(e)=>{setPanCardNumber(e.target.value)}} style={{margin:'10px'}}></input>
                </label>
                <label>
                  Enter EmailId: 
                  <input id='input' type='text' placeholder='Email' onChange={(e)=>{setEmail(e.target.value)}} style={{margin:'10px'}}></input>
                </label>
                <label>
                  Enter UserName: 
                  <input id='input' type='text' placeholder='Username' onChange={(e)=>{setEmpUsername(e.target.value)}} style={{margin:'10px'}}></input>
                </label>
                <label>
                  Enter Password: 
                  <input id='input' type='text' placeholder='Password' onChange={(e)=>{setPassword(e.target.value)}} style={{margin:'10px'}}></input>
                </label>
               </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                  onClick={(e)=>{handleAddEmployee(e)}}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- delete employee Modal --> */}
        <div
          className="modal fade"
          id="exampleModal2"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true" >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title " id="exampleModalLabel" style={{color:'black'}}>
                  Delete Employee</h4>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className='add-emp-div' style={{color:'black',fontWeight:'bold'}}>
                <label>
                  Enter Employee ID:
                  <input id='input' type='number' min={0} placeholder='Employee ID' onChange={(e)=>{setEmpId(e.target.value)}}></input>
                </label>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                  onClick={deleteEmployee}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard; 