import React from "react";

export const FormBtn = props => {
  let classes = 'btn grey darken-3';
  
  classes += ' ' + props.additional
  
  return (
    <button {...props} className={classes} >
      {props.children}
    </button>
  )
}