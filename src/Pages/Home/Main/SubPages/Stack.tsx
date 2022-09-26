import React, { ReactElement } from 'react';
import stack from '../../../../Assets/stack';

interface ListElementProps{
  name:string,
  image:string,
  shadowColor:string,
  textColor:string
}

function ListElement({name,image,shadowColor,textColor}:ListElementProps):ReactElement{
  return <div className='ListElement'>
            <img src={image} alt='logo' />
            <h5 style={{textShadow:"0px 0px 10px " + shadowColor,color:textColor}}>{name}</h5>
        </div>
}

interface SubPageProps{
  ending:boolean
}

export default function Stack({ending}:SubPageProps):ReactElement {

  const renderList = ():Array<ReactElement> =>{
    return stack.map((element,index) => <ListElement key={index} name={element.name} image={element.img} shadowColor={element.shadowColor} textColor={element.textColor} />)
  }

  return (
    <div className={`Stack ${ending? 'Stack_ending' : ''}`}>
        <h2 className='title'>My stack</h2>
        <div className='data'>
            {renderList()}
        </div>
    </div>
  )
}
