import React, { useState } from "react";
import BeneficiaryService from "../Services/BeneficiaryService";
import "./AccountDashboard.css";
import { useNavigate, useParams } from "react-router-dom";
import BankNameInput from "./BankNameInput";
import toast from "react-hot-toast";
import { useAuth } from './AuthContext';


const AddBeneficiary = () => {
  const [bankbranch, setBankBranch] = useState([""]);
  const [ifsc, setIFSC] = useState("");
  const [bankName, setbankName] = useState();
  const [selectedBranch, setSelectedBranch] = useState("");
  const [beneficiaryAccountNumber, setBeneficiaryAccountNumber] = useState();
  const [beneficiaryName, setBeneficiaryName] = useState();
  const {accountNumber} = useParams();
  const {token}=useAuth();
  const navigate=useNavigate();


  const handleBankNameChange = (newBankName) => {
    setbankName(newBankName);
    console.log("Received data:", newBankName);
    fetchingBankBranch(newBankName);
  };

  const fetchingBankBranch = (bankName) => {
    BeneficiaryService.findBankBranch(bankName)
      .then((response) => {
        console.log("Bank branch from api:- ", response.data);
        setBankBranch(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchIFSC = (selectedBranch) => {
    BeneficiaryService.findBankIFSC(bankName, selectedBranch)
      .then((response) => {
        console.log("Bank IFSC from api:- ", response.data);
        setIFSC(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log("bank name", bankName);

  const handleSubmit = (e) => {
    e.preventDefault();
    let Beneficiary = { beneficiaryAccountNumber, beneficiaryName };
    console.log(accountNumber,bankName,selectedBranch,ifsc,Beneficiary);
    BeneficiaryService.addNewBeneficiary(
      accountNumber,
      bankName,
      selectedBranch,
      ifsc,
      Beneficiary,
      token
    ) 
      .then((response) => {
        toast.success(response.data);
        console.log("Response from api:- ", response.data);
        // window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response);
      });
  };

  // handleCallback = (childData) => {
  //   this.setbankName({ childData });
  // };

  const goBack=()=>{
    navigate(-1);
}

  return (
    <div style={{height:'100vh'}}>
      <div style={{margin: '15px',
                float: 'right'}}><button className='btn btn-primary' onClick={goBack}><h3><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left-circle" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/>
              </svg></h3></button></div> 
      <div>         
        <div
        className="add-beneficiary"
          style={{
            width: "35rem",
            height: "24rem",
            padding: "35px",
            marginLeft: "30%",
            marginTop: "5%",
            backgroundColor: "#566822",
            color:'white'
          }}
        >
          <div className="card-Header">
            <h4>Add Beneficiary</h4>
          </div>
          <div className="card-body">
            <BankNameInput onBankNameChange={handleBankNameChange} />
            <label style={{marginTop:'10px'}}>
              Choose Bank Branch:
              <select id='input'
                onChange={(e) => {
                  setSelectedBranch(e.target.value);
                  fetchIFSC(e.target.value);
                }}
              >
                <option id='input' value="">Select Branch</option>
                {bankbranch.map((branch, index) => (
                  <option id='input' key={index} value={branch}>
                    {branch}
                  </option>
                ))}
              </select>
            </label><br/>
            {/* {fetchIFSC(selectedBranch)} */}
            <label style={{marginTop:'10px'}}>
              IFSC:
              <input id='input' type="text" value={ifsc} placeholder="IFSC"></input>
            </label>
            <label style={{marginTop:'10px'}}>
              Enter Beneficiary Account Number:
              <input id='input'
                type="number"
                min={0}
                placeholder="Account Number"
                onChange={(e) => {
                  setBeneficiaryAccountNumber(e.target.value);
                }}
              ></input>
            </label>
            <label style={{marginTop:'10px'}}>
              Enter Beneficiary Name:
              <input id='input'
                type="text"
                placeholder="Name"
                onChange={(e) => {
                  setBeneficiaryName(e.target.value);
                }}
              ></input>
            </label>
            <br />
            <br />
            <button
              type="button"
              className="btn btn-primary" 
              onClick={(e) => {
                handleSubmit(e);
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBeneficiary;