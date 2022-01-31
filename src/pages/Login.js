import React, { useState } from 'react';
import { Redirect } from 'react-router-dom'
import Button from '@mui/material/Button';
import { useHistory, useLocation } from "react-router-dom";

export default function Login(props) {
  console.log(props)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  const history = useHistory();
  const location = useLocation();

  const submit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:8888/auth/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({
            email,
            password
        })
    });

    const content = await response.json();

    setRedirect(true);
    // props.setName(content.name);
}

if (redirect) {
    return <Redirect to="/"/>;
}


  return (
    <form onSubmit={submit}>
      <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
      <input type="email" className="form-control" placeholder="Email address" required
              onChange={e => setEmail(e.target.value)}
      />

      <input type="password" className="form-control" placeholder="Password" required
              onChange={e => setPassword(e.target.value)}
      />

      <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>

      <h3>Do'nt have an account?</h3>
      <Button variant="contained" color="secondary"
            onClick={() => history.push('/Register')}>Register
          </Button>
    </form>

    
  );
}
