import React from "react";
import { Col, Row, Container } from "react-materialize";
import { Jumbotron } from "../../components/Jumbotron";


const NoMatch = () =>
  <Container fluid>
    <Row>
      <Col l={12}>
          <Jumbotron>
          </Jumbotron>
        
          <h1>404 Page Not Found</h1>
      </Col>
    </Row>
   
  </Container>;

export default NoMatch;