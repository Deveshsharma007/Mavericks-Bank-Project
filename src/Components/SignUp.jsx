import React, { useState } from 'react';
import '../Components/SignUp.css';
import CustomerService from '../Services/CustomerService';
import { Navigate, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from './AuthContext';


const SignUp = () => {
    const [customerName, setCustomerName] = useState();
    const [dateOfBirth, setDateOfBirth] = useState();
    const [address, setAddress] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [panNumber, setPanCardNumber] = useState();
    const [gender, setGender] = useState();
    const [email, setEmail] = useState();
    const [aadharNumber, setAadharNumber] = useState();
    const [username, setUsername] = useState();
    const [password1, setPassword1] = useState();
    const [name, setName] = useState();
    const [password, setLoginPassword] = useState();
    const navigate = useNavigate();
    const {setToken}=useAuth();


    const handleRegister = (e) => {
        e.preventDefault();
        const customer = { customerName, gender, phoneNumber, panNumber, aadharNumber, email, address, dateOfBirth };
        console.log(customer);
        CustomerService.addNewCustomer(customer).then((response) => {
            console.log("Response from api:- ", response.data)
            enteringCustomerDetails(response.data.customerId,
                response.data.customerName, response.data.email, username, password1);
        }).catch((error) => {
            console.log(error.response.data);
            if (error.response.data.phoneNumber) {
                toast.error(error.response.data.phoneNumber, {
                    autoClose: 90000,
                    
                });
            }
            if (error.response.data.panNumber) {
                toast.error(error.response.data.panNumber, {
                    autoClose: 90000,
                    
                });
            }
            if (error.response.data.aadharNumber) {
                toast.error(error.response.data.aadharNumber, {
                    autoClose: 90000,
                    
                });
            }
            if (error.response.data.email) {
                toast.error(error.response.data.email, {
                    autoClose: 90000,
                    
                });
            }
            if (error.response.data.age) {
                toast.error(error.response.data.age, {
                    autoClose: 90000,
                    
                });
            }
        });
    }

    const enteringCustomerDetails = (customerId, name, email, username, password) => {
        console.log(customerId, customerName, email, username, password);
        const details = { name, username, email, password, customerId };
        CustomerService.registeringCustomer(details).then((response) => {
            console.log("Response from API:- ", response.data);
            toast.success(response.data)
            navigate('/homepage')
        }).catch((error) => {
            console.log(error.response.data.message)
            toast.error(error.response.data.message, {
                autoClose: 90000
            })
deleteCustomer(customerId);
        });
    }
    
    const deleteCustomer=(id)=>{
CustomerService.deleteCustomer(id).then((response)=>{
    console.log("Extra customer deleted.....");
}).catch((error)=>{
    console.log(error);
})
    }

    const handleLogin = () => {
        const login = { name, password };
        console.log("Login details are:- ", login);
        CustomerService.loginTo(login).then((response) => {
            console.log("Response from api:- ", response.data)
            setToken(response.data.accessToken);
            //sessionStorage.setItem('jwttoken', response.data.accessToken);
            if (response.data.userDto.role == "ROLE_USER") {
                navigate(`/dashboard/${response.data.userDto.customerId}`, { replace: true });
            }
            else if (response.data.userDto.role == "ROLE_EMP") {
                navigate(`/employeedashboard/${response.data.userDto.customerId}`, { replace: true });
            }
             else {
                navigate(`/admindashboard`, { replace: true });
            }
        }).catch((error) => {
            console.log(error)
            toast.error(error.message);
        });
    }

    return (
        <div className="section">
            <div className="container">
                <div className="row full-height justify-content-center">
                    <div className="col-12 text-center align-self-center py-5">
                        <div className="section pb-5 pt-5 pt-sm-2 text-center">
                            <h6 className="mb-0 pb-3"><span>Log In </span><span>Sign Up</span></h6>
                            <input className="checkbox" type="checkbox" id="reg-log" name="reg-log" />
                            <label htmlFor="reg-log"></label>
                            <div className="card-3d-wrap">
                                <div className="card-3d-wrapper">
                                    <div className="card-front">
                                        <div className="center-wrap">
                                            <div className="section text-center">
                                                <h4 className="mb-4 pb-3">Log In</h4>
                                                <div className="form-group">
                                                    <input type="text" className="form-style" placeholder="Username" onChange={(e) => { setName(e.target.value) }} />
                                                    <i className="input-icon uil uil-at"></i>
                                                </div>
                                                <div className="form-group mt-2">
                                                    <input type="text" className="form-style" placeholder="Password"
                                                        onChange={(e) => { setLoginPassword(e.target.value) }} />
                                                    <i className="input-icon uil uil-lock-alt"></i>
                                                </div>
                                                <button className="btn mt-4" style={{ backgroundColor: 'whitesmoke', color: 'black', fontWeight: 'bold' }} onClick={handleLogin}>Login</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-back">
                                        <div className="center-wrap">
                                            <div className="section text-center">
                                                <h4 className="mb-3 pb-3">Sign Up</h4>
                                                <div className="form-group">
                                                    <input type="text" className="form-style" placeholder="Full Name" onChange={(e) => { setCustomerName(e.target.value) }} />
                                                    <i className="input-icon uil uil-user"></i>
                                                </div>
                                                <div className="form-group mt-2">
                                                    <input type="tel" className="form-style" placeholder="Phone Number" onChange={(e) => { setPhoneNumber(e.target.value) }} />
                                                    <i className="input-icon uil uil-phone"></i>
                                                </div>
                                                <div className="form-group mt-2">
                                                    <input type="email" className="form-style" placeholder="Email" onChange={(e) => { setEmail(e.target.value) }} />
                                                    <i className="input-icon uil uil-at"></i>
                                                </div> 
                                                <div className="form-group mt-2">
                                                    <select className="form-style" placeholder="Gender" onChange={(e) => { setGender(e.target.value) }}>
                                                        <option disabled="true">Select Gender</option>
                                                        <option value="Male">MALE</option>
                                                        <option value="Female">FEMALE</option>
                                                    </select>
                                                    <i className="input-icon uil uil-text-fields"></i>
                                                </div>
                                                <div className="form-group mt-2">
                                                    <input type="text" className="form-style" placeholder="Address" onChange={(e) => { setAddress(e.target.value) }} />
                                                    <i className="input-icon uil uil-text-fields"></i>
                                                </div>
                                                <div className="form-group mt-2">
                                                    <input type="text" className="form-style" placeholder="PanCard Number" onChange={(e) => { setPanCardNumber(e.target.value) }} />
                                                    <i className="input-icon uil uil-text-fields"></i>                                                </div>
                                                <div className="form-group mt-2">
                                                    <input type="text" className="form-style" placeholder="Aadhar Number" onChange={(e) => { setAadharNumber(e.target.value) }} />
                                                    <i className="input-icon uil uil-text-fields"></i>                                                </div>
                                                <div className="form-group mt-2">
                                                    <input type="date" className="form-style" placeholder="DateOfBirth" onChange={(e) => { setDateOfBirth(e.target.value) }} />
                                                    <i className="input-icon uil uil-calender"></i>
                                                </div>
                                                <div className="form-group mt-2">
                                                    <input type="text" className="form-style" placeholder="UserName" onChange={(e) => { setUsername(e.target.value) }} />
                                                    <i className="input-icon uil uil-at"></i>
                                                </div>
                                                <div className="form-group mt-2">
                                                    <input type="text" className="form-style" placeholder="Password" onChange={(e) => { setPassword1(e.target.value) }} />
                                                    <i className="input-icon uil uil-lock-alt"></i>
                                                </div>
                                                <button className="btn mt-4" style={{ backgroundColor: 'whitesmoke', color: 'black', fontWeight: 'bold' }} onClick={(e) => { handleRegister(e) }}>Register</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp;
