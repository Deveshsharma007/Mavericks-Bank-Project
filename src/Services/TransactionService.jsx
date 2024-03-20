import axios from 'axios';

const BASE_API_URL = "http://localhost:8080/api/v1/bank/account/transaction/";

class TransactionService {
    deposit(id, amount,token) {
        //return axios.post(BASE_API_URL + "deposit/" + id, amount);
        return(
          axios({
            method:'POST',
            url:BASE_API_URL + "deposit/" + id,
            data: amount,
            headers:{'Authorization':`Bearer ${token}`}
            })
        )
      }
      withdraw(id, amount,token) {
        //return axios.post(BASE_API_URL + "withdraw/" + id, amount);
        return(
          axios({
            method:'POST',
            url:BASE_API_URL + "withdraw/" + id,
            data: amount,
            headers:{'Authorization':`Bearer ${token}`}
            })
        )
      }
      transfer(id,amount,token){
        //return axios.post(BASE_API_URL+"transfer/"+id,amount);
        return(
          axios({
            method:'POST',
            url:BASE_API_URL + "transfer/" + id,
            data: amount,
            headers:{'Authorization':`Bearer ${token}`}
            })
        )
      }
      view10Transactions(id,token){
       // return axios.get(BASE_API_URL+"view10transaction/"+id);
       return(
        axios({
          method:'GET',
          url:BASE_API_URL +"view10transaction/"+id,
          headers:{'Authorization':`Bearer ${token}`}
          })
      )
      }
      viewLastMonth(id,token){
       // return axios.get(BASE_API_URL+"transactionforlastmonth/"+id);
       return(
        axios({
          method:'GET',
          url:BASE_API_URL +"transactionforlastmonth/"+id,
          headers:{'Authorization':`Bearer ${token}`}
          })
      )
      }
      viewBetweenDates(id,startdate,enddate,token){
        //return axios.get(BASE_API_URL+"transactionbetween/"+id+"/"+startdate+"/"+enddate);
        return(
          axios({
            method:'GET',
            url:BASE_API_URL +"transactionbetween/"+id+"/"+startdate+"/"+enddate,
            headers:{'Authorization':`Bearer ${token}`}
            })
        )
      }
}

export default new TransactionService();