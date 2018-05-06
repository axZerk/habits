import React from 'react';
import { AuthContext } from '../context';

const withAuthContext = Component => props => (
  <AuthContext.Consumer>
    {context => <Component {...props} {...context} />}
  </AuthContext.Consumer>
);

export default withAuthContext;
