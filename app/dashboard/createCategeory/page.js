import CreateCategory from "@/app/_components/dashboardComponents/CreateCategory";
import Sidenav from "@/app/_components/Sidenav";
import { Col, Row } from "react-bootstrap";
const page = () => {
  return (
    <Row>
      <Col sm={3}><Sidenav/></Col>
      <Col sm={9}><CreateCategory /></Col>
    </Row>
  )
};
export default page;