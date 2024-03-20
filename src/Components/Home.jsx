import React from 'react';
import { Link } from 'react-router-dom';
import '../Components/Home.css';

const Home = () => {
  return (
    <div className='home-container'>
      <div className='home-about'>
        <span><h2>Welocme to Mavericks Bank</h2></span><br />
        <span><Link to={'/homepage'}><button className="btn btn-primary">Register Now</button></Link></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span><Link to={'/homepage'}><button className="btn btn-primary">Login</button></Link></span>
      </div>
      <div className='home-features'>
        <span><h6>Features</h6></span>
        <span><h4>Banking Made Easy</h4></span>
        <div className='feature-cards'>
          <div className="card-container">
            <div className="card1">
              <span><h4>Online Banking</h4>
                <p>Manage your accounts, transfer funds, to anyone, anytime & anywhere</p></span>
            </div>
          </div>
          <div className="card-container">
            <div className="card2">
              <span><h4>Moblie App</h4>
                <p>Bank on the go with our secure and user-friendly mobile app for all your banking needs</p></span>
            </div>
          </div>
          <div className="card-container">
            <div className="card3">
              <span><h4>24/7 Customer Support</h4>
                <p>Get assistance round the clock from our dedicated customer support team</p></span>
            </div>
          </div>
          <div className="card-container">
            <div className="card4">
              <span><h4>Contact US</h4>
                <p>mavericksBank@bank.com</p></span>
            </div>
          </div>
        </div>
      </div>
      <div className='home-register'>
        <h2>Register Now</h2>
        <Link to={'/homepage'}><button type='button' className="btn btn-primary" style={{ marginTop: '5%' }}>REGISTER</button></Link>
      </div>
      <div className='home-questions'>
        <div className='home-questions-left'>
          <div className='left'>
            <h6>FAQ</h6>
            <h4>Common Questions</h4>
            <p>Here are some most commonly asked questions that we get.</p>
          </div>
        </div>
        <div className='home-questions-right'>
          <div className='right'>
            <span><h5>How can i open new account?</h5>
              <p>You can open new account directly on our website after you login.</p></span>
            <span><h5>What are the requirements for applying for a loan?</h5>
              <p>The requirements for applying for a loan includes a identification document<br /> and a complete form application.</p></span>
            <span><h5>How can I check my account balance?</h5>
              <p>You can check your account balance in your Account dashboard.</p></span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
