import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import StickyHeader from "./StickyHeader";

const GridForDisplay = () => {
  return (
    <div>
      <Container style={{ marginTop: "20px"}}>
        <Row>
          <Col xs={12}>
            <StickyHeader />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default GridForDisplay;
