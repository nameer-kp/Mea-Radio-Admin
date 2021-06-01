import {Table,Button} from 'react-bootstrap'
import React,{useState,useEffect} from "react";

export default function OfflineSlotRequests() {
  const [rows, setRows] = useState(null);
  function fetchTable() {
    fetch("http://localhost:3000/api/admin/nonliveview", {
      credentials:'include',
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data['error']) {
          setRows(data);
        }
        
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    fetchTable();
  }, []);

  function approve(slot_uid) {
    console.log("approval request for", slot_uid);

    
    fetch("http://localhost:3000/api/admin/nonliveapprove", {
      method: "POST",
      credentials:'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ slot_uid }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("error:", data);
        fetchTable();
      }).catch(err => {
        console.log(err);
      });
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
                      <th>Clip</th>
          </tr>

          {rows &&(
            rows.map((row, ind) => (
              <tr>
                <td>{ind + 1}</td>
                <td>{row["email"]}</td>
                <td>{row["title"]}</td>

                <td>{row["note"]}</td>
                <td>{row["genre"]}</td>
                <td>
                  {new Date(row["date_from"])
                    .toString()
                    .replace("GMT+0530 (India Standard Time)", "") +
                    " -> " +
                    new Date(row["date_to"])
                      .toString()
                      .replace("GMT+0530 (India Standard Time)", "")}
                </td>
                <td><audio src={"http://localhost:3000/audio/"+row['slot_uid']+'.mp3'} controls></audio></td> {/* here we can append slotid with server ip..since we know the src will be same slotid*/}
                
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
