import {useEffect, useRef, useState} from "react";
import React from "react";
import Marker = google.maps.Marker;
import {MarkerClusterer} from "@googlemaps/markerclusterer";

interface MapVisorProps  {
    markers: { lat: number, lng: number }[]
}
export default function MapVisor(props: MapVisorProps) {
  const ref = useRef<HTMLDivElement>();
  const [map, setMap] = useState<google.maps.Map>();
  const [markers, setMarkers] = useState<Marker[]>([]);

  useEffect(() => {
    markers.forEach(marker => marker.setMap(null));
    const newMarkers: Marker[] =props.markers.map(latLng => new google.maps.Marker({
      position: latLng,
    }));
    setMarkers(newMarkers);
    new MarkerClusterer({markers: newMarkers, map});

  }, [props.markers, map]);

  useEffect(() => {
    const map: google.maps.Map = new window.google.maps.Map(ref.current, {
      center: {lat: 0, lng: 0},
      zoom: 1
    });

    setMap(map);
  }, []);

  return <div className="w-full h-full" ref={ref} id="map"/>;
}
