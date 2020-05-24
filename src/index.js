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


class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    console.log(error, info);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
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
