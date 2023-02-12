import {useEffect, useRef, useState} from "react";
import React from "react";
import Marker = google.maps.Marker;
import {MarkerClusterer} from "@googlemaps/markerclusterer";
import InfoWindow = google.maps.InfoWindow;
import {renderToStaticMarkup} from "react-dom/server";
import ObservationInfoWindow from "./InfoWindow";
import LatLngBounds = google.maps.LatLngBounds;

interface MapVisorProps {
    markers: {
        lat: number,
        lng: number
        latin_name: string;
        name: string;
        observed_at: Date;
        observer: string;
        locality: string;
    }[]
}

export default function MapVisor(props: MapVisorProps) {
  const ref = useRef<HTMLDivElement>();
  const [map, setMap] = useState<google.maps.Map>(undefined);
  const [,setMarkers] = useState<Marker[]>([]);
  const [markerCluster, setMarkerCluster] = useState<MarkerClusterer>(undefined);

  useEffect(() => {
    if (markerCluster) {
      markerCluster.clearMarkers();
      markerCluster.setMap(null);
    }

    if (map) {
      const bounds: LatLngBounds = new google.maps.LatLngBounds();
      const newMarkers: Marker[] = props.markers.map(data => {

        //Create the marker
        const googleMarker: Marker = new google.maps.Marker({
          position: {lat: data.lat, lng: data.lng},
        });

        //Extend the current bound with the marker position in order
        // to center the map afterwards markers creation
        bounds.extend(googleMarker.getPosition());

        //Set an empty infowindow. It will be filled with a component during
        // infowindow rendering
        const infoWindow: InfoWindow = new google.maps.InfoWindow({
          content: ""
        });

        googleMarker.addListener("click", () => {
          const content: string = renderToStaticMarkup(
            <ObservationInfoWindow
              latin_name={data.latin_name}
              name={data.name}
              observed_at={data.observed_at}
              observer={data.observer}
              locality={data.locality}
            />);
          infoWindow.setContent(content);
          infoWindow.open(map, googleMarker);
        });

        return googleMarker;
      });

      map.fitBounds(bounds);

      // Cluster them as a quick way to optimize the map...
      const cluster: MarkerClusterer = new MarkerClusterer({markers: newMarkers, map});
      setMarkers(newMarkers);
      setMarkerCluster(cluster);
    }
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
