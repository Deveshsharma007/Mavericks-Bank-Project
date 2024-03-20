import React, { useEffect, useState } from 'react';
import CustomerService from '../Services/CustomerService';
import { useParams } from 'react-router-dom';
import { useAuth } from './AuthContext';


const Calculation = () => {
    const { accountNumber } = useParams();
    const [calculation, setCalculation] = useState([]);
    const {token}=useAuth();


    useEffect(()=>{
        CustomerService.getInOutCalculation(accountNumber,token).then((response) => {
            setCalculation(response.data);
            console.log("Account InOutCalculation :", response.data);
        });
    },[]);

  return(
    <div>
      <div style={{boxShadow:'8px 10px 8px #ede6e6'}}>
           <div className="card card-md" style={{width:"35rem",
          backgroundColor:"#566822",color:'white'}}>
                <div className='card-Header'>Transaction Calculations</div>
        <div className="card-body">
          <p>Total InBound : {calculation.totalInBound}</p>
          <p>Total OutBound : {calculation.totalOutBound}</p>
          <p>Loan : {calculation.loan}</p>
        </div>
      </div>
           </div>
    </div>
  )
}

export default Calculation;
