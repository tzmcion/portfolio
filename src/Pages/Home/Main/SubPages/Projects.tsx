import React, { ReactElement } from 'react';
import ProjectsJSON from '../../../../Assets/Projects.json';

interface SubPageProps{
    ending:boolean
}

export default function Projects({ending}:SubPageProps):ReactElement {

    const renderProjects = ():Array<ReactElement> =>{
        return ProjectsJSON.map((element,index) => {
            return <div key={index} className={`Project Trans${!ending ? Math.floor(Math.random()*5 + 1) : Math.floor(Math.random()*3 + 6)}`} style={{animationDuration:(Math.random() * 1.5 + 0.5) + 's'}}>
                <a className='ProjectLink' href={element.href} target='_blank' rel='noreferrer'> </a>
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
