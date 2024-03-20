import React, { useEffect, useState } from 'react'
import CustomerService from '../Services/CustomerService';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Calculation from './Calculation';
import './AccountDashboard.css';
import toast from 'react-hot-toast';
import { useAuth } from './AuthContext';


const AccountDashboard = () => {
    const [account, setAccount] = useState([]);
    const { accountNumber } = useParams(); 
    const navigate = useNavigate();
    const {token}=useAuth();

    
    useEffect(() => {
        CustomerService.accountDetails(accountNumber,token).then((response) => {
            setAccount(response.data);
            console.log("Account Details :", response.data);
        });
            
    }, []);
 
    const handleCloseAccount=(e)=>{
        e.preventDefault();
        if (window.confirm("Do you really want to CLOSE this Account?")) {
            closeAccount();
        }
    }

    const closeAccount=()=>{
        CustomerService.deleteAccountRequest(accountNumber,token).then((response) => {
            console.log("Response :", response.data);
            toast.success(response.data);
        }).catch((error)=>{
            console.log(error.response);
            toast.error(error.response);
          })
    }

    const goBack=()=>{
        navigate(-1);
    }
    

    return (
        <div className='full-background1' >
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
                </svg>Services
            </button></div>
            <div style={{margin: '15px',
                float: 'right'}}><button className='btn btn-primary' onClick={goBack}><h3><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left-circle" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/>
              </svg></h3></button></div>

            <div className="offcanvas offcanvas-bottom offcanvas-md" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasExampleLabel">Services</h5>
                </div>
                <div className="offcanvas-body" style={{marginBottom:'7%'}}>
                    <div className='btn btn-group-vertical' >
                        <Link to={`transaction/${accountNumber}`}><button className="btn btn-primary" data-bs-dismiss="offcanvas" style={{ margin: '10px',width:'200px' }}>Transactions</button></Link>
                        <Link to={`loan/${accountNumber}`} ><button className="btn btn-primary"  data-bs-dismiss="offcanvas" style={{ margin: '10px',width:'200px'}}>Loan</button></Link>
                        <Link to={`beneficiary/${accountNumber}`}><button className="btn btn-primary"  data-bs-dismiss="offcanvas" style={{ margin: '10px',width:'200px'}}>Add Beneficiary</button></Link>
                        <button className="btn btn-danger" data-bs-dismiss="offcanvas" style={{ margin: '10px',width:'200px' }}
                        onClick={(e)=>{handleCloseAccount(e)}}
                        >Close Account</button>
                    </div> 
                </div>
            </div>
            <div className="table-container">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <td style={{ backgroundColor: "#566822", color: "white" }}>Account Number</td>
                            
                            <td style={{ backgroundColor: "#566822", color: "white" }}>Account Balance</td>
                            <td style={{ backgroundColor: "#566822", color: "white" }}>Bank Name</td>
                            <td style={{ backgroundColor: "#566822", color: "white" }}>Bank Branch</td>
                            <td style={{ backgroundColor: "#566822", color: "white" }}>IFSC Code</td>
                        </tr>
                    </thead>
                    <tbody>
                            <tr>
                                <td className='td-content'> {account.accountNumber}</td>
                                <td className='td-content'> {account.balance}</td>
                                <td className='td-content'> {account.bankName}</td>
                                <td className='td-content'> {account.branchName}</td>
                                <td className='td-content'> {account.ifscCode}</td>
                            </tr>
                    </tbody>
                </table>
            </div>
        <div className='container'><Calculation/></div>


        </div>
    )
}

export default AccountDashboard;
