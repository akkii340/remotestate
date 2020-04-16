import React from 'react'
import './sideBar.css';

const SideBarElement = (props) =>{
   
    const obj = props.sideElement
    const updatetime = new Date(obj.updateTime*1000) 
    const tillLast =  new Date(obj.stopStartTime*1000)
    if(obj.type == "error")
    return(<div className="sideContaniererror">
             <div className="side">
                 <label style={{fontSize:18,fontWeight:'bold'}}>{obj.truckNumber}</label>
             {updatetime.getHours()>0 ?<span className="text"> {updatetime.getHours()} hrs</span> : <span>{updatetime.getMinutes()} min</span>}
             </div>
             { obj.runningState ? <span className="text">Running since last {tillLast.getDay()>0 ? tillLast.getDay()+' d' :tillLast.getHours()+' hrs'}</span> :
             <span className="text">Stopped since last {tillLast.getDay()>0 ? tillLast.getDay()+' d' :tillLast.getHours()+' hrs'}</span> }
        </div>
    )
    else return(<div className="sideContanier">
        <div className="side">
            <label style={{fontSize:18,fontWeight:'bold'}}>{obj.truckNumber}</label>
        {updatetime.getHours()>0 ?<span className="text"> {updatetime.getHours()} hrs</span> : <span>{updatetime.getMinutes()} min</span>}
        </div>
        { obj.runningState ? 
        <div className="side">
        <span className="text">Running since last {tillLast.getDay()>0 ? tillLast.getDay()+' d' :tillLast.getHours()+' hrs'}</span>
        <span className="text">{obj.speed} km/hr</span>
        </div> :
        <span className="text">Stopped since last {tillLast.getDay()>0 ? tillLast.getDay()+' d' :tillLast.getHours()+' hrs'}</span> }
        
        </div>
        

   )
}

export default SideBarElement