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
import logo from '../assets/logo.png';
import { Link } from "react-router-dom";
import '../Login.css';
function Login() {
  return (
    <Container fluid>
      <Row className="login-row">

        <Col>
          <img
            src={logo}
            width="375px"
            height="450px"
            alt="login"
          />
        </Col>

        <Col className="login-col">
          <Card>
            <CardBody>

              <form>

                <FormGroup>
                  <h5 style={{ color: "red" }}></h5>
                </FormGroup>

                <FormGroup>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    placeholder="Enter Email Address"
                    className="form-control"
                  />
                  <p style={{ color: "red" }}></p>
                </FormGroup>

                <FormGroup>
                  <Label>Password</Label>
                  <Input
                    type="password"
                    placeholder="Enter Password"
                  />
                  <p style={{ color: "red" }}></p>
                </FormGroup>

                <FormGroup>
                  <Input type="checkbox" />
                  <Label>Remember me</Label>
                </FormGroup>

                <FormGroup>
                  <a href="#">Forgot Password</a>
                </FormGroup>

                <FormGroup>
                  <Button color="primary">SIGN IN</Button>
                </FormGroup>

                <FormGroup>
                  No Account?{" "}
                  <Link to="/register">Sign Up</Link>{" "}
                  Now
                </FormGroup>

              </form>

            </CardBody>
          </Card>
        </Col>

      </Row>
    </Container>
  );
}

export default Login;