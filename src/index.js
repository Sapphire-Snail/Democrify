import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { PersistGate } from "redux-persist/lib/integration/react";
import { Provider } from "react-redux";
import Loader from "react-loader-spinner";
import { store, persistor } from "./redux/store";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import Notifications from "react-notify-toast";
import { Button } from "reactstrap";
import { Redirect } from "react-router-dom";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false,
      isRedirect: false
     };
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    console.log(error, info);
  }

  redirect = () => {
    this.setState({ isRedirect: true})
  }

  render() {
    if(this.state.isRedirect) {
      return <Redirect to="/login" />
    }
    if (this.state.hasError) {
      return (
        <div style={{textAlign: 'center'}}>
          <header>
            <img
              className="App-logo"
              src={require("./assets/logo.svg")}
              alt="logo"
            />
            <h2 className="slogan">Music for the people</h2>
          </header>
          <div>
            <h1>Something went wrong :(</h1>
            <Button href='/login' color="primary">Back to safety!</Button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.render(
  <Provider store={store}>
    <PersistGate
      loading={
        <Loader type="ThreeDots" color="#1ECD97" height={100} width={100} />
      }
      persistor={persistor}
    >
      <Notifications />
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </PersistGate>
  </Provider>,
  document.querySelector("#root")
);
