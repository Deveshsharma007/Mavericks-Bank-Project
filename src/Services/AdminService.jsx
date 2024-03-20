import axios from 'axios'
const BASE_REST_API_URL = "http://localhost:8080/api/v1/bank";

//let jwtToken=sessionStorage.getItem('jwttoken');

class AdminService {
    addEmployee(employee,token) {
        return (
            axios({
                method:'POST',
                url:BASE_REST_API_URL+"/addemp/1",
                data:employee,
                headers:{'Authorization':`Bearer ${token}`            
            }
                })
        )
    }
    registerEmployee(details){
        return(
            axios({
                method:'POST',
                url:"http://localhost:8080/api/authenticate/registeremp",
                data:details
            //     headers:{'Authorization':`Bearer ${jwtToken}`            
            // }
                }) 
        )
    }
    viewAllEmployee(token) {
        return (
           // axios.get(BASE_REST_API_URL + "/viewallemployees")
           axios({
            method:'GET',
            url:BASE_REST_API_URL + "/viewallemployees",
            headers:{'Authorization':`Bearer ${token}`            
        }
            })
        )
    }
    fetchAllTransaction(token) {
        return (
            axios({
                method:'GET',
                url:BASE_REST_API_URL +'/bankemp/alltransaction',
                headers:{'Authorization':`Bearer ${token}`            
            }
                })
        )
    }
    fetchTransactionOfAccount(id,token) {
        console.log("Account id=", id)
        return (
            //axios.get(BASE_REST_API_URL + '/bankemp/transactionofaccount/' + id)
            axios({
                method:'GET',
                url:BASE_REST_API_URL +'/bankemp/transactionofaccount/' + id,
                headers:{'Authorization':`Bearer ${token}`            
            }
                })
        )
    }
    displayAllAccounts(token) {
        //return axios.get("http://localhost:8080/api/v1/bankapp/Customer/displayallaccount")
        return(
            axios({
                method:'GET',
                url:"http://localhost:8080/api/v1/bankapp/Customer/displayallaccount",
                headers:{'Authorization':`Bearer ${token}`            
            }
                })
        )
    }

    deleteEmployee(employeeId,token){
        //return axios.delete(BASE_REST_API_URL+"/deleteemp/"+employeeId)
        return(
            axios({
                method:'DELETE',
                url:BASE_REST_API_URL+"/deleteemp/"+employeeId,
                headers:{'Authorization':`Bearer ${token}`            
            }
                })
        )
    }

}
export default new AdminService();