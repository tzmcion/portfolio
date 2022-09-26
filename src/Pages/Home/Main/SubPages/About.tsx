import React, { ReactElement } from 'react';
import Me from '../../../../Assets/me.jpg';

interface SubPageProps{
  ending:boolean
}

export default function About({ending}:SubPageProps):ReactElement {
  return (
    <div className={`About ${ending ? 'About_ending' : ''}`}>
        <h2 className='title'>Who am I ?</h2>
        <div className='breakpoint'></div>
        <div className='data'>
            <p>
                I'm a 19yo bioIT student at Jagielonian University in Krakow, Poland.
                I'm also a front-end developer. I've been programming for 7 years.
                Through this time I've created various projects, bot only a few of them
                are worthy mentioning. Slide to the "projects" page to see them. 
                Anyway, Enjoy my portfolio page!
            </p>
            <img src={Me} alt="Photo" />
        </div>
    </div>
  )
}
