import React, { Component } from "react";
import "./SignUp.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import axios from "axios";

const skills = [
  "HTML",
  "CSS",
  "JavaScript",
  "NodeJS",
  "Express",
  "MySQL",
  "MongoDB",
  "PWA",
  "React",
];

class SignUp extends Component {
  state = {
    checkboxes: skills.reduce(
      (options, option) => ({
        ...options,
        [option]: false,
      }),
      {}
    ),
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    location: "",
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleCheckboxChange = (changeEvent) => {
    const { name } = changeEvent.target;
    console.log(name);

    this.setState((prevState) => ({
      checkboxes: {
        ...prevState.checkboxes,
        [name]: !prevState.checkboxes[name],
      },
    }));
  };

  // Jonathan did this in a functional component. We're in a class component
  // We'll need to adjust accordingly for a class component
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // <Input
  //             id="password"
  //             type="password"
  //             name="password"
  //             value={password}
  //             label="Password"
  //             handleChange={(e) => setPassword(e.target.value)}
  //           />

  handleFormSubmit = (
    formSubmitEvent,
    firstName,
    lastName,
    email,
    password,
    location
  ) => {
    formSubmitEvent.preventDefault();
    console.log(
      `formSubmitEvent (and logged directly below): ${formSubmitEvent}, firstName: ${this.state.firstName}, lastName: ${this.state.lastName},
      email: ${this.state.email}, password: ${this.state.password}, location: ${this.state.location}, checkboxes (and logged 2 lines down): ${this.state.checkboxes}`
    );
    console.log(formSubmitEvent);
    console.log(this.state.checkboxes);

    Object.keys(this.state.checkboxes)
      .filter((checkbox) => this.state.checkboxes[checkbox])
      .forEach((checkbox) => {
        console.log(checkbox, "is selected.");
      });

    axios
      .post("/api/users", {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        password: this.state.password,
        location: this.state.location,
        
      })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  renderSkills = (someSkills, startIdx, endIdx) => (
    <div className="row" key={startIdx}>
      {someSkills.slice(startIdx, endIdx).map((skill, idx) => (
        <div className="col-4" key={idx}>
          <Form.Check
            custom
            inline
            label={skill}
            isSelected={this.state.checkboxes[skill]}
            onChange={this.handleCheckboxChange}
            key={skill}
            name={skill}
            type="checkbox"
            id={`id-${skill}`}
            className="mb-3"
          />
        </div>
      ))}
    </div>
  );

  render() {
    return (
      <Form className="container mt-5 login-form">
        <Form.Group controlId="formBasicName">
          <Form.Control
            className="name-height"
            type="firstName"
            placeholder="First Name"
            name="firstName"
            value={this.state.firstName}
            onChange = {this.handleInputChange}
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicLast">
          <Form.Control
            className="name-height"
            type="lastName"
            placeholder="Last Name"
            name="lastName"
            value={this.state.lastName}
            onChange = {this.handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Control
            className="name-height"
            type="email"
            placeholder="Email Address"
            name="email"
            value={this.state.email}
            onChange = {this.handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Control
            className="name-height"
            type="password"
            placeholder="Password"
            name="password"
            value={this.state.password}
            onChange = {this.handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicLocation">
          <Form.Control
            className="name-height"
            type="location"
            placeholder="Location"
            name="location"
            value={this.state.location}
            onChange = {this.handleInputChange}
          />
        </Form.Group>

        <div className="mb-3 text-center">
          <h3 className="h3 skills-text">Skills</h3>
        </div>
        {/* <div className="col-4">
          <Form.Check
            onChange={this.handleCheckboxChange}
            custom
            inline
            label="HTML"
            type="checkbox"
            id={`id-html`}
            className="mb-3"
            name="HTML"
            checked={this.state.checkboxes[0].checked}
          />
        </div> */}
        {this.renderSkills(skills, 0, 3)}
        {this.renderSkills(skills, 3, 6)}
        {this.renderSkills(skills, 6, 9)}
        <Button
          onClick={this.handleFormSubmit}
          className="btn-lg btn-dark btn-block login-button"
        >
          Sign Up
        </Button>
      </Form>
    );
  }
}

export default SignUp;