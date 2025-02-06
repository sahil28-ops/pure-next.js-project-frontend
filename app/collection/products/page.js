import { Row, Col } from "react-bootstrap";


import Products from "@/app/_components/collectionComponents/Products";
import CollectionSidenav from "@/app/_components/CollectionSidenav";
const page = () => {
  return (
    <Row>
      <Col sm={3}>
        < CollectionSidenav/>
      </Col>
      <Col sm={9}>
        <Products />
      </Col>
    </Row>
  );
};
export default page;