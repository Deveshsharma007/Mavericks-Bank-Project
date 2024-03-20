import React, { useEffect, useState } from 'react';
import './EmployeeDashboard.css';
import EmployeeService from '../Services/EmployeeService';
import toast from 'react-hot-toast';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';


const EmployeeLoan = () => {
    const [loanList, setLoanList] = useState([]);
    const [loanId, setLoanId] = useState([]);
    const {token}=useAuth();
    const navigate=useNavigate();


    useEffect(() => {
        fetchLoanList();
    }, []);

    const fetchLoanList = () => {
        EmployeeService.allLoanApplications(token).then((response) => {
            console.log("Response from Api:- ", response.data);
            setLoanList(response.data);
        }).catch((error) => { console.log(error) })
    }

    const handleApprove = (e, loanId) => {
        EmployeeService.approveLoan(loanId,token).then((response) => {
            console.log("Response from Api:- ", response.data);
            toast.success(response.data);
            fetchLoanList();
        }).catch((error) => { console.log(error) })
    }

    const handleReject = (e, loanId) => {
        EmployeeService.rejectLoan(loanId,token).then((response) => {
            console.log("Response from Api:- ", response.data);
            toast.success(response.data);
            fetchLoanList();
        }).catch((error) => { console.log(error) })
    }

    const goBack=()=>{
        navigate(-1);
    }


    return (
        <div className='employee-dash2'>
            <div style={{margin: '15px',
                float: 'right'}}><button className='btn btn-primary' onClick={goBack}><h3><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left-circle" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/>
              </svg></h3></button></div>
            <br />
            <div className='account-details'>
                <h5>All Loan Details</h5><br />
                <div className='table'>
                    <table style={{ padding: '10px' }}>
                        <thead>
                            <tr>
                                <td>Loan ID</td>
                                <td>Loan Type</td>
                                <td>Account Number</td>
                                <td>Interest Rate</td>
                                <td>Tenure</td>
                                <td>Loan Status</td>
                                <td>Loan Amount</td>
                                <td>Approve</td>
                                <td>Reject</td>
                            </tr>
                        </thead>
                        <tbody>
                            {loanList.map((loan, key) => (
                                <tr key={key}>
                                    <td>{loan.loanID}</td>
                                    <td>{loan.loanName}</td>
                                    <td>{loan.accountNumber}</td>
                                    <td>{loan.interestRate}</td>
                                    <td>{loan.tenure}</td>
                                    <td>{loan.loanStatus}</td>
                                    <td>{loan.loanAmount}</td>
                                    <td><button className='btn btn-primary' onClick={(e) => { handleApprove(e, loan.loanID) }}
                                        disabled={loan.loanStatus === "REJECTED" || loan.loanStatus === "APPROVED"}
                                    >Approve</button></td>
                                    <td><button className='btn btn-danger' onClick={(e) => { handleReject(e, loan.loanID) }}
                                        disabled={loan.loanStatus === "REJECTED" || loan.loanStatus === "APPROVED"}
                                    >Reject</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    )
}

export default EmployeeLoan
