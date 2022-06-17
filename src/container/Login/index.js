import React, {useState} from 'react'
import  Layout  from '../../componenti/Layout'
import {Form, Button} from 'react-bootstrap'
import Input from '../../componenti/UI/input'
import {login} from '../../azioni';
import {useDispatch, useSelector} from 'react-redux';
import { Navigate } from 'react-router-dom';

/**
* @author
* @function Login
**/

const Login = (props) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const auth = useSelector(state => state.auth);

  const dispatch = useDispatch();

  const loginUtente = (e) => {

    e.preventDefault();
    
    const utente = {
      email, password
    }

    dispatch(login(utente));
  }

  if(auth.authenticate){
    return <Navigate to={"/"} />
  }

  return(
    <Layout>
      <Form onSubmit = {loginUtente}>
      <Input
          label="Email"
          placeholder="Inserisci Email "
          value={email}
          type="email"
          onChange = {(e) => setEmail(e.target.value)}
      />
        <Input
          label="Password"
          placeholder="Inserisci Password "
          value={password}
          type="password"
          onChange = {(e) => setPassword(e.target.value)}
        />
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Layout>
  )

 }
 export default Login