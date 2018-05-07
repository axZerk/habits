import React from 'react';
import RegistForm from '../forms/RegisterForm';
// import { auth } from "../../firebase/config";

const RegisterPage = () => (
  <div>
    <h1>Register Page</h1>
    <RegistForm onSubmit={(x)=> console.log(x)}/>
  </div>
);

export default RegisterPage;
