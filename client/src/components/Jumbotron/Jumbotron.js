import React from "react";
import "./Jumbotron.css";
import { Card } from "react-materialize";


export const Jumbotron = () => (
<div className="jumbotron">
    <Card className='background'>
	    <div className="bottom">
		    <h4>Search and save articles from The New York Times</h4>
		    <h5>Powered by <a href="https://developer.nytimes.com/">The New York Times Developer Network</a></h5>
	    </div>
    </Card>
 </div>
);
