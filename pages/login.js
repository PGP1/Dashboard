import React, { Component } from 'react';
import style from './styles/login.module.scss';
import { Button, Form, Icon } from 'semantic-ui-react';
import Animation from '../components/Animation';
import Particles from 'react-particles-js';
class Login extends Component {
    render() {
        return (
            <div className={style.container}>
                <div className={style.left}>
                    <Particles className={style.left} params={{
                         particles: {
                            number: {
                              value: 80,
                              density: {
                                enable: true,
                                value_area: 800
                              }
                            },
                            color: {
                              value: "#ffffff"
                            },
                            shape: {
                              type: "circle",
                              stroke: {
                                width: 0,
                                color: "#000000"
                              },
                              polygon: {
                                nb_sides: 5
                              }
                            },
                            opacity: {
                              value: 0.6155448755889102,
                              random: false,
                              anim: {
                                enable: false,
                                speed: 1,
                                opacity_min: 0.1,
                                sync: false
                              }
                            },
                            size: {
                              value: 7.891600969088593,
                              random: true,
                              anim: {
                                enable: false,
                                speed: 40,
                                size_min: 0.1,
                                sync: false
                              }
                            },
                            line_linked: {
                              enable: true,
                              distance: 173.61522131994906,
                              color: "#ffffff",
                              opacity: 0.4,
                              width: 1
                            },
                            move: {
                              enable: true,
                              speed: 6,
                              direction: "none",
                              random: false,
                              straight: false,
                              out_mode: "out",
                              bounce: false,
                              attract: {
                                enable: false,
                                rotateX: 600,
                                rotateY: 1200
                              }
                            }
                          },
                          interactivity: {
                            detect_on: "canvas",
                            events: {
                              onhover: {
                                enable: true,
                                mode: "repulse"
                              },
                              onclick: {
                                enable: true,
                                mode: "push"
                              },
                              resize: true
                            },
                            modes: {
                              grab: {
                                distance: 200,
                                line_linked: {
                                  opacity: 1
                                }
                              },
                              bubble: {
                                distance: 200,
                                size: 100,
                                duration: 2,
                                opacity: 8,
                                speed: 3
                              },
                              repulse: {
                                distance: 100,
                                duration: 0.4
                              },
                              push: {
                                particles_nb: 4
                              },
                              remove: {
                                particles_nb: 2
                              }
                            }
                          },
                          retina_detect: true
                    }} />
                </div>

                <div className={style.right}>
                    <div className={style.form}>
                        <div className={style.logo}>
                            <Animation />
                        </div>
                        <h2 className="header">Login</h2>
                        <div className={style.content}>
                            <Form>
                                <Form.Field>
                                    <label>Username</label>
                                    <input placeholder='Username' name="username" />
                                </Form.Field>
                                <Form.Field>
                                    <label>Password</label>
                                    <input placeholder='Password' type='password' name="password" />
                                </Form.Field>
                                <div className={style.button}>
                                    <Button animated>
                                        <Button.Content visible>Login</Button.Content>
                                        <Button.Content hidden><Icon name='arrow right' /></Button.Content>
                                    </Button>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;