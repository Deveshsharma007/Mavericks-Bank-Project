import axios from 'axios';

const BASE_API_URL = "http://localhost:8080/api/v1/bankapp/Customer";

let jwtToken=sessionStorage.getItem('jwttoken');

const myConfig={
    headers:{'Authorization':`Bearer ${jwtToken}`}
}
const headers = {
    "Authorization" : `Bearer ${jwtToken}`
}

class CustomerService {
    addNewCustomer(customer) {
        return (
            //axios.post(("http://localhost:8080/api/v1/bankapp/register/addCustomer", customer))
            axios({
                method:'POST',
                url:"http://localhost:8080/api/v1/bankapp/register/addCustomer",
                data:customer
                })
        )
    }

    registeringCustomer(details){
        return(
            axios.post("http://localhost:8080/api/authenticate/register",details)
        )
    } 

    loginTo(login){
        return(
            axios.post("http://localhost:8080/api/authenticate/login",login)
        )
    }

    deleteCustomer(id){
        return(
            axios.delete("http://localhost:8080/api/v1/bankapp/deletebyid/"+id)
        )
    }

    getCustomerById(customerId,token) {
        return (
            //axios.get(("http://localhost:8080/api/v1/bankapp/searchbyid/" + customerId),{headers})
            axios({
                method:'GET',
                url:"http://localhost:8080/api/v1/bankapp/searchbyid/" + customerId,
                headers:{'Authorization':`Bearer ${token}`            
            }
                })
        )
    }

    allAccountsOfCustomer(customerId,token) {
        return (
            //axios.get((BASE_API_URL + "/findaccount/" + customerId),myConfig)
            axios({
                method:'GET',
                url:BASE_API_URL + "/findaccount/" + customerId,
                headers:{'Authorization':`Bearer ${token}`            
            }
                })
        )
    }

    accountDetails(accountNumber,token) {
        return (
            //axios.get((BASE_API_URL + "/" + accountNumber),{headers})
            axios({
                method:'GET',
                url:BASE_API_URL + "/" + accountNumber,
                headers:{'Authorization':`Bearer ${token}`            
            }
                })
        )
    }

    addNewAccount(customerId, accountType,token) {
       // console.log("token in service:- ",{headers});
        
        return (
            //axios.post((BASE_API_URL + "/add/" + customerId + "/" + accountType),{headers})
            axios({
                method:'POST',
                url:BASE_API_URL+"/add/" + customerId + "/" + accountType,
                headers:{'Authorization':`Bearer ${token}`            
              }})
        )
    }

    applyForLoan(accountNumber, loanname, interest, loan,token) {
        return (
            //axios.post((BASE_API_URL + "/" + accountNumber + "/applyloan/" + loanname + "/" + interest, loan),myConfig)
            axios({
                method:'POST',
                url:BASE_API_URL+"/" + accountNumber + "/applyloan/" + loanname + "/" + interest,
                data:loan,
                headers:{'Authorization':`Bearer ${token}`            
              }})
        )
    }

    viewAppliedLoan(accountNumber,token) {
        return (
            //axios.get((BASE_API_URL + "/" + accountNumber + "/getloan"),myConfig)
            axios({
                method:'GET',
                url:BASE_API_URL + "/" + accountNumber + "/getloan",
                headers:{'Authorization':`Bearer ${token}`            
              }})
        )
    }

    deleteAccountRequest(accountNumber,token) {
        return (
            //axios.get((BASE_API_URL + "/deleterequest/" + accountNumber),myConfig)
            axios({
                method:'GET',
                url:BASE_API_URL + "/deleterequest/" + accountNumber,
                headers:{'Authorization':`Bearer ${token}`            
              }})
        )
    }

    getInOutCalculation(accountnumber,token) {
        return (
            //axios.get(("http://localhost:8080/api/v1/bank/bankemp/inoutbound/" + accountnumber),myConfig)
            axios({
                method:'GET',
                url:"http://localhost:8080/api/v1/bank/bankemp/inoutbound/" + accountnumber,
                headers:{'Authorization':`Bearer ${token}`            
              }})
        )
    }

    getAllAccounts(token){
        return(
           // axios.get((BASE_API_URL+"/displayallaccount"),myConfig)
           axios({
            method:'GET',
            url:BASE_API_URL+"/displayallaccount",
            headers:{'Authorization': `Bearer ${token}`}
    })
        )
    }

}
export default new CustomerService();