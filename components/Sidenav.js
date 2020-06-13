import React, { Component } from "react";
import style from "./styles/Sidenav.module.scss";
import DashboardIcon from "./assets/Dashboard.svg";
import DeviceIcon from "./assets/Device.svg";
import ExitIcon from "./assets/Exit.svg";

import SettingsIcon from "./assets/Settings.svg";
import APIController from "../api/APIController";
import AWSController from "../api/AWSController";

import {
  Modal,
  Image,
  Form,
  Button,
  Tab,
  Message,
} from "semantic-ui-react";

/**
* SideNav component
* @extends React.Component;
*/
class Sidenav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // devices: [],
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
  
  toggle = () => {
    const { open } = this.state;
    this.setState({ open: !open })
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

    const { devices, user, setUserData }  = this.props
    
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", this.state.image);
    AWSController.getCurrentSession().then((user) => {
      APIController.uploadAvatar(user.idToken, formData).then((res) => {
          this.setState({error: "Image has been changed", erHeader:"YAY!", showEr:true})
          APIController.getUserData(user.idToken).then((res) => {
            setUserData(res.data)
            this.toggle();
          });
        }).catch((err) => console.log(err));
    });
  };

  handlePasswordChange = () => {

    const { user } = this.props;

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
    const { userDetail, user, device, page} = this.props;
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
        <div className={style.logo}/>
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
                <DashboardIcon /> <span className={style.menuItem}>Dashboard</span>
              </a>
            </li>
            <li className={this.props.page == 2 ? style.active : ""}>
              <a
                href="#"
                className={"flex align-center space"}
                onClick={() => this.props.setPage(2)}
              >
                <DeviceIcon /> <span className={style.menuItem}>Devices</span>
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
                    <SettingsIcon /> <span className={style.menuItem}>User Settings</span>
                  </a>
                }
              >
                <Modal.Header>
                  <SettingsIcon fill="black" /> User Settings
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
              <a onClick={() => AWSController.signOut()} href="/" className={"flex align-center space"}>
                <ExitIcon/> <span className={style.menuItem}>Logout</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Sidenav;
