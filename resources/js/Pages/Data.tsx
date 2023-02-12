import React from "react";
import Layout from "../Layout/Layout";
import SpeciesSelect from "../Components/Input/SpeciesSelect";
import YearSelect from "../Components/Input/YearSelect";
import useFilters from "../Hooks/useFilters";
import {Observation} from "../Models/Observation";
import ObservationTable from "../Components/ObservationTable";
import {Paginated} from "../Models/Paginated";

interface DataProps {
    observations: Paginated<Observation>,
    species: {latin_name: string, name: string}[]
    years: number[]
}

const Data = (props: DataProps) => {
  const {getQueryParamValue, setQueryParamValue} = useFilters();

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="rounded-lg bg-white px-5 py-6 shadow sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 space-x-4">
            <
              SpeciesSelect species={props.species} value={getQueryParamValue("species", undefined)}
              onChange={(specie: string) => {
                setQueryParamValue("species", specie);
              }}
            />
            <
              YearSelect years={props.years} value={parseInt(getQueryParamValue("year", undefined))}
              onChange={(year?: number) => {
                setQueryParamValue("year", year?.toString());
              }}
            />
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="rounded-lg bg-white px-5 py-6 shadow sm:px-6">
          <ObservationTable observations={props.observations} />
        </div>
      </div>
    </>
  );
};

Data.layout = page => <Layout title="Taula de dades">
  {page}
</Layout>;

export default Data;
