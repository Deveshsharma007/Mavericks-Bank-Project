import './App.css';
import photo1 from './Images/photo1.avif';
import React from 'react';
import Header from './Components/Header';
import Footer from './Components/Footer';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CustomerDashboard from './Components/CustomerDashboard';
import { TransactionDashboard } from './Components/Transaction';
import Loan from './Components/Loan';
import AccountDashboard from './Components/AccountDashboard';
import AddBeneficiary from './Components/AddBeneficiary';
import EmployeeDashboard from './Components/EmployeeDashboard';
import EmpAccountDash from './Components/EmpAccountDash';
import EmployeeLoan from './Components/EmployeeLoan';
import AdminDashboard from './Components/AdminDashboard';
import SignUp from './Components/SignUp';
import Home from './Components/Home';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './Components/AuthContext';


function App() {
  return (
    <div className="App" style={{
      backgroundImage: `url(${photo1})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundAttachment: 'fixed'
    }}>

      <BrowserRouter>
      <AuthProvider>
      <Toaster/>
        <Header />
        <div>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/home' element={<Home />} />
            <Route path='/homepage' element={<SignUp />} />
            <Route path="/dashboard/:customerId" element={<CustomerDashboard />} />
            <Route path="/dashboard/:customerId/account/:accountNumber" element={<AccountDashboard />} />
            <Route path="/dashboard/:customerId/account/:accountNumber/transaction/:accountNumber" element={<TransactionDashboard />} />
            <Route path="/dashboard/:customerId/account/:accountNumber/loan/:accountNumber" element={<Loan />} />
            <Route path="/dashboard/:customerId/account/:accountNumber/beneficiary/:accountNumber" element={<AddBeneficiary />} />
            <Route path='/employeedashboard/:employeeId' element={<EmployeeDashboard />} />
            <Route path='/employeeaccountdashboard/:accountNumber' element={<EmpAccountDash />} />
            <Route path='/employeeloandashboard/:employeeId' element={<EmployeeLoan />} />
            <Route path='/admindashboard' element={<AdminDashboard />} />
            <Route path='/adminloandashboard' element={<EmployeeLoan />} />
          </Routes>
        </div>
        <Footer />
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
