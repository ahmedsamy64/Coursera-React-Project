import React, { Component } from "react";
import { Button, Modal, ModalHeader, Row, Col, Label } from "reactstrap";
import { Control, Form, Errors, actions } from "react-redux-form";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;

export default class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpened: false,
    };
  }

  handleSubmit(values) {
    this.props.postComment(
      this.props.dishId,
      values.rating,
      values.author,
      values.comment
    );
    this.props.resetFeedbackForm();
    this.setState({ modalOpened: false });
  }
  toggleModal = () => {
    this.setState({ modalOpened: !this.state.modalOpened });
  };

  render() {
    return (
      <div>
        <Button outline color="secondary" onClick={this.toggleModal}>
          <span className="fa fa-pencil fa-lg" /> Submit Comment
        </Button>
        <Modal isOpen={this.state.modalOpened} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <Form
            model="feedback"
            onSubmit={(values) => this.handleSubmit(values)}
          >
            {/* Rating */}
            <>
              <Label htmlFor="firstname" md={4}>
                Rating
              </Label>
              <Col md={12}>
                <Control.select
                  model=".rating"
                  name="rating"
                  className="form-control"
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Control.select>
              </Col>
            </>
            {/* your name */}
            <>
              <Label htmlFor="firstname" md={4}>
                Your Name
              </Label>
              <Col md={12}>
                <Control.text
                  model=".firstname"
                  id="firstname"
                  name="firstname"
                  placeholder="First Name"
                  className="form-control"
                  validators={{
                    required,
                    minLength: minLength(3),
                    maxLength: maxLength(15),
                  }}
                />
                <Errors
                  className="text-danger"
                  model=".firstname"
                  show="touched"
                  messages={{
                    required: "Required",
                    minLength: "Must be greater than 2 characters",
                    maxLength: "Must be 15 characters or less",
                  }}
                />
              </Col>
            </>
            <>
              <Label htmlFor="comment" md={4}>
                Comment
              </Label>
              <Col md={12}>
                <Control.textarea
                  model=".comment"
                  id="comment"
                  name="comment"
                  className="form-control"
                  rows={6}
                />
              </Col>
            </>
            {/* submit the comment */}
            <Row className="form-group">
              <Col style={{ marginLeft: 15, marginTop: 15 }}>
                <Button type="submit" color="primary">
                  Submit
                </Button>
              </Col>
            </Row>
          </Form>
        </Modal>
      </div>
    );
  }
}
