import React from "react";

export const ListItem = props =>
  <li className="list-group-item" style={{listStyleType:"none"}}>
    {props.children}
  </li>;
