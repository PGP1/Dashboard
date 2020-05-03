import React, { Component } from "react";
import style from "./styles/Sidenav.module.scss";
import Dashboard from "./assets/Dashboard.svg";
import Device from "./assets/Device.svg";
import Settings from "./assets/Settings.svg";
import APIController from "../api/APIController";
import AWSController from "../api/AWSController";

import {
  Modal,
  Image,
  Header,
  Form,
  Button,
  Tab,
  Message,
} from "semantic-ui-react";
import Axios from "axios";

class Sidenav extends Component {
  constructor() {
    super();
    this.state = {
      devices: [],
      oldPw: "",
      newPw: "",
      confPw: "",
      error: "",
      erHeader: "",
      showEr: false,
      image: null,
      open: false
    };
  }

  componentDidMount() {
    AWSController.getCurrentSession().then((user) => {
      APIController.getUserData(user.idToken).then((d) => {
        this.setUserData(d.data);
      });
    });
  }
  
  toggle = () => {
    const { open } = this.state;
    this.setState({ open: !open })
  };

  setUserData = (userDetail) => {
    this.setState({ userDetail });
  };

  handleOldPwOnChange = (e) => {
    this.setState({ oldPw: e.target.value });
  };
  handleNewPwOnChange = (e) => {
    this.setState({ newPw: e.target.value });
  };
  handleConPwOnChange = (e) => {
    this.setState({ confPw: e.target.value });
  };

  handleFileUpload = (e) => {
    this.setState({ image: e.target.files[0] });
  };

  resetTabData = () => {
    this.setState({
      error: "",
      showEr: false,
      erHeader: "",
      oldPw: "",
      newPw: "",
      confPw: "",
    });
  };

  submitFile = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", this.state.image);
    AWSController.getCurrentSession().then((user) => {
      APIController.uploadAvatar(user.idToken, formData).then((res) => {
          this.setState({error: "Image has been changed", erHeader:"YAY!", showEr:true})
          APIController.getUserData(user.idToken).then((res) => {
            this.setUserData(res.data)
            this.toggle();
          });
        }).catch((err) => console.log(err));
    });
  };

  handlePasswordChange = () => {
    if (this.state.newPw != this.state.confPw) {
      this.setState({
        error: "New password and entered password does not match",
        showEr: true,
      });
      return;
    } else {
      let oldPassword = this.state.oldPw;
      let newPassword = this.state.newPw;

      AWSController.getCurrentAuthenticatedUser().then((user) =>
        AWSController.changePassword(user, oldPassword, newPassword)
          .then((msg) =>
            this.setState({
              error: "Password changed",
              showEr: true,
              erHeader: msg,
            })
          )
          .catch((err) => {
            this.setState({
              error: "Old password is incorrect",
              showEr: true,
              erHeader: "Uh oh!",
            });
          })
      );
    }
  };



  render() {
    let { userDetail } = this.state;
    const panes = [
      {
        menuItem: "Profile",
        render: () => (
          <Tab.Pane attached={false}>
            <div className={style.userSettingsForm}>
              <Form>
                <Form.Input fluid label="Email">
                  {" "}
                  {userDetail?.email}{" "}
                </Form.Input>
                <Form.Input fluid label="Username">
                  {" "}
                  {userDetail?.username}{" "}
                </Form.Input>
                {/*<Form.Group widths='equal'>*/}

                {/*    <Form.Input fluid label='Username'>  </Form.Input>*/}
                {/*    <Form.Input*/}
                {/*        fluid*/}
                {/*        id='form-subcomponent-shorthand-input-first-name'*/}
                {/*        label='First name'*/}
                {/*        placeholder='First name'*/}
                {/*    />*/}
                {/*    <Form.Input*/}
                {/*        fluid*/}
                {/*        id='form-subcomponent-shorthand-input-last-name'*/}
                {/*        label='Last name'*/}
                {/*        placeholder='Last name'*/}
                {/*    />*/}
                {/*</Form.Group>*/}
                {/*<Button color='blue'>Update details</Button>*/}
              </Form>
            </div>
          </Tab.Pane>
        ),
      },
      {
        menuItem: "Change Password",
        render: () => (
          <Tab.Pane attached={false}>
            <Form id="pwChange">
              <Form.Input
                value={this.state.oldPw}
                onChange={this.handleOldPwOnChange}
                fluid
                label="Old password"
                type="password"
              />
              <Form.Input
                value={this.state.newPw}
                onChange={this.handleNewPwOnChange}
                fluid
                label="New password"
                type="password"
              />
              <Form.Input
                value={this.state.confPw}
                onChange={this.handleConPwOnChange}
                fluid
                label="Confirm new password"
                type="password"
              />
              <Button onClick={this.handlePasswordChange} color="blue">
                Update password
              </Button>
              {this.state.showEr && (
                <Message showEr>
                  <Message.Header>{this.state.erHeader}</Message.Header>
                  <Message.List>{this.state.error}</Message.List>
                </Message>
              )}
            </Form>
          </Tab.Pane>
        ),
      },
      {
        menuItem: "Change Profile",
        render: () => (
          <Tab.Pane attached={false}>
            <Form>
              <Form.Input
                onChange={this.handleFileUpload}
                fluid
                name="file"
                label="Upload an image"
                type="file"
              />
              <Button onClick={this.submitFile} type="submit" color="blue">
                Change Profile Picture
              </Button>
              {this.state.showEr && (
                <Message showEr>
                  <Message.Header>{this.state.erHeader}</Message.Header>
                  <Message.List>{this.state.error}</Message.List>
                </Message>
              )}
            </Form>
          </Tab.Pane>
        ),
      },
    ];

    return (
      <div className={style.container}>
        <div className={style.userDetails}>
          <div
            className={style.avatar}
            style={{ backgroundImage: `url(${userDetail?.avatar})` }}
          />
          <div className={style.userInfo}>
            {userDetail?.username} <br />
            <span>{userDetail?.email}</span>
          </div>
        </div>

        <div className={style.links}>
          <ul>
            <li className={this.props.page == 1 ? style.active : ""}>
              <a
                href="#"
                className={"flex align-center space"}
                onClick={() => this.props.setPage(1)}
              >
                <Dashboard /> Dashboard
              </a>
            </li>
            <li className={this.props.page == 2 ? style.active : ""}>
              <a
                href="#"
                className={"flex align-center space"}
                onClick={() => this.props.setPage(2)}
              >
                <Device /> Devices
              </a>
            </li>
          </ul>
        </div>

        <div className={style.bottom}>
          <ul>
            <li>
              <Modal open={this.state.open}
                onClose={this.toggle}
                trigger={
                  <a onClick={this.toggle} href="#" className={"flex align-center space"}>
                    <Settings /> User Settings
                  </a>
                }
              >
                <Modal.Header>
                  <Settings fill="black" /> User Settings
                </Modal.Header>
                <Modal.Content image>
                  <Button style={{ position: "fixed" }}></Button>
                  <Image wrapped size="small" src={userDetail?.avatar} />
                  <Modal.Description style={{ width: "100%" }}>
                    <Tab
                      menu={{ secondary: true, pointing: true }}
                      panes={panes}
                      onTabChange={this.resetTabData}
                    />
                  </Modal.Description>
                </Modal.Content>
              </Modal>
            </li>
            <li>
              <a onClick={() => AWSController.signOut()} href="/">
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Sidenav;
