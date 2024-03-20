import React, { useState, useEffect } from "react"; 
import TransactionService from '../Services/TransactionService';
import { useAuth } from './AuthContext';


const TransactionLastMonth = (props) => {
    const {token}=useAuth();

    const [transactions, setTransactions] = useState([]);
    console.log("Application Rendered");

    useEffect(() => {
        getLastMonthTransactions(props.children);

    }, []);

    const getLastMonthTransactions = () => {
        TransactionService.viewLastMonth(props.children,token)
            .then((response) => {
                setTransactions(response.data);
                console.log("Last 10 Transactions are:- ", response.data);
            });
    }

    return (
        <div>
            <div className="card" >
                <div className="card-body">
                    <h5 className="card-title">Last Months Transactions</h5>
                    <div className="card-text">
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

export default TransactionLastMonth
