import React from 'react';
import RegisterForm from '../forms/RegisterForm';

const RegisterPage = () => (
  <div>
    <h1>Register Page</h1>
    <RegisterForm onSubmit={(x)=> console.log(x)}/>
  </div>
);

export default RegisterPage;
