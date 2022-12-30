import React, { ReactElement } from 'react';

interface SubPageProps{
    ending:boolean
  }

export default function Main_Points({ending}:SubPageProps):ReactElement {
  return (
    <div className={`Main_Points ${ending ? 'Main_Points_Ending' : ''}`}>
        <h4>Have in Mind that:</h4>
        <ul>
            <li>I'm a student so I can only work parttime</li>
            <li>I'm a student so I have to work in hybrid mode</li>
            <li>I'm a student so I have to study too, so I can't 100% give myself to work</li>
            <li>I'm not eager to go to unpaid half year intern...</li>
            <li>I don't have comercial experience</li>
            <li>I'm not eager to work in a company which answers my mails after a month...</li>
        </ul>
    </div>
  )
}
