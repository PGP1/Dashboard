import Layout from "../components/Layout.js";
import style from "./styles/register.module.scss";
import { Button, Checkbox, Form } from 'semantic-ui-react';
import Animation from "../components/Animation";
import Particles from 'react-particles-js';

export default function Register () {
    return (
        <Layout>
            <div className={style.container}>
                <Animation/>
                <div className={style.left}>
                    <Particles className={"background"} params={{
                        particles: {
                            number: {
                                value: 100
                            },
                            color: {
                                value: "#85D68F"
                            }
                        }
                    }}/>
                    <div className={style.description}>
                        <h1>Control your plants anytime, any where</h1>
                        <h3>Sunt nulla anim consectetur aute ea officia fugiat velit consectetur reprehenderit.</h3>
                    </div>
                </div>
                <div className={style.right}>
                    <div>
                        <h2 className="header">
                            Register
                        </h2>
                        <Form>
                            <Form.Field>
                                <label>First Name</label>
                                <input placeholder='First Name' />
                            </Form.Field>
                            <Form.Field>
                                <label>Last Name</label>
                                <input placeholder='Last Name' />
                            </Form.Field>
                            <Form.Field>
                                <Checkbox label='I agree to the Terms and Conditions' />
                            </Form.Field>
                            <Button type='submit'>Submit</Button>
                        </Form>
                    </div>
                </div>
            </div>
        </Layout>
    )
}