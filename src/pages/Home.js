import React, { useContext,useState } from 'react';
import Axios from 'axios';
import {Row,Container,Col,Input,Button,InputGroup,InputGroupAddon} from 'reactstrap';
import UserCard from '../component/UserCard';
import Repos from '../component/Repo';
import {Redirect} from 'react-router-dom';
import {UserContext} from '../context/userContext';
import {toast} from 'react-toastify';

const Home=()=>{
    const context=useContext(UserContext);
    const [query,setQuery]=useState('');
    const [user,setUser]=useState(null);

    const fetchDatail=async ()=>{
        try{
            const {data}=await Axios.get(`https://api.github.com/users/${query}`);
            setUser(data)
        }
        catch(err)
        {
            toast('error is occured',{
                type:"error",
            })
        }
        if(!context.user?.uid){
            return <Redirect to="/signin"></Redirect>
        }
    }
    return(
       <Container>
           <Row className="mt-3">
               <Col md="5">
                   <InputGroup>
                   <Input type="text"
                    value={query}
                    onChange={e=>setQuery(e.target.value)}
                    placeholder="provide the username"/>
                   </InputGroup>
                   <InputGroupAddon addonType="append">
                   <Button onClick={fetchDatail} color="primary">Fetch User</Button>
                   </InputGroupAddon>
                   {user?<UserCard user={user}/>:null}
               </Col>
               <Col md="7">
                   {user ?<Repos repos_url={user.repos_url}/>:null}
               </Col>
           </Row>
       </Container>
    )
}
export default Home;