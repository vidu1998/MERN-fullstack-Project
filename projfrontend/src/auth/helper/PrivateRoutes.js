import React, {  } from "react";
import{Route,Redirect} from "react-router-dom";
import {isauthenticated} from "./index"


const PrivateRoute=({ component:Component, ...rest }) =>{
   
    return (
      <Route
        {...rest}
        render={props =>
           isauthenticated() ?(
            <Component {...props}/>
          ) : (
            <Redirect
              to={{
                pathname: "/signin",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
  }

  export default PrivateRoute