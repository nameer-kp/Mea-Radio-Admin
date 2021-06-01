import React,{useRef, useState} from 'react'

export default function RadioLoop() {
    const [files, setFile] = useState('')
    const prev =useRef()
    function handleChange(e) {
        setFile(e.target.files)
        
    }
    function onClick() {
        if (files.length > 0) {
            console.log(files);
            if (prev.current !== files) {
                const formData = new FormData()
            for (let i = 0; i < files.length; i++){
                formData.append('files', files[i])
            }
            
            fetch('http://localhost:3000/api/admin/updateradioloop', {
                method: 'POST',
                credentials:'include',
                body:formData
            })
                prev.current = files;
            }
            else {
                alert("select different files")
            }
            
        }
        else {
            alert("select atleast One file")
        }
    }
    return (
        <div>
            <input type="file" id="file" multiple name="file" onChange={handleChange} />
            <button type="submit" className="btn btn-info" onClick={onClick}> Update Loop </button>
        </div>
    )
}
