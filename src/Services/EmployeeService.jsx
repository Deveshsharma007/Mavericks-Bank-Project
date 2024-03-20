import axios from "axios";

const BASE_API_URL="http://localhost:8080/api/v1/bank/bankemp";
 
class EmployeeService{
    activateAccount(accountNumber,token){
        return(
            //axios.get(BASE_API_URL+"/activateaccount/"+accountNumber)
            axios({
                method:'GET',
                url:BASE_API_URL+"/activateaccount/"+accountNumber,
                headers:{'Authorization':`Bearer ${token}`            
            }
                })
        )
    } 

    closeAccount(accountNumber,token){
return(
    //axios.get(BASE_API_URL+"/closeaccount/"+accountNumber)
    axios({
        method:'GET',
        url:BASE_API_URL+"/closeaccount/"+accountNumber,
        headers:{'Authorization':`Bearer ${token}`            
    }
        })
    )
    }

   allTransactionsOfAccount(accountNumber,token){
    return(
        //axios.get(BASE_API_URL+"/transactionofaccount/"+accountNumber)
        axios({
            method:'GET',
            url:BASE_API_URL+"/transactionofaccount/"+accountNumber,
            headers:{'Authorization':`Bearer ${token}`            
        }
            })
        )
   } 
 
   allLoanApplications(token){
    return(
       // axios.get(BASE_API_URL+"/allloanapplication")
       axios({
        method:'GET',
        url:BASE_API_URL+"/allloanapplication",
        headers:{'Authorization':`Bearer ${token}`            
    }
        })
        )
   }

   approveLoan(loanId,token){
    return(
        //axios.get(BASE_API_URL+"/loanapproval/"+loanId)
        axios({
            method:'GET',
            url:BASE_API_URL+"/loanapproval/"+loanId,
            headers:{'Authorization':`Bearer ${token}`            
        }
            })
        )
   }

   rejectLoan(loanId,token){
    return(
        //axios.get(BASE_API_URL+"/loanreject/"+loanId)
        axios({
            method:'GET',
            url:BASE_API_URL+"/loanreject/"+loanId,
            headers:{'Authorization':`Bearer ${token}`            
        }
            })
        )
   }
   allTransactions(token){
    return(
        //axios.get(BASE_API_URL+"/alltransaction")
        axios({
            method:'GET',
            url:BASE_API_URL+"/alltransaction",
            headers:{'Authorization':`Bearer ${token}`            
        }
            })
        )
   }
}

export default new EmployeeService();