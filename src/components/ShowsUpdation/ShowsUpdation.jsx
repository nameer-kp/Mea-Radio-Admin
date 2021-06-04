import React, { useState, useEffect, useRef } from "react";
import { Table, Button } from "react-bootstrap";
import {IP} from '../../constants/serverIP'
export default function ShowsUpdation() {
  const [availableRows, setAvailableRows] = useState(null);
  const [currentRows, setCurrentRows] = useState(null);
  const inputFile = useRef(null);
  const [thumbNails, setThumbNails] = useState({});

  function fetchAvailableTable() {
    fetch(IP+"/api/admin/getavailableshows")
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          setAvailableRows(data);
          
        }
        else {
          setAvailableRows(null)
        }
        
        
      })
      .catch((err) => {
        
        
      });
  }

  function fetchCurrentTable() {
    fetch(IP+"/api/admin/getcurrentshow")
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          setCurrentRows(data);
        }
        
        
      })
      .catch((err) => {
        
        console.log(err);
      });
  }
  useEffect(() => {
    fetchAvailableTable();
    fetchCurrentTable();
  }, []);

  async function onAddToShow(slot_uid) {
    console.log("add show request for:", slot_uid);
    const formData = new FormData();
    let blob = await fetch(thumbNails[slot_uid]).then((r) => r.blob());
    formData.append("thumbnail", blob, slot_uid);
    fetch(IP+"/api/admin/addtoshow", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("error:", data);
        fetchAvailableTable();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function onSetImage(e, slot_uid) {
    setThumbNails({
      ...thumbNails,
      [slot_uid]: URL.createObjectURL(e.target.files[0]),
    });
    console.log(thumbNails);
  }

  function onRemoveShow(slot_uid) {
    
    fetch(IP+'/api/admin/removeshow', {
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
      },
      body: JSON.stringify({slot_uid})
    })
    fetchCurrentTable()

   } // should remove from show db as well as from audio and thumbnail
  function onRemoveRecording(slot_uid) {
    fetch(IP+'/api/admin/removerecording', {
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
      },
      body: JSON.stringify({slot_uid})
    }).then(res=>fetchAvailableTable()).catch(er=>console.log(er));
      
  }
  
  
    
   
  return (
    <div>
      <Button varient="primarty" style={{ padding: 5 }} onClick={()=>fetchAvailableTable()}> Reload</Button>
      <Table bordered hover size="sm" responsive key="RC">
        <h4 style={{ textAlign: "center" }}>Available Shows</h4>
        <tbody>
          <tr>
            <th>#</th>
            <th>Email</th>
            <th>Title</th>
            <th>Description</th>
            <th>Genre</th>

            <th>Clip</th>
          </tr>

          {availableRows&&(
            availableRows.map((row, ind) => (
              <tr>
                <td>{ind + 1}</td>
                <td>{row["email"]}</td>
                <td>{row["title"]}</td>
                <td>{row["note"]}</td>
                <td>{row["genre"]}</td>
                <td>
                  <audio
                    src={
                      IP+"/audio/" + row["slot_uid"] + ".mp3"
                    }
                    controls
                  ></audio>
                </td>
                {/* here we can append slotid with server ip..since we know the src will be same slotid*/}
                <td>
                  <input
                    type="file"
                    id="file"
                    ref={inputFile}
                    style={{ display: "none" }}
                    onChange={(e) => onSetImage(e, row["slot_uid"])}
                  />
                  <Button
                    varient="secondary"
                    onClick={() => inputFile.current.click()}
                  >
                    {" "}
                    Add Thumbnail
                  </Button>
                </td>
                <td>
                  <Button
                    varient="secondary"
                    onClick={() => onAddToShow(row["slot_uid"])}
                    //here we use slot_uid to approve specific slot..but didnt shows on the table
                  >
                    Add To Show
                  </Button>
                </td>
                <td>
                  <Button
                    varient="secondary"
                    //here we use slot_uid to approve specific slot..but didnt shows on the table
                    onClick={()=>onRemoveRecording(row['slot_uid'])}
                  >
                    Remove
                  </Button>
                </td>
                {thumbNails && (
                  <td>
                    <img
                      src={thumbNails[row["slot_uid"]]}
                      alt=""
                      width="350"
                      height="200"
                    />
                  </td>
                )}
              </tr>
            )))}
        </tbody>
      </Table>
       <Button varient="primarty" style={{padding:5}} onClick={()=>fetchCurrentTable()}> Reload</Button>
      <Table bordered hover size="sm" responsive key="RC">
        <h4 style={{ textAlign: "center" }}>Current Shows</h4>
        <tbody>
          <tr>
            <th>#</th>
            <th>Email</th>
            <th>Title</th>
            <th>Description</th>
            <th>Genre</th>
            <th>Likes</th>
          </tr>

          {currentRows &&(
            currentRows.map((row, ind) => (
              <tr>
                <td>{ind + 1}</td>
                <td>{row["email"]}</td>
                <td>{row["title"]}</td>
                <td>{row["note"]}</td>
                <td>{row["genre"]}</td>
                <td>{row["likes"]}</td>

                {/* here we can append slotid with server ip..since we know the src will be same slotid*/}
                <td>
                  <Button
                    varient="secondary"
                    onClick={() => onRemoveShow(row["slot_uid"])}
                    //here we use slot_uid to approve specific slot..but didnt shows on the table
                  >
                    Remove
                  </Button>
                </td>
              </tr>
            )))}
        </tbody>
      </Table>
    </div>
  );
}
