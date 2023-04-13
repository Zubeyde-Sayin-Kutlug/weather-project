import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";

function Login() {
  const [inpval, setInpval] = useState({
    email: "",
    password: "",
  });

  const [data, setData] = useState([]);
  const navigate = useNavigate();

  // console.log(inpval);
  const getData = (e) => {
    // console.log(e.target.value);
    const { value, name } = e.target;
    // console.log(value, name);
    setInpval(() => {
      return {
        ...inpval,
        [name]: value,
      };
    });
  };

  const addData = (e) => {
    e.preventDefault();

    const { email, password } = inpval;

    if (email === "") {
      alert("Name field is requred.");
    } else if (!email.includes("@")) {
      alert("Please enter vailed email address.");
    } else if (password === "") {
      alert("pasword field is requred.");
    } else if (password.length < 6) {
      alert("Password should be longer than 6 letters.");
    } else {
      // console.log("data added succesfully");

      localStorage.setItem("zubeydes", JSON.stringify([...data, inpval]));
      navigate("/weather");
    }
  };

  return (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Form>
            <Form.Group
              className="mb-3 mt-5 col-lg-12"
              controlId="formBasicEmail"
            >
              <Form.Label>Email address</Form.Label>
              <Form.Control
                autoFocus
                type="email"
                name="email"
                onChange={getData}
                placeholder="Enter email"
              />
            </Form.Group>

            <Form.Group
              className="mb-3 col-lg-12"
              controlId="formBasicPassword"
            >
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                onChange={getData}
                placeholder="Password"
              />
            </Form.Group>
            <Button
              className="mb-3 col-lg-12"
              onClick={addData}
              variant="primary"
              type="submit"
            >
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
