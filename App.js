import React from 'react';
import './App.css';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import axios from 'axios';
import TabBar from './components/TabBar';
import SideBarElement from './components/SideBarElement';

function App(props) {
  let key ="total"
  const [truckData,setTruckData] = React.useState({ running :[],stopped :[],idle:[],error:[],total:[]})
  const [isLoading,setIsLoading] = React.useState(true)
  const [dataLoaded,setDataLoaded] = React.useState([])
  const [selectedData, setSelectedData] = React.useState({ running :[],stopped :[],idle:[],error:[],total:[]})
  const [inputValue,setInputValue] = React.useState("")
  const [tabkey,settabKey] = React.useState(key)
  
  
  const tabClicked = (tab,from) =>{
  if(from === "normal"){
    if(tab.indexOf("Running") > -1)
    key  = "running"
    else if(tab.indexOf("Stopped") > -1)
    key  = "stopped"
    else if(tab.indexOf("Idle") > -1)
    key  = "idle"
    else if(tab.indexOf("Error") > -1)
    key  = "error"
    else if(tab.indexOf("Total") > -1)
    key  = "total"
    
    settabKey(key)
    setDataLoaded(truckData[key.toString()])
  }else{
     if(tab.indexOf("Running") > -1)
     key  = "running"
     else if(tab.indexOf("Stopped") > -1)
      key  = "stopped"
      else if(tab.indexOf("Idle") > -1)
     key  = "idle"
    else if(tab.indexOf("Error") > -1)
    key  = "error"
    else if(tab.indexOf("Total") > -1)
    key  = "total"
    
    settabKey(key)
    setDataLoaded(selectedData[key.toString()])
  } 
  } 

  const onSelect = (event) =>{
    let obj = truckData.total[event.target.value]
  
    if(obj != null)
    {
    
      if(obj.type === "running")
         {
      
          setSelectedData({...selectedData,running:[...selectedData.running,obj],total:[...selectedData.total,obj]})
         
         }
         else if(obj.type === "stopped")
            {
              
              setSelectedData({...selectedData,stopped:[...selectedData.stopped,obj],total:[...selectedData.total,obj]})
            
            }
            else if(obj.type === "idle")
            {
              
              setSelectedData({...selectedData,idle:[...selectedData.idle,obj],total:[...selectedData.total,obj]})
           
            }
            else if(obj.type === "error")
            {
              setSelectedData({...selectedData,error:[...selectedData.error,obj],total:[...selectedData.total,obj]})
             
            }  
            setDataLoaded([...selectedData.total,obj]) 
    }
  
  }

  const ondeleteClick = (obj) =>{
  
    if(obj.type === "running")
    {
      const updaterunnigSelected = selectedData.running.filter(data => 
        {if(data.id == obj.id)
        return false
        else return true
      }
      ) 
      if([...updaterunnigSelected,...selectedData.stopped,...selectedData.idle,...selectedData.error].length >0)
      {
        setSelectedData({...selectedData,running:updaterunnigSelected,total:[...updaterunnigSelected,...selectedData.stopped,...selectedData.idle,...selectedData.error]})
        setDataLoaded([...updaterunnigSelected,...selectedData.stopped,...selectedData.idle,...selectedData.error])
      }
      else {
        setSelectedData({ running :[],stopped :[],idle:[],error:[],total:[]})
        setDataLoaded(truckData.total)
      }
    }
    else if(obj.type === "error")
    {
      const updaterunnigSelected = selectedData.error.filter(data => 
        {if(data.id == obj.id)
        return false
        else return true
      }
      ) 
      if([...updaterunnigSelected,...selectedData.stopped,...selectedData.idle,...selectedData.running].length >0)
      {
        setSelectedData({...selectedData,error:updaterunnigSelected,total:[...updaterunnigSelected,...selectedData.stopped,...selectedData.idle,...selectedData.running]})
        setDataLoaded([...updaterunnigSelected,...selectedData.stopped,...selectedData.idle,...selectedData.running])
      }
      else {
        setSelectedData({ running :[],stopped :[],idle:[],error:[],total:[]})
        setDataLoaded(truckData.total)
      } 
    }    else if(obj.type === "stopped")
    {
      const updaterunnigSelected = selectedData.stopped.filter(data => 
        {if(data.id == obj.id)
        return false
        else return true
      }
      ) 
      if([...updaterunnigSelected,...selectedData.running,...selectedData.idle,...selectedData.error].length >0)
      {
        setSelectedData({...selectedData,stopped:updaterunnigSelected,total:[...updaterunnigSelected,...selectedData.running,...selectedData.idle,...selectedData.error]})
        setDataLoaded([...updaterunnigSelected,...selectedData.running,...selectedData.idle,...selectedData.error])
      }
      else {
        setSelectedData({ running :[],stopped :[],idle:[],error:[],total:[]})
        setDataLoaded(truckData.total)
      }
    }
      else if(obj.type === "idle")
    { const updaterunnigSelected = selectedData.idle.filter(data => 
    {if(data.id == obj.id)
    return false
    else return true
   }
    ) 
      if([...updaterunnigSelected,...selectedData.running,...selectedData.stopped,...selectedData.error].length >0)
   {
    setSelectedData({...selectedData,idle:updaterunnigSelected,total:[...updaterunnigSelected,...selectedData.running,...selectedData.stopped,...selectedData.error]})
    setDataLoaded([...updaterunnigSelected,...selectedData.running,...selectedData.stopped,...selectedData.error])
   }
   else {
    setSelectedData({ running :[],stopped :[],idle:[],error:[],total:[]})
    setDataLoaded(truckData.total)
  }}
  }
    
    


  React.useEffect(()=>{
        axios.get('https://api.mystral.in/tt/mobile/logistics/searchTrucks?auth-company=PCH&companyId=33&deactivated=false&key=g2qb5jvucg7j8skpu5q7ria0mu&q-expand=true&q-include=lastRunningState,lastWaypoint')
        .then(response => {
         let data_Needed = response.data.data.map( obj =>
            ({
               id:obj.id,
               truckNumber :obj.truckNumber,
               cretaedTime : obj.lastWaypoint.createTime,
               updateTime : obj.lastWaypoint.updateTime ,
               ingnition : obj.lastWaypoint.ignitionOn,
               lat : obj.lastWaypoint.lat,
               lng : obj.lastWaypoint.lng,
               stopStartTime : obj.lastRunningState.stopStartTime,
               runningState:obj.lastRunningState.truckRunningState,
               speed : obj.lastWaypoint.speed
            })
           )

           const running =  data_Needed.filter( obj => {

            if(new Date(obj.cretaedTime*1000).getHours() <= 4 && obj.runningState == 1)
            {
               return true
            }
        }).map(obj => ({...obj,type :"running"}))

        const stopped  = data_Needed.filter( obj => {
            if(new Date(obj.cretaedTime*1000).getHours() <= 4 && obj.runningState == 0 && !obj.ingnition)
            {
               return true
            }
        }).map(obj =>({...obj,type :"stopped"}))
        
        const idle = data_Needed.filter( obj => {
            if(new Date(obj.cretaedTime*1000).getHours() <= 4 && obj.runningState == 0 && obj.ingnition)
            {
               return true
            }
        }).map(obj =>({...obj,type :"idle"}))
        
        const error = data_Needed.filter( obj => {
            if(new Date(obj.cretaedTime*1000).getHours() > 4)
            {
               return true
            }
        }).map(obj =>({...obj,type :"error"}))
  
        data_Needed = [...running,...stopped,...idle,...error]
        setTruckData({ running :running,stopped :stopped,idle:idle,error:error,total:data_Needed})
        setDataLoaded(data_Needed)
        setIsLoading(false)
        }).catch(error => console.log(error))
  },[])

  if(isLoading)
  return null
  else return (
    <div className="App">
     
     {selectedData.total.length >0?
        
      <TabBar tabData = {{'Total Trucks':selectedData.total.length,
        'Running Trucks' : selectedData.running.length,
        'Stopped Trucks' : selectedData.stopped.length,
        'Idle Trucks' : selectedData.idle.length,
        'Error Trucks' : selectedData.error.length,
        }}
        clicked={tabkey}
        ondeleteClick={ondeleteClick}
          selectedData={selectedData.total}
          total = {truckData.total}
          onSelect={onSelect}
          onClick = {tabClicked}
          from="select"
        />
        :<TabBar tabData = {{'Total Trucks':truckData.total.length,
        'Running Trucks' : truckData.running.length,
        'Stopped Trucks' : truckData.stopped.length,
        'Idle Trucks' : truckData.idle.length,
        'Error Trucks' : truckData.error.length,
        }}
        from ="normal"
        clicked={tabkey}
        ondeleteClick={ondeleteClick}
          selectedData={selectedData.total}
          total = {truckData.total}
          onSelect={onSelect}
          onClick = {tabClicked}
        />}
     <div className="body">
      <div className = "sidebar">
      <div className="searchBar">
      <input type="text" value={inputValue} className="input" onChange={(event) => setInputValue(event.target.value)}   placeholder="search"/></div>
      
        {inputValue.length > 0? dataLoaded.filter(data => {if(data.truckNumber.indexOf(inputValue) > -1) return true})
          .map(obj => <SideBarElement key = {obj.id} sideElement={obj}/>)
        :
          dataLoaded.map(obj => <SideBarElement key = {obj.id} sideElement={obj}/>)}
      </div>
      <div className = "map">
      {dataLoaded.length>0?
      <Map google={props.google} zoom={10}  initialCenter={{
            lat: dataLoaded[0].lat,
            lng: dataLoaded[0].lng
        }}>
          {dataLoaded.map( data =>{ 
          if(data.type === "idle")
          {
            return (<Marker key={data.id} position={{ lat:data.lat , lng: data.lng}}  icon={{
      url: "https://homesbyeagle.com/wp-content/uploads/2018/08/256-256-56165014858e6dbadaf3ba00d782f125.png",
      scaledSize: new window.google.maps.Size(34,34)
    }}
          />
          )}
          if(data.type === "running")
          {
            return (<Marker key={data.id} position={{ lat:data.lat , lng: data.lng}}  icon={{
      url: "https://getdrawings.com/free-icon/map-marker-icon-png-54.png",
      scaledSize: new window.google.maps.Size(34,34)
    }}
          />
          )}
          if(data.type === "stopped")
          {return (<Marker key={data.id} position={{ lat:data.lat , lng: data.lng}}  icon={{
      url: "https://www.freepngimg.com/download/map/66932-openstreetmap-map-google-icons-maps-computer-marker.png",
      scaledSize: new window.google.maps.Size(34,34)
    }}
          />
          )}
          if(data.type === "error")
          {
            return (<Marker key={data.id} position={{ lat:data.lat , lng: data.lng}}  icon={{
      url: "https://i.pinimg.com/originals/25/62/aa/2562aacd1a4c2af60cce9629b1e05cf2.png",
      scaledSize: new window.google.maps.Size(34,34)
    }}
          />
          )
          }
          })}
      </Map>: <Map google = {props.google} zoom={10}/>}
      </div>
      </div>
    </div>
  );
}
export default GoogleApiWrapper({
  apiKey: ("AIzaSyCPeMZGBtqJzmbkNixvRP1V2nQyu1Ik3rk")
})(App)

