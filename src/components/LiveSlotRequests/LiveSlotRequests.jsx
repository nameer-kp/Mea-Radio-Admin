import React, { useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useEffect } from "react";
import {IP} from '../../constants/serverIP'
export default function LiveSlotRequests() {
  const [rows, setRows] = useState(null);
  const [members,setMembers]=useState({})
  function fetchTable() {
    fetch(IP+"/api/admin/bookslotview", {
       credentials:'include'
     })
      .then((res) => res.json())
      .then((data) => {
        setRows(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    fetchTable()
  }, []);

  function approve(slot_uid) {
    console.log("approval request for", slot_uid);
  
    // NB: this table should only shows unapproved rows
    fetch(IP+"/api/admin/bookslotapprove", {
      method: 'POST',
      credentials: 'include',

      headers: {
        'Content-Type': 'application/json'
        
      },
      body:JSON.stringify({slot_uid})
    }).then(res => res.json()).then(data => {
      console.log("error", data);
      fetchTable()
    })
    
  }

  

  return (
    <div>
      <Button varient="primarty" style={{padding:5}} onClick={()=>fetchTable()}> Reload</Button>
      <Table bordered hover size="sm" responsive>
        <tbody>
          
          <tr>
            <th>#</th>
            <th>Email</th>
            <th>Title</th>
            <th>Description</th>
            <th>Genre</th>
            <th>Time Slot</th>
            <th>No of Members</th>
            <th>Members</th>
          </tr>

          {rows &&(
            rows.map((row, ind) => (
              <tr>
                <td>{ind + 1}</td>
                <td>{row["email"]}</td>
                <td>{row["title"]}</td>

                <td>{row["note"]}</td>
                <td>{row['genre']}</td>
                <td>
                  {new Date(row["date_from"])
                    .toString()
                    .replace("GMT+0530 (India Standard Time)", "") +
                    " -> " +
                    new Date(row["date_to"])
                      .toString()
                      .replace("GMT+0530 (India Standard Time)", "")}
                </td>
                <td>{row['no_of_members']}</td>
                <td>{row['no_of_members'] > 1 ?
                  row['members'].map((mem)=>mem)+"": "NULL"
                  }</td>
                <td>
                  <Button
                    varient="secondary"
                    onClick={() => approve(row["slot_uid"])} //here we use slot_uid to approve specific slot..but didnt shows on the table
                  >
                    Approve
                  </Button>
                </td>
              </tr>
            )))}
        </tbody>
      </Table>
    </div>
  );
}
