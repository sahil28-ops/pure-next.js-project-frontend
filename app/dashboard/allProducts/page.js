import { Row, Col } from "react-bootstrap";
import Sidenav from "@/app/_components/Sidenav";
import AllProduct from "@/app/_components/dashboardComponents/AllProduct";
const page = () => {
  return (
    <Row>
      <Col sm={3}>
        <Sidenav />
      </Col>
      <Col sm={9}>
        <AllProduct />
      </Col>
    </Row>
  );
};
export default page;
