import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import Button from '@mui/material/Button';
import './mapcontent.css'

mapboxgl.accessToken = 'pk.eyJ1IjoiMTI4ODAxNTUiLCJhIjoiY2x2cnY3d2ZkMHU4NzJpbWdwdHRvbjg2NSJ9.Mn-C9eFgQ8kO-NhEkrCnGg';

export default function MapComponent({longitude, latitude}) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);
  const marker = useRef(null); // Reference to the marker

  useEffect(() => {
    if (!map.current) {
      // initialize map only once
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [lng, lat],
        zoom: zoom
    });
    applyLatLon();
  }
  else
  {
    applyLatLon();
  }

    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  },[longitude,latitude]);

  function applyLatLon(){
    if(longitude && latitude)
    {
      setLat(latitude)
      setLng(longitude)
      map.current.setCenter([longitude,latitude])
      console.log("latitude is " + latitude + " longitude is " + longitude)
      // Add or update marker at new coordinates
      if (marker.current) {
        marker.current.setLngLat([longitude, latitude]);
      } else {
        marker.current = new mapboxgl.Marker()
          .setLngLat([longitude, latitude])
          .addTo(map.current);
      }  
        
    }
    
  }

  function recenter(){
    if( longitude && latitude)
    {
      setLat(latitude)
      setLng(longitude)
      map.current.setCenter([longitude,latitude])
      
    }
  }

  return (
    <div className="map-wrapper"> 
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className="map-container" />
        <Button variant='contained' color='primary' onClick={recenter} className="recenter-button">Recenter</Button>
    </div>
  );
}