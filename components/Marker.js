import React from 'react'
import {Marker} from 'google-maps-react';

const CustomMarker = (props) => {
  
  return <Marker position={{ lat:props.position.lat , lng: props.position.lng}}/>
}

export default CustomMarker