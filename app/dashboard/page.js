import { Col, Row } from "react-bootstrap";
import Sidenav from "../_components/Sidenav";
import DashboardDetails from "../_components/common/DashboardDetails";
const page = () => {
  return (
    <Row>
      <Col sm={3}>
        <Sidenav />
      </Col>
      <Col sm={9}>
        <DashboardDetails />
      </Col>
    </Row>
  );
};

export default page;
