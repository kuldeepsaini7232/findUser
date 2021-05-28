import React,{useContext, useState } from 'react';

import {Container,Form,Button,FormGroup,Label,Col,Input
    ,Row,Card,CardBody,CardFooter,CardHeader} from 'reactstrap';
    import {UserContext} from '../context/userContext';
    import { toast } from 'react-toastify';
    import { Redirect } from 'react-router';
    import firebase from 'firebase/app';
const SignIn=()=>{
    const context=useContext(UserContext);
    const [email,setEmail]=useState('');
    const [password,setPasword]=useState('');

    const handleSignUp=()=>{
        firebase  
             .auth()
             .signInWithEmailAndPassword(email,password)
             .then(res=>{
                 console.log(res);
                 context.setUser({email:res.user.email,uid:res.user.uid})
             })
             .catch(err=>toast(err.message,{
                 type:'error'
             }))
    }

    const handleSubmit=(e)=>{
         e.preventDefault();
         handleSignUp();
    }
    if(context.user?.uid)
{
    return <Redirect to='/' />
}
    return(
        <Container className="text-center">
        <Row>
            <Col lg={6} className="offset-lg-3 mt-5">
                <Card>
                    <Form onSubmit={handleSubmit}>
                    <CardHeader className=''>SignIn here</CardHeader>
                    <CardBody>
                    <FormGroup row>
                            <label htmlFor='email' sm={3}>
                                Email:
                            </label>
                            <Col sm={9}>
                                <Input 
                                type="email"
                                name="emil"
                                id="email"
                                placeholder="write your email"
                                value={email}
                                onChange={e=>setEmail(e.target.value)}/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <label htmlFor='password' sm={3}>
                                password:
                            </label>
                            <Col sm={9}>
                                <Input 
                                type="password"
                                name="password"
                                id="password"
                                placeholder="write your password"
                                value={password}
                                onChange={e=>setPasword(e.target.value)}/>
                            </Col>
                        </FormGroup>
                    </CardBody>
                    <CardFooter>
                        <Button onClick={handleSubmit}type="submit" block color="primary">
                            Sign In
                        </Button>
                    </CardFooter>
                    </Form>
                </Card>
            </Col>
        </Row>
    </Container>
    )
}
export default SignIn;