/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button} from "react-bootstrap";
import axios from "axios";
import styled from '@emotion/styled'
import {Switch, Route, Link, useRouteMatch, Redirect} from 'react-router-dom';

function Login() {
    const [username, setUsername] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const [goToHomePage, setGoToHomePage] = React.useState<boolean>(false);
    const headUrl: string = 'http://localhost:8080';

    function login() {
        setGoToHomePage(true);
    }


    function userDoesNotExist(){

    }

    function userAlreadyExists(){

    }


    function incorrectPassword(){

    }
    function userExists(user : string) : boolean{
        const userExistsUrl = `${headUrl}/account/userExists`;
        axios.get(`${userExistsUrl}?username=${user}`)
            .then(function (response) {
                return response;
            }).catch (e => {
            console.log(`ERROR received from ${userExistsUrl}: ${e}\n`);
            console.log(e.response);
            console.log(e.request);
            console.log(e.message);
        });
        return false;
    }
    function attemptLogin(){
        if(!userExists(username)){
            userDoesNotExist();
        }
        const verifyUserUrl = `${headUrl}/account/verifyAccount`;
        axios.get(`${verifyUserUrl}?username=${username}&password=${password}`)
            .then(function (response) {
                if(response.data){
                    login();
                }
                else{
                    incorrectPassword();
                }
            }).catch (e => {
            console.log(`ERROR received from ${verifyUserUrl}: ${e}\n`);
            console.log(e.response);
            console.log(e.request);
            console.log(e.message);
        });
    }
    function addAccount (){
        if(userExists(username)){
            userAlreadyExists();
        }
        else {
            const addUserUrl = `${headUrl}/account/add`;

            axios.post(`${addUserUrl}?username=${username}&password=${password}`)
                .then(function (response) {
                    console.log(response);
                }).catch(e => {
                console.log(`ERROR received from ${addUserUrl}: ${e}\n`);
                console.log(e.response);
                console.log(e.request);
                console.log(e.message);
            });
        }
    };



    return (
        goToHomePage === true ?
            <Redirect to={`/${username}/home`}/>
        :
        <div className="App">
                <header className="App-header">
                    <Form>
                        <Form.Group>
                            <Form.Label>Username</Form.Label>
                            <Form.Control placeholder="Enter username" onChange={(e) => {setUsername(e.target.value)}} />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={(e) => {setPassword(e.target.value)}}/>
                        </Form.Group>
                        <br/>
                        <div css={{display: "flex", justifyContent:"space-evenly"}}>
                            <Button variant="primary" type="submit" onClick={addAccount}>
                                Create Account
                            </Button>
                            <Button variant="primary" onClick={attemptLogin}>
                                Login
                            </Button>
                        </div>
                    </Form>
                </header>
        </div>
    );
}

export default Login;
