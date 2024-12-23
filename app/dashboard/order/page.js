import Order from "@/app/_components/dashboardComponents/Order";
import { Row, Col } from "react-bootstrap"; 
import Sidenav from "@/app/_components/Sidenav";
const page = () => {
  return (
    <Row>
      <Col sm={3}>
        <Sidenav />
      </Col>
      <Col sm={9}>
        <Order />
      </Col>
    </Row>
  );
};
export default page;
