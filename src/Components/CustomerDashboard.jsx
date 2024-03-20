import React, { useEffect, useState } from 'react'
import CustomerService from '../Services/CustomerService';
import { Link, useParams } from 'react-router-dom';
import "./CustomerDashboard.css";
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

const CustomerDashboard = () => {
  const [customerArray, setCustomerArray] = useState([]);
  const [account, setAccount] = useState([]);
  const { customerId } = useParams();
  const [accountType, setAccountType] = useState('');
  const {token}=useAuth();


  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("accountType value:", accountType)
    console.log(sessionStorage.getItem('jwttoken'))
    CustomerService.addNewAccount(customerId, accountType,token)
      .then((response) => {
        console.log("Response Received from API:- ", response.data)
        toast.success(response.data);
        fetchAllAccounts(customerId)
      }).catch((error) => { console.log(error) });
  };

  const handleAccountTypeChange = (e) => {
    console.log(e.target.value);
    setAccountType(e.target.value);
  };

  // Fetch customer data when the component mounts.
  const fetchAllAccounts = (id) => {
    CustomerService.allAccountsOfCustomer(id,token)
      .then((response) => {
        console.log("Response Received from API:- ", response.data);
        setAccount(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    CustomerService.getCustomerById(customerId,token).then((response) => {
      setCustomerArray(response.data);
      console.log("Customer Details :", response.data);
      fetchAllAccounts(customerId)
    }).catch((error) => {
      console.log(error.response.data.message)
    });
  }, []);



  return (

    <div className='full-background'>
      <div className="card-container" style={{ height: '30vh' }}>
        <div className="card-content">
          <p>Customer Name : {customerArray.customerName}</p>
          <p>Customer Id : {customerArray.customerId}</p>
          <p>Phone Number : {customerArray.phoneNumber}</p>
          <p>Email : {customerArray.email}</p>
        </div>
      </div>
      <div className="button-container">
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal">
          Open New Account
        </button>
      </div>
      <br /><br /><br />
      <div className="table-container">
        <table className="table table-striped table-hover table-borderless" >
          <thead>
            <tr>
              <td style={{ backgroundColor: "#566822", color: "white" }}>Account Number</td>
              <td style={{ backgroundColor: "#566822", color: "white" }}>Account Type</td>
              <td style={{ backgroundColor: "#566822", color: "white" }}>Account Status</td>
              <td style={{ backgroundColor: "#566822", color: "white" }}>Go To</td>
            </tr>
          </thead>
          <tbody>
            {account.map((acc, key) => (
              <tr key={key}>
                <td className='td-content'> {acc.accountNumber}</td>
                <td className='td-content'> {acc.accountType}</td>
                <td className='td-content'> {acc.accountStatus}</td>
                {acc.accountStatus === "ACTIVE" && (
                  <td className='btn btn-primary'><Link to={`account/${acc.accountNumber}`} style={{ cursor: 'pointer' }}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check" viewBox="0 0 16 16">
                    <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z" />
                  </svg></Link></td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <br /><br />


      {/* <!-- Modal --> */}
      <div
        className="modal fade "
        id="exampleModal"
        // tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        style={{ color: 'black' }}>
        <div className="modal-dialog" >
          <div className="modal-content" >
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                New Account
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form style={{ display: 'flex', float: 'left', flexDirection: 'column', textAlign: 'left' ,fontWeight:'bold'}}>
                <label>
                  Customer ID:
                  <input id='input' value={customerArray.customerId} disabled='true' style={{ margin: '15px' }}></input>
                </label>
                <label>
                  Customer Name:
                  <input id='input' value={customerArray.customerName} disabled='true' style={{ margin: '15px' }}></input>
                </label>
                <label>
                  Customer PanCard:
                  <input id='input' value={customerArray.panNumber} disabled='true' style={{ margin: '15px' }}></input>
                </label>
                <label>
                  Customer Aadhar Number:
                  <input id='input' value={customerArray.aadharNumber} disabled='true' style={{ margin: '15px' }}></input>
                </label>
                <label>
                  Account Type:
                  <select
                  id='input'
                    value={accountType}
                    onChange={handleAccountTypeChange}
                    required
                    style={{ margin: '20px' }}
                  >
                    <option value="">Select account type</option>
                    <option value="SAVINGS">Savings</option>
                    <option value="CURRENT">Current</option>
                  </select>
                </label>

                {/* Add more form fields as needed */}
              </form>
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
                onClick={handleFormSubmit}
                data-bs-dismiss="modal"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default CustomerDashboard
