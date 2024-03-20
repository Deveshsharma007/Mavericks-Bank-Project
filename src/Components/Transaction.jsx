import React, { useEffect, useState } from "react";
import TransactionService from "../Services/TransactionService";
import { useNavigate, useParams } from "react-router-dom";
import { Withdraw } from "./Withdraw";
import { Transfer } from "./Transfer";
import { TransactionHistoryLast10 } from "./TransactionHistoryLast10";
import TransactionLastMonth from "./TransactionLastMonth";
import TransactionBetweenDates from "./TransactionBetweenDates";
import toast from "react-hot-toast";
import CustomerService from "../Services/CustomerService";
import { useAuth } from './AuthContext';


export const TransactionDashboard = () => {
  console.log("Application Rendered");
  const [transactionAmount, setTransactionAmount] = useState(0);
  const { accountNumber } = useParams();
  let [check1, setCheck1] = useState(false);
  let [check2, setCheck2] = useState(false);
  let [check3, setCheck3] = useState(false);
  const {token}=useAuth();
  const navigate=useNavigate();

  

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const amount = { transactionAmount };
    console.log("Amount:- ", transactionAmount, " AccountNumber:- ", accountNumber);
    
      TransactionService.deposit(accountNumber, amount,token).then((response) => {
        toast.success(response.data);
        console.log("Deposited Successfully", response.data);
      }).catch((error)=>{
        console.log(error.response);
        toast.error(error.response.data.transactionAmount);
      })
    
  };
 
  const handleTransactionButton1 = () => {
    if (check1 == true) {
      setCheck1(false);
    } else {
      setCheck1(true);
    }
  }

  const handleTransactionButton2 = () => {
    if (check2 == true) {
      setCheck2(false);
    } else {
      setCheck2(true);
    }
  }

  const handleTransactionButton3 = () => {
    if (check3 == true) {
      setCheck3(false);
    } else {
      setCheck3(true);
    }
  }

  const goBack=()=>{
    navigate(-1);
}



  return (
    <div className="full-background1" style={{ margin: "10px" }}>
      <div style={{margin: '15px',
                float: 'right'}}><button className='btn btn-primary' onClick={goBack}><h3><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left-circle" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/>
              </svg></h3></button></div>
      <h3>Transaction Dashboard</h3>
      <div>
        {/* <!-- Button trigger modal --> */}
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          style={{ margin: "10px" }}
        >
          DEPOSIT
        </button>

        {/* <!-- Modal --> */}
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
          style={{color:'black'}}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Deposit
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body" style={{fontWeight:'bold'}}>
                <label>Enter the amount : </label>&nbsp;&nbsp;
                <input id="input"
                  type="number" min={0}
                  placeholder="Enter Deposit Amount"
                  name="transactionAmount"
                  value={transactionAmount}
                  onChange={(e) => {
                    setTransactionAmount(e.target.value);
                  }}
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                  onClick={handleFormSubmit}
                >
                  Deposit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Withdraw>{accountNumber}</Withdraw>
      <Transfer>{accountNumber}</Transfer>
      <button type="button" className="btn btn-primary" onClick={handleTransactionButton1}>View 10 Transactions</button>
      {
        check1 && (
          <TransactionHistoryLast10>{accountNumber}</TransactionHistoryLast10>
        )
      }
      <br/>
      <button type="button" className="btn btn-primary" onClick={handleTransactionButton2} style={{ margin: "10px" }}>Last Month Transactions</button>
      {
        check2 && (
          <TransactionLastMonth>{accountNumber}</TransactionLastMonth>
        )
      }<br/>
      <button type="button" className="btn btn-primary" onClick={handleTransactionButton3}>Transactions Between Dates</button>
      {
        check3 && (
          <TransactionBetweenDates>{accountNumber}</TransactionBetweenDates>
        )
      }
    </div>
  );
}