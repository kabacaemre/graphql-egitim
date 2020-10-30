import React from "react";

//Apollo
import { ApolloConsumer } from '@apollo/react-hooks';

//React Router
import { useHistory } from "react-router-dom";

const Logout = () => {
    let history = useHistory();

    const onClick = (client) => {
      localStorage.setItem('token', '');
      client.resetStore();
      history.push('/');
    };
  
    return (
      <ApolloConsumer>
        {(client) => (
            <button style={{marginLeft: "10px"}} onClick={() => onClick(client)}>
              Logout
            </button>
        )}
      </ApolloConsumer>
    );
};
  
export default Logout;