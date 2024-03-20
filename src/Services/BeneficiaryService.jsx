import axios from 'axios';

const BASE_API_URL="http://localhost:8080/api/v1/otherbankdetails";


class BeneficiaryService{

    addNewBeneficiary(accountNumber, bankname, bankbranch, ifsc, beneficiary,token) {
        return (
            //axios.post("http://localhost:8080/api/beneficiary/" + accountNumber + "/" + bankname + "/" + bankbranch + "/" + ifsc, beneficiary)
            axios({
                method:'POST',
                url:"http://localhost:8080/api/beneficiary/" + accountNumber + "/" + bankname + "/" + bankbranch + "/" + ifsc,
                data: beneficiary,
                headers:{'Authorization':`Bearer ${token}`            
            }
                })
        )
    } 

    findBankBranch(bankname){
        return(
            axios.get(BASE_API_URL+"/"+bankname)
        )
    }

    findBankIFSC(bankname,bankbranch){
        return(
            axios.get(BASE_API_URL+"/"+bankname + "/" + bankbranch)
        )
    }

    getBeneficiary(accountNumber,token){
        return(
            //axios.get((BASE_API_URL+"/getbeneficiary/"+accountNumber),{headers})
            axios({
                method:'GET',
                url:BASE_API_URL+"/getbeneficiary/"+accountNumber,
                headers:{'Authorization':`Bearer ${token}`            
              }})
        )
    }
    getBankName(bankname) {
        return axios.get(
          BASE_API_URL+"/findbybankname/" + bankname);
      }
 
}

export default new BeneficiaryService();