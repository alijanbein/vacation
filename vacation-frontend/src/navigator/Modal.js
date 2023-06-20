import React, { useState } from "react";
import ReactDom from "react-dom";
import BackDrop from "./BackDrop";
import Button from "../form-components/Button";
import { CSSTransition } from "react-transition-group";
import "./Modal.css";
const ModalComponent = (props) => {
 

  const content  = (
  <div className="modal">
    <div className="container">
         <div className="modal__header">
            <h3>An error occured !</h3>
         </div>
         <div className="modal__content">
                <p>{props.error} !</p>
         </div>
         <div className="modal__footer">
            <div className="pro">
            {props.info && <Button>{props.info}</Button>}
            <Button onClick = {props.onCancel}>close</Button>
            </div>

         </div>
    </div>
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
