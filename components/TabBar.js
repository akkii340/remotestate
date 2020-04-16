import React from 'react'
import './TabBar.css';

const TabBar = (props) => {
   
    const [selected,setSelectedd] = React.useState([])
    const from = props.from
    const labels = Object.keys(props.tabData)
    const [selectdDataid,setSelectdDataid] = React.useState([])
    if(props.selectedData.length !== selected.length)
    {
        setSelectedd(props.selectedData)    
        setSelectdDataid(props.selectedData.map(obj => obj.id))
    }

    return(
        <div className = "tabContainer">
        <div className="tabinner">
        {labels.map( obj => {
            if(obj.split(" ")[0].toLowerCase() == props.clicked)
            return( <div key ={obj} className="tabClicked" onClick={()=>props.onClick(obj,from)}>
                <label style={{fontSize:18,fontWeight:'bold'}}>{obj}</label>
                <p>{props.tabData[obj.toString()]}</p>
            </div>)
            else
            return( <div key ={obj} className="tabs" onClick={()=>props.onClick(obj,from)}>
                <label style={{fontSize:18,fontWeight:'bold'}}>{obj}</label>
                <p>{props.tabData[obj.toString()]}</p>
            </div>)
        }
          
            )}
        </div>
            {selected.length >0 ? 
            <div className="tabselect">
            {selected.map(obj =>
            <label className="textSelect" key={obj.id} onClick={()=>props.ondeleteClick(obj)}>{obj.truckNumber}</label>)}
            <select id ="selects" onChange={props.onSelect}>
                <option value = {null}>select</option>
                {props.total.filter(data => 
                    {if(selectdDataid.indexOf(data.id) > -1)
                            return false
                        else return true    
                            }
                ).map((obj,index) => <option key={obj.id} value={index}>{obj.truckNumber}</option>)}
            </select>
            </div>
            :
            <div className="select">
            <select id ="select" onChange={props.onSelect}>
             <option value={null}>select</option>
                {props.total.map((obj,index) => <option key={obj.id} value={index}>{obj.truckNumber}</option>)}
            </select>
            </div>}
        </div> 
            
    )
}


export default TabBar
