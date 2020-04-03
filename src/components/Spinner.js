import React from "react";
import { usePromiseTracker } from "react-promise-tracker";
import Loader from "react-loader-spinner";

export const Spinner = (props) => {
  const { promiseInProgress } = usePromiseTracker({delay: 0});

  return (
    promiseInProgress && (
    <div className="spinner"
        style={{
            width: "100%",
            height: "100",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
        <Loader type="ThreeDots" color="#1ECD97" height={100} width={100} />
      </div>
    )
  );
};