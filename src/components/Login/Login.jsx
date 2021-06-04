import React, { useState } from 'react'
import ReactDom from 'react-dom'
import { Form, Button, Container, Row, Card } from 'react-bootstrap'
import {IP} from '../../constants/serverIP'
import './Login.css'
export default function Login(props){

    const [email,setEmail]= useState("")
    const [password,setPassword]=useState("")
    document.cookie = "JWT=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    function validateForm(){

        return email.length>0 && password.length>0
    }
    function handleSubmit(event){
        event.preventDefault();
        
        fetch(IP+'/api/admin/login', {
            method: "POST",
            credentials:'include',
            headers: {
                'Content-Type':'application/json'
            },
            
            body:JSON.stringify({password,email})
        }).then(res=>res.json()).then(data => {
            if (!data['error']) {
               props.setLogin(true) 
            }

        })

    }
        return(
            <div>
                <h1>MEA Radio Admin Panel</h1>
                 <Container className="Login" >
                
                 <Form style={{'marginTop':'10%',border:'2px solid black',padding:'10px'}} onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control  type="email" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)} />
                        
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
                    </Form.Group>
                    
                    <Button variant="primary" type="submit" style={{marginTop:'10px'}} disabled={!validateForm()}>
                        Login
                    </Button>
                </Form>

            
            </Container>
            </div>
           
           
    )
}