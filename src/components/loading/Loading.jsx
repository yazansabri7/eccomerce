import React from "react";
import { Spinner } from "react-bootstrap";

export default function Loading() {
  return (
    <div className="vh-100  d-flex align-items-center justify-content-center w-100">

    <Spinner animation="border" role="status" >
      <span className="visually-hidden">Loading...</span>
    </Spinner>
    </div>
  );
}
