import React from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { showDataOnMap } from '../util/util.jsx';

const ChangeView = ({ center, zoom }) => {
  const map = useMap();
  map.setView(center, zoom);
  return null;
};

const Map = ({ center, zoom, countries, casesType }) => {
  console.log(casesType, "Map");
  return (
    <div className='h-[500px] bg-white p-4 rounded-3xl mt-4 shadow-md shadow-black/40'>
      <MapContainer className='w-full h-full' center={center} zoom={zoom}>
        <ChangeView center={center} zoom={zoom}/>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {showDataOnMap(countries, casesType)}
      </MapContainer>
    </div>
  );
}

export default Map;
