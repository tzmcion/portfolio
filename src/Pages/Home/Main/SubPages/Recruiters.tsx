import React, { ReactElement } from 'react';

interface SubPageProps{
  ending:boolean
}

export default function Recruiters({ending}:SubPageProps):ReactElement {
  return (
    <div className={`Recruiters ${ending ? 'Recruiters_ending' : ''}`}>
        <h4>About Me</h4>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde voluptatibus sapiente consequatur facilis repellat praesentium deserunt dolor ipsa ex at corrupti quidem consequuntur, totam consectetur earum accusantium, dolorum minus blanditiis.
        Suscipit quo quos voluptatibus ipsam vitae sint harum, at voluptates. Magnam commodi ex fuga provident, sint vero, molestias exercitationem saepe at, dolorem quos. Quas accusantium, ducimus quibusdam consequuntur cumque magni.
        Laudantium totam blanditiis, placeat eius possimus exercitationem! Labore pariatur culpa beatae totam? Alias delectus modi ad recusandae perferendis impedit voluptates aliquam quisquam nesciunt. Perspiciatis perferendis rerum commodi odit. Cupiditate, cum!
        Minima, fugit. Impedit reiciendis repudiandae voluptas iusto perferendis odio, repellendus ipsa. Ratione perferendis magnam officia quisquam, tempore voluptatum asperiores reiciendis, cumque voluptate deserunt, nisi consectetur labore odit omnis numquam sequi!
        Quos repellat recusandae sit neque nisi eaque necessitatibus sequi reiciendis, nobis aut obcaecati ea, vero facere qui cumque ducimus, in nemo non. Laborum ea fugiat sapiente accusamus beatae exercitationem aliquid.</p>
    </div>
  )
}
