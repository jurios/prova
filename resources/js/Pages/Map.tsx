import Layout from "../Layout/Layout";
import {Wrapper} from "@googlemaps/react-wrapper";
import {SharedProps} from "../SharedProps";
import {usePage} from "@inertiajs/react";
import MapVisor from "../Components/MapVisor/MapVisor";
import {Observation} from "../Models/Observation";
import React from "react";
import SpeciesSelect from "../Components/Input/SpeciesSelect";
import useFilters from "../Hooks/useFilters";
import YearSelect from "../Components/Input/YearSelect";
import LoadingOverlay from "../Components/LoadingOverlay";

interface MapProps {
    observations: Observation[],
    species: {latin_name: string, name: string}[]
    years: number[]
}

const Map = (props: MapProps) => {
  const sharedProps: SharedProps = usePage().props as unknown as SharedProps;
  const {getQueryParamValue, setQueryParamValue, isLoading} = useFilters();

  return (
    <>
      <LoadingOverlay open={isLoading()} />
      <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="rounded-lg bg-white px-5 py-6 shadow sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 space-x-4">
            <
              SpeciesSelect species={props.species} value={getQueryParamValue("species", undefined)}
              onChange={(specie: string) => {setQueryParamValue("species", specie);}}
            />
            <
              YearSelect years={props.years} value={parseInt(getQueryParamValue("year", undefined))}
              onChange={(year?: number) => {setQueryParamValue("year", year?.toString());}}
            />
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="rounded-lg bg-white px-5 py-6 shadow sm:px-6">
          <div className="w-full h-96">
            <Wrapper apiKey={sharedProps.settings.apikeys.googlemaps}>
              <MapVisor markers={props.observations.map(item => ({
                lat: item.latitude,
                lng: item.longitude,
                latin_name: item.latin_name,
                name: item.name,
                observed_at: new Date(item.observed_at),
                observer: item.observer_name,
                locality: item.locality
              })) }/>
            </Wrapper>
          </div>
        </div>
      </div>
    </>
  );
};

Map.layout = page => <Layout title="Mapa d'observacions">{page}</Layout>;

export default Map;
