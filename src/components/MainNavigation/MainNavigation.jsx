import React,{useState} from 'react'
import ReactDom from 'react-dom'
import {Tabs,Tab, Button,Nav,Navbar} from 'react-bootstrap'
import Login from '../Login/Login'
import LiveSlotRequests from '../LiveSlotRequests/LiveSlotRequests'
import OfflineSlotRequests from '../OfflineSlotRequests/OfflineSlotRequests'
import RadioLoop from '../RadioLoop/RadioLoop'
import ShowsUpdation from '../ShowsUpdation/ShowsUpdation'

export default function MainNavigation(props){
    const [key, setKey] = useState('slot_req');
    function logout() {
        console.log("logging out");
        document.cookie = "JWT=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        props.setLogin(false)
}
  return (
    <div>
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand >MEA Radio Admin Panel</Navbar.Brand>
            <Button variant="outline-info" style={{position:'absolute',right:10,}} onClick={logout}>Log Out</Button>
        </Navbar>
        <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        >
            <Tab eventKey="live_slot_req" title="Live Slot Requests">
                <LiveSlotRequests />
            </Tab>
            <Tab eventKey="offline_slot_req" title="Offline Slot Requests">
                <OfflineSlotRequests/>
            </Tab>
            <Tab eventKey="playlist" title="Shows Updation">
                <ShowsUpdation/>
            </Tab>
            <Tab eventKey="loop" title="Radio Loop" >
                <RadioLoop/>
            </Tab>
            
        </Tabs>
    
      
    </div>
    
    
  
  );
}