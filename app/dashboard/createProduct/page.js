import CreateProduct from "@/app/_components/dashboardComponents/CreateProduct";
import Sidenav from "@/app/_components/Sidenav";
import { Row ,Col } from "react-bootstrap";


const page = () => {
  return (
    <Row>
      <Col sm={3}><Sidenav/></Col>
      <Col sm={9}><CreateProduct/></Col>
    </Row>
  )
};
export default page;
