import React, { useEffect, useState } from 'react';
import './EmployeeDashboard.css';
import EmployeeService from '../Services/EmployeeService';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Calculation from './Calculation';
import { useAuth } from './AuthContext';


const EmpAccountDash = () => {
    const [transactions, setTransactions] = useState([]);
    const {accountNumber}=useParams();
    const {token}=useAuth();

    
    console.log("Application Rendered");

    useEffect(() => {
        getAllTransactions(accountNumber);

    }, []);
    const getAllTransactions = () => {
        console.log("account number is:- ", accountNumber);
        EmployeeService.allTransactionsOfAccount(accountNumber,token)
            .then((response) => {
                setTransactions(response.data);
                console.log("All Transactions are:- ", response.data);
            });
    }


  return (
    <div className='employee-dash'>
      <h1>Employee-Account-Dashboard</h1>
      <div className="account-card" >
                <div>
                    <div>
                        <div>
                        <h5>All Transactions</h5>
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <td style={{ backgroundColor: "#566822", color: "white" }}>Transaction ID</td>
                                        <td style={{ backgroundColor: "#566822", color: "white" }}>Beneficiary Account Number</td>
                                        <td style={{ backgroundColor: "#566822", color: "white" }}>Date</td>
                                        <td style={{ backgroundColor: "#566822", color: "white" }}>Amount</td>
                                        <td style={{ backgroundColor: "#566822", color: "white" }}>Type</td>
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
            </div>
            <div className='calculation-div'><Calculation/></div>
    </div>
  )
}

export default EmpAccountDash;