import React, { useEffect, useState } from 'react';
import './EmployeeDashboard.css';
import CustomerService from '../Services/CustomerService';
import EmployeeService from '../Services/EmployeeService';
import { Link, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from './AuthContext';



const EmployeeDashboard = () => {
    const [customerArray, setCustomerArray] = useState([]);
    const { employeeId } = useParams();
    const [transactions, setTransactions] = useState([]);
    const [customer, setCustomer] = useState([]);
    const {token}=useAuth();


    const getCustomerById = (customerId) => {
        CustomerService.getCustomerById(customerId,token).then((response) => {
            setCustomer(response.data);
            console.log("Customer Details :", response.data);
        }).catch((error) => { console.log(error) });
    }

    const fetchAllAccounts = () => {
        CustomerService.getAllAccounts(token)
            .then((response) => {
                console.log("Response Received from API:- ", response.data);
                setCustomerArray(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        fetchAllAccounts();
        getAllTransactions();
    }, []);

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

    const getAllTransactions = () => {
        EmployeeService.allTransactions(token)
            .then((response) => {
                setTransactions(response.data);
                console.log("All Transactions are:- ", response.data);
            });
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
        <div className='background-image'>
            <div className='employee-dash'>
                <div >
                    <Link to={`/employeeloandashboard/${employeeId}`}><button className='btn btn-primary float-lg-start' style={{ marginTop: '20px' }}>Loans</button></Link>
                </div>
                <br />
                <h2>Employee Dashboard</h2>
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
                <div className='transactions-details'>
                    <h5>All Transactions</h5>
                    <div className="table">
                        <table className='table-data'>
                            <thead>
                                <tr>
                                    <td >Transaction ID</td>
                                    <td >Beneficiary Account Number</td>
                                    <td >Date</td>
                                    <td >Amount</td>
                                    <td >Type</td>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.map((tran, key) => (
                                    <tr key={key}>
                                        <td className='td-content'> {tran.transactionID}</td>
                                        <td className='td-content'> {tran.beneficiaryAccountNumber}</td>
                                        <td className='td-content'> {tran.date}</td>
                                        <td className='td-content'> {tran.transactionAmount}</td>
                                        <td className='td-content'> {tran.transactionType}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

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
        </div>
    )
}

export default EmployeeDashboard
