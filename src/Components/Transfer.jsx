import React, { useEffect, useState } from "react";
import BeneficiaryService from "../Services/BeneficiaryService";
import TransactionService from "../Services/TransactionService";
import toast from "react-hot-toast";
import { useAuth } from './AuthContext';


export const Transfer = (props) => {
  const {token}=useAuth();

  console.log("Application Rendered");
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [beneficiaryAccountNumber, setBeneficiaryAccountNumber] = useState("");
  const [beneficiaryList, setBeneficiaryList] = useState([]);
  console.log("selectedbeneficiaryAccountNumber", beneficiaryAccountNumber);

  const handleBeneficiary = (e) => {
    setBeneficiaryAccountNumber(e.target.value);
  };

  useEffect(() => {
    BeneficiaryService.getBeneficiary(props.children,token).then((response) => {
      console.log("Beneficiary List:", response.data);
      setBeneficiaryList(response.data);
    });
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const amount = { transactionAmount, beneficiaryAccountNumber };
    console.log(
      "Amount",
      transactionAmount,
      "id",
      props.children,
      "beneficiary account number",
      beneficiaryAccountNumber
    );
    TransactionService.transfer(props.children, amount,token).then((response) => {
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
      {/* TRANSFER */}

      <div>
        {/* <!-- Button trigger modal --> */}
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal2"
          style={{ margin: "10px" }}
        >
          TRANSFER
        </button>

        {/* <!-- Modal --> */}
        <div
          className="modal fade"
          id="exampleModal2"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel2"
          aria-hidden="true"
          style={{color:'black'}}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel2">
                  Transafer
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
                <label style={{margin:'10px'}}>
                  Beneficiary:
                  <select onChange={handleBeneficiary} required id="input">
                    <option value="">Select Beneficiary</option>
                    {beneficiaryList.map((beneficiary) => (
                      <option
                        key={beneficiary.beneficiaryAccountNumber}
                        value={beneficiary.beneficiaryAccountNumber}
                      >
                        {beneficiary.beneficiaryName} -
                        {beneficiary.beneficiaryAccountNumber}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                  onClick={handleFormSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};