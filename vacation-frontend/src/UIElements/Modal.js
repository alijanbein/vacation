import React, { useState } from "react";
import ReactDom from "react-dom";
import BackDrop from "./BackDrop";
import { CSSTransition } from "react-transition-group";
import "./Modal.css";
const ModalComponent = (props) => {
 

  const content  = (
  <div className="modal">
    {props.children}
  </div>);
  return ReactDom.createPortal(content,document.getElementById("modal")) 
};

const Modal = (props) => {
  return <React.Fragment>
    {props.show && <BackDrop onCancel={props.onCancel}/>}
    <CSSTransition
    in = {props.show}
    mountOnEnter
    unmountOnExit
    timeout={200}
    classNames="modal"
    >
        <ModalComponent {...props}/>
    </CSSTransition>
  </React.Fragment>

};

export default Modal;
