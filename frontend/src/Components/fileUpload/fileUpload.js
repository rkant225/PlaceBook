import { Button } from '@material-ui/core';
import React, { useState } from 'react'

const FileUpload = (props) =>{
    const {handleFileChange} = props;

    const [filePreviewUrl, setFilePreviewUrl] = useState("");

    const onFileChange = (event)=>{
        const file = event.target.files[0];

        if(file){

            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () =>{
                setFilePreviewUrl(fileReader.result);
            }

            handleFileChange(event);

            document.getElementById('fileInput').value = "";
        }
    }

    return(
        <React.Fragment>
            <div style={{display : 'flex', alignItems : 'center', justifyContent : 'space-between', marginTop : '1rem', marginBottom : '1rem'}}>

                <input id="fileInput" style={{display : 'none'}} type="file" accept=".jpeg,.png,.jpg" onChange={onFileChange}/>

                <label htmlFor="fileInput">
                    <Button variant="outlined" color="primary" component="span">
                        Choose Pic
                    </Button>
                </label>

                 {filePreviewUrl && <img style={{display : 'inline-block'}} src={filePreviewUrl} height='200' width='200'/>}
            </div>
        </React.Fragment>
    )
}

export default FileUpload;