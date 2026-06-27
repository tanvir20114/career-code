import React, { use } from 'react'
import { AuthContext } from '../../context/AuthContext';
import SocialLogin from '../Shared/SocialLogin';
import { useLocation, useNavigate } from 'react-router';

export default function SignIn() {
    const {SignInUser} = use(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state || '/';
        console.log('location in sign in page', location)
    
      const handleSignIn = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email,password);
        SignInUser(email,password).then(result=>{console.log(result.user);
      navigate(from);
      }).catch(error=>{
          console.log(error)
        })
      }
  return (
    <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left"> { /*
<div style={{ width: 300 }}>
    <Lottie animationData={animation} loop={true} />
    </div>   */} </div>
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
              <h1 className="text-5xl font-bold">SignIn now!</h1>
        <form onSubmit={handleSignIn}><fieldset className="fieldset">
          <label className="label">Email</label>
          <input type="email" name="email" className="input" placeholder="Email" />
          <label className="label">Password</label>
          <input type="password" name="password" className="input" placeholder="Password" />
          <div><a className="link link-hover">Forgot password?</a></div>
          <button className="btn btn-neutral mt-4">SignIn</button>
        </fieldset></form>
                <SocialLogin from={from}></SocialLogin>
      </div>
    </div>
  </div>
</div>
  )
}
