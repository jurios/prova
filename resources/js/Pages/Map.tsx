import Layout from "../Layout/Layout";
import {Wrapper} from "@googlemaps/react-wrapper";
import {SharedProps} from "../SharedProps";
import {usePage} from "@inertiajs/react";
import MapVisor from "../Components/MapVisor";
import {Observation} from "../Models/Observation";
import React from "react";

interface MapProps {
    observations: Observation[],
    species: {latin: string, name: string}[]
    years: number[]
}

const Map = (props: MapProps) => {
  const sharedProps: SharedProps = usePage().props as unknown as SharedProps;
  return (
    <>
      <div className="w-full h-96">
        <Wrapper apiKey={sharedProps.settings.apikeys.googlemaps}>
          <MapVisor markers={props.observations.map(item => ({
            lat: item.latitude,
            lng: item.longitude
          })) }/>
        </Wrapper>
      </div>
    </>
  );
};

Map.layout = page => <Layout title="Mapa d'observacions">{page}</Layout>;

export default Map;
