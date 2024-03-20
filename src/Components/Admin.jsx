import React, { useEffect, useState } from "react";
import AdminService from "../Services/AdminService";
import { Link, useParams } from "react-router-dom";

export const AddBankEmployee = () => {
  const [employeeName, setEmployeeName] = useState({});
  const [dateOfBirth, setDateOfBirth] = useState({});
  const [address, setAddress] = useState({});
  const [phoneNumber, setPhoneNumber] = useState({});
  const [panCardNumber, setPanCardNumber] = useState({});

  const saveEmployee = (e) => {
    e.preventDefault();
    const employee = {
      employeeName,
      dateOfBirth,
      address,
      phoneNumber,
      panCardNumber, }; 
    console.log("Employee Details from the form : ", employee);
    AdminService.addEmployee(employee).then((response) => {
        console.log("respone data from api:", JSON.stringify(response.data));
      }).catch((error) => {console.log(error);
     });
  };

  return (
    <div>
      <div className="container">
        <div className="card">
          <h2>Add Employee Form</h2>
          <div className="card-body">
            <form onSubmit={saveEmployee}>
              <div className="form-group mb-2">
                {/* Customer name */}
                <label className="form-label">Name</label>
                <input type="text"
                  placeholder="Enter your name"
                  name="employeeName"
                  value={employeeName}
                  className="form-control"
                  onChange={(e) => {
                    setEmployeeName(e.target.value);
                  }}
                />
                {/* Date Of Birth */}

                <label className="form-label">Date Of Birth</label>
                <input
                  type="date"
                  value={dateOfBirth}
                  className="form-control"
                  onChange={(e) => {
                    setDateOfBirth(e.target.value);
                  }}
                />
                {/* address */}

                <label className="form-label">Address</label>
                <input
                  type="text"
                  placeholder="Enter your address"
                  value={address}
                  className="form-control"
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                />
                {/* Phone Number */}
                <br />

                <label className="form-label">Phone Number</label>
                <input
                  type="text"
                  placeholder="Enter your phone number"
                  name="phoneNumber"
                  value={phoneNumber}
                  className="form-control"
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                  }}
                />
                {/* Pan Number */}

                <label className="form-label">Pan Card Number</label>
                <input
                  type="text"
                  placeholder="Enter your pan card number"
                  name="panCardNumber"
                  value={panCardNumber}
                  className="form-control"
                  onChange={(e) => {
                    setPanCardNumber(e.target.value);
                  }}
                />
              </div>
              <button
                type="button"
                className="btn btn-dark" onClick={(e)=>{saveEmployee(e)}}>
                Add Employee
              </button>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <Link to="/getAllTransactions" className='btn btn-dark' >Display Transactions</Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}


export const GettingAllTransactions=()=>{
    const [tranArray, setTranArray] = useState([]);
  const allTransaction = (e) => {
  e.preventDefault();
    AdminService.fetchAllTransaction().then((response) => {
      console.log("Transactions response from api: "+ JSON.stringify(response.data))        
    });
}

  return (
  <div>
    <h3>All Transactions</h3>
    <button className='btn btn-dark' onClick={(e)=>{allTransaction(e)}}>Get</button>
    &nbsp;&nbsp;&nbsp;&nbsp;
    <Link to="/getAccountTransaction" className='btn btn-dark'>Get Transaction of an Account</Link>
    </div>);
}

export const GetTransactionOfAccount=()=>{
    const [accountNumber,setAccountNumber]=useState({});
    const [tranArray, setTranArray] = useState([]);
    const Transaction = (e) => {
        e.preventDefault();
        const accountnumber=accountNumber;
        AdminService.fetchTransactionOfAccount(accountnumber).then((response) => {
          console.log("Transactions of account: ", JSON.stringify(response.data));
        });
}

return (
    <div>
      <h3>All Transactions Of Account</h3>
      <label>
        <input type="number" min="0" placeholder="Account Number" onChange={(e)=>{setAccountNumber(e.target.value)}}></input>
      </label>
      <button className='btn btn-dark' onClick={(e)=>{Transaction(e)}}>Get</button>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <Link to="/getAllAccounts" className='btn btn-dark'>Display All Accounts</Link>
      </div>);

}

export const GetAllAccounts=()=>{
    const AllAccounts = (e) => {
        e.preventDefault();
        AdminService.displayAllAccounts().then((response) => {
          console.log("Account response from api: ", JSON.stringify(response.data));
        });
}

return (
    <div>
      <h3>All Accounts</h3><br/><br/>
      <button type="button"className='btn btn-dark' onClick={(e)=>{AllAccounts(e)}}>Get Accounts</button>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <Link to="/getAllEmployee" className='btn btn-dark'>Display All Employees</Link>
      </div>);
}

export const GetAllEmployees=()=>{
    const AllEmployees = (e) => {
        e.preventDefault();
        AdminService.viewAllEmployee().then((response) => {
          console.log("Employee response from api: ", JSON.stringify(response.data));
        });
}

return (
    <div>
      <h3>All Employees</h3>
      <br/><br/>
      <button type="button" className='btn btn-dark' onClick={(e)=>{AllEmployees(e)}}>Get Employees</button>
      </div>);
}