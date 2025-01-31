import { Col, Row } from "react-bootstrap";

import Collection from "../_components/common/Collection";
import CollectionSidenav from "../_components/CollectionSidenav";
import Products from "../_components/collectionComponents/Products";

const page = () => {
  return (
    <Row>
      <Col sm={3}>
        <CollectionSidenav />
      </Col>
      <Col sm={9}>
        <Products />
      </Col>
    </Row>
  );
};

export default page;
