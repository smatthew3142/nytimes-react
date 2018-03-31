import React from 'react';
import moment from 'moment';
import { ListItem } from '../List';
import { CardPanel } from "react-materialize";
import "./Article.css";


export const Article = props => (

  <CardPanel>

  <div className="list-group" style={{margin: '30px 0'}}>
    <a href={props.url} className="bg-dark list-group-item list-group-item-action flex-column align-items-start active" target="_blank">
      <div className="d-flex w-100 justify-content-between">
        <h5 className="mb-1">{props.title}</h5>
        <small>{moment(props.date).format("dddd, MMMM Do YYYY")}</small>
      </div>
    </a>
    <ListItem  className="list-group-item">
      <div className=" w-75" style={{display: 'inline-block'}}>
        <h5 className="mb-1">{props.synopsis}</h5>
      </div>
      <div className="btn-group" role="group" aria-label="Basic example" style={{float: 'right'}}>
        <button type="button" className="btn btn-primary" style={{marginLeft: '3%'}} onClick={props.onClick}>{props.type}</button>
      </div>
    </ListItem>
  </div>
  </CardPanel>
)