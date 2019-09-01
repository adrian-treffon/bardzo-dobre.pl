import React from 'react';


const LoginPage = () => {
  return (
    <div className="text-center">
        <form className="form-signin">
          <h1 className="h3 mb-3 font-weight-normal">Logowanie</h1>
          <label htmlFor="inputEmail" className="sr-only">Email address</label>
          <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required="" autoFocus=""/>
          <label htmlFor="inputPassword" className="sr-only">Password</label>
          <input type="password" id="inputPassword" className="form-control" placeholder="Password" required=""/>
          <div className="checkbox mb-3">
            <label>
              <input type="checkbox" value="remember-me"/> Remember me
            </label>
          </div>
          <button className="btn btn-lg btn-primary btn-block" type="submit">Zaloguj</button>
      </form></div>);
}
 
export default LoginPage;