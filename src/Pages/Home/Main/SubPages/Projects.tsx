import React, { ReactElement } from 'react';
import ProjectsJSON from '../../../../Assets/Projects.json';

interface SubPageProps{
    ending:boolean
}

export default function Projects({ending}:SubPageProps):ReactElement {

    const renderProjects = ():Array<ReactElement> =>{
        return ProjectsJSON.map((element,index) => {
            return <div key={index} className='Project'>
                <h3>{element.name}</h3>
                <iframe className='baba' title='iframe' src={element.href} />
            </div>
        })

    }

  return (
    <div className={`Projects`}>
        {renderProjects()}
    </div>
  )
}
