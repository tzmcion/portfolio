import React, { ReactElement } from 'react';

interface SubPageProps{
  ending:boolean
}

export default function Recruiters({ending}:SubPageProps):ReactElement {
  return (
    <div className={`Recruiters ${ending ? 'Recruiters_ending' : ''}`}>
        <h4>About Me</h4>
        <p>
          I'm a first year BioInformatics student on Jagiellonian University in Krakow. As a graduate of a technican school, I'm also a 
          software developer. I work and worked a lot with Javascript, Typescript and React (mainly those 3 technologies), but I also know Python and C++(a little).
          As a web developer, I managed to create or participate in various projects, which you can find in 'Projects' page. I'm most proud of 
          PianoBlocksApp, which is a web app created only by me, it's pirpose is to play midi files on piano online. Also I helped in comercial project
          'AdaRealm'. I'm eager to work and learn new things, especially with animations. I love doing Canvas animations, as you can see in my projects,
          and I'm pretty good at it. Anyway, if you want to know more, fell free to contact me. Ciao!
        </p>
    </div>
  )
}
