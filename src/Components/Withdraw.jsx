import React, { useState, useParams, useEffect } from "react";
import TransactionService from "../Services/TransactionService";
import toast from "react-hot-toast";
import CustomerService from "../Services/CustomerService";
import { useAuth } from './AuthContext';


export const Withdraw = (props) => {
  const {token}=useAuth();

  console.log("Application Rendered");
  const [transactionAmount, setTransactionAmount] = useState(0);
  //   const { id } = useParams();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const amount = { transactionAmount };
    console.log("Amount:- ", amount, " AccountNumber:- ", props.children);

      TransactionService.withdraw(props.children, amount,token).then((response) => {
        console.log("Withdrawn Successfully", response.data);
        toast.success(response.data);
      }).catch((error) => {
        console.log(error.response);
        if (error.response.data.transactionAmount) {
          toast.error(error.response.data.transactionAmount);
        }
        if (error.response.data.message) {
          toast.error(error.response.data.message);
        }
      });
  };

  return (
    <div>
      {/* WITHDRAW */}

      <div>
        {/* <!-- Button trigger modal --> */}
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal1"
        >
          WITHDRAW
        </button>

        {/* <!-- Modal --> */}
        <div
          className="modal fade"
          id="exampleModal1"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel1"
          aria-hidden="true"
          style={{color:'black'}}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel1">
                  Withdraw
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
                  type="number"
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
                  Withdraw
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};