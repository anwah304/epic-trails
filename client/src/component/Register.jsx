import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  FormGroup,
  Input,
  Label,
  Row
} from "reactstrap";

import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import "../Register.css";

function Register() {
  return (
    <Container fluid>
      <Row className="register-row">

        {/* اللوجو */}
        <Col className="register-logo-col">
          <img src={logo} alt="logo" />
        </Col>

        {/* الفورم */}
        <Col className="register-col">
          <Card>
            <CardBody>

              <form>

                <FormGroup>
                  <h5>Create Account</h5>
                </FormGroup>

                <FormGroup>
                  <Label>Full Name</Label>
                  <Input type="text" placeholder="Enter Full Name" />
                </FormGroup>

                <FormGroup>
                  <Label>Email</Label>
                  <Input type="email" placeholder="Enter Email" />
                </FormGroup>

                <FormGroup>
                  <Label>Password</Label>
                  <Input type="password" placeholder="Enter Password" />
                </FormGroup>

                <FormGroup>
                  <Label>Confirm Password</Label>
                  <Input type="password" placeholder="Confirm Password" />
                </FormGroup>

                <FormGroup>
                  <Button color="primary">SIGN UP</Button>
                </FormGroup>

                <FormGroup>
                  Already have account?{" "}
                  <Link to="/login">Sign In</Link>
                </FormGroup>

              </form>

            </CardBody>
          </Card>
        </Col>

      </Row>
    </Container>
  );
}

export default Register;