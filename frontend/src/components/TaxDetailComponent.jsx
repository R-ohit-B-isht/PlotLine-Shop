import React from 'react';
import { Card, ListGroup, Row, Col } from 'react-bootstrap';

const TaxDetailComponent = () => {
  return (
    <Card>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <h2>Tax Details</h2>
        </ListGroup.Item>
        <ListGroup.Item>
          <h4>Products Tax</h4>
          <Row>
            <Col>
              <strong>Price Range</strong>
            </Col>
            <Col>
              <strong>Tax Percentage</strong>
            </Col>
          </Row>
          <Row>
            <Col>above $5000</Col>
            <Col>18%</Col>
          </Row>
          <Row>
            <Col>b/w $1000 & $5000</Col>
            <Col>12%</Col>
          </Row>
          <Row>
            <Col>Other</Col>
            <Col>$200</Col>
          </Row>
        </ListGroup.Item>
        <ListGroup.Item>
          <h4>Services Tax</h4>
          <Row>
            <Col>
              <strong>Price Range</strong>
            </Col>
            <Col>
              <strong>Tax</strong>
            </Col>
          </Row>
          <Row>
            <Col>{"above $8000"}</Col>
            <Col>15%</Col>
          </Row>
          <Row>
          <Col>{"b/w $1000 & $8000"} </Col>
            <Col>10%</Col>
          </Row>
          <Row>
            <Col>Other</Col>
            <Col>$100</Col>
          </Row>
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

export default TaxDetailComponent;
