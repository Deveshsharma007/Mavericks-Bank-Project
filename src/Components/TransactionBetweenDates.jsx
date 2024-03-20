import React, { useState, useEffect } from "react";
import TransactionService from '../Services/TransactionService';
import { useAuth } from './AuthContext';


const TransactionBetweenDates = (props) => {
    const {token}=useAuth();

    const [transactions, setTransactions] = useState([]);
    const [startdate,setStartDate]=useState();
    const [enddate,setEndDate]=useState();
    console.log("Application Rendered");

useEffect(()=>{
},[]);
    
const handle=(e)=>{
    e.preventDefault();
    getTransactionsBetweenDates(props.children);

}
    const getTransactionsBetweenDates = () => {
        TransactionService.viewBetweenDates(props.children,startdate,enddate,token)
            .then((response) => {
                setTransactions(response.data);
                console.log("Last 10 Transactions are:- ", response.data);
            });
    }

    return (
        <div>
          <div className="card" >
                    <div className="card-body">
                        <h5 className="card-title">Transactions Between Dates</h5>
                        <div className="card-text">
                            <div style={{fontWeight:'bold'}}>
                                <label>
                                    Enter Start Date:- 
                                    <input id="input" type="date" placeholder="YYYY-MM-DD" onChange={(e)=>{setStartDate(e.target.value)}}></input>
                                </label>
                                <label>
                                    Enter End Date:-
                                    <input id="input" type="date" placeholder="YYYY-MM-DD" onChange={(e)=>{setEndDate(e.target.value)}}></input>
                                </label>
                                <button id='input' type="button" onClick={(e)=>{handle(e)}} style={{backgroundColor:'#566822',textAlign:'center'}}>Get</button>
                            </div>
                            <div className="table-container">
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
                
        </div>
    );
}

export default TransactionBetweenDates;
