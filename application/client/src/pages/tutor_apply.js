import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";

const TutorApply = () => {
  const [formData, setFormData] = useState({
    topic: "",
    description: "",
    classNumbers: "",
    resume: null,
    profilePicture: null,
    video: null,
  });

  const [fieldStatus, setFieldStatus] = useState({
    topic: false,
    description: false,
    resume: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "file") {
      setFormData({ ...formData, [name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    // Update fieldStatus to indicate whether the field is filled
    setFieldStatus((prevFieldStatus) => ({
      ...prevFieldStatus,
      [name]: value.trim() !== "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if mandatory fields are filled before submission
    const mandatoryFields = ["topic", "description", "resume"];
    const isFormValid = mandatoryFields.every((field) => formData[field]);

    if (isFormValid) {
      console.log(formData);
    } else {
      // Alert the user that mandatory fields are not filled
      alert("Please fill in all mandatory fields.");
    }
  };

  return (
    <div className="content">
      <div className="loginContainer">
        <h1>Tutor Application</h1>
        <Form onSubmit={handleSubmit} className="loginForm">
          <p style={{ color: "black" }}>
            Fields marked with <span style={{ color: "red" }}>*</span> are required.
          </p>

          <Form.Group className="mb-3" controlId="topic">
            <Form.Label>
              Topic <span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Select
              name="topic"
              value={formData.topic}
              onChange={handleInputChange}
              required
              style={{ borderColor: fieldStatus.topic ? "green" : "red" }}
            >
              <option value="">Select a Topic</option>
              <option value="Math">Math</option>
              <option value="CSC">CSC</option>
              <option value="Physics">Physics</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="description">
            <Form.Label>
              Description <span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              style={{ borderColor: fieldStatus.description ? "green" : "red" }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="resume">
            <Form.Label>
              Resume <span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control
              type="file"
              name="resume"
              accept=".pdf,.doc,.docx"
              onChange={handleInputChange}
              required
              style={{ borderColor: fieldStatus.resume ? "green" : "red" }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="picture">
            <Form.Label>Profile Picture</Form.Label>
            <Form.Control
              type="file"
              name="picture"
              accept="image/*"
              onChange={handleInputChange}
              style={{ borderColor: fieldStatus.picture ? "green" : "" }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="video">
            <Form.Label>Video</Form.Label>
            <Form.Control
              type="file"
              name="video"
              accept="video/*"
              onChange={handleInputChange}
              style={{ borderColor: fieldStatus.video ? "green" : "" }}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default TutorApply;