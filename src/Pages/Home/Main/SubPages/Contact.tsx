import React, { ReactElement, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

interface SubPageProps{
    ending:boolean
  }

export default function Contact({ending}:SubPageProps):ReactElement {

  const [open,setOpen] = useState<boolean>(false);

  return (
    <div className={`Contact ${ending ? 'ContactEnd':''}`}>
        <h3>Contact Me:</h3>
        <ul>
          <li><span className='Stronger'>E-mail: </span><span className='Copable' title='Copy to clipboard' onClick={()=>{ navigator.clipboard.writeText('tymekapriasz@gmail.com');setOpen(true) }}>tymekapriasz@gmail.com</span></li>
          <li><span className='Stronger'>Phone: </span>No public phone :c</li>
          <li><a href="https://www.linkedin.com/in/tymoteusz-apriasz-2ba8501a6/" target='_blank' rel='noreferrer'><span className='Stronger'>Linkedin (click me)</span></a></li>
        </ul>
        <Snackbar open={open} autoHideDuration={3000} onClose={()=>{setOpen(false)}} anchorOrigin={{vertical:'bottom',horizontal:'center'}} >
          <Alert onClose={()=>{setOpen(false)}} severity="success" variant='filled' sx={{ width: '100%' }}>
            Email coppied to clipboard
          </Alert>
        </Snackbar>
    </div>
  )
}
