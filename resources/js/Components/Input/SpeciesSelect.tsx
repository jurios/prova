import {useState} from "react";
import {Combobox} from "@headlessui/react";
import { faChevronDown, faCheck } from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {classNames} from "../../Helpers";
import React from "react";

interface SpeciesSelectProps {
    species: {latin_name: string, name: string}[];
}
export default function SpeciesSelect(props: SpeciesSelectProps) {
  const [query, setQuery] = useState("");
  const [selectedPerson, setSelectedPerson] = useState(null);

  const filteredPeople =
        query === ""
          ? props.species
          : props.species.filter((person) => {
            return person.latin_name.toLowerCase().includes(query.toLowerCase())
                    || person.name.toLowerCase().includes(query.toLowerCase());
          });

  return (
    <Combobox as="div" value={selectedPerson} onChange={setSelectedPerson}>
      <Combobox.Label className="block text-sm font-medium text-gray-700">Assigned to</Combobox.Label>
      <div className="relative mt-1">
        <Combobox.Input
          className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
          onChange={(event) => setQuery(event.target.value)}
          displayValue={(person: {latin_name: string, name: string}) => person?.latin_name}
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <FontAwesomeIcon icon={faChevronDown} className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </Combobox.Button>

        {filteredPeople.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredPeople.map((person) => (
              <Combobox.Option
                key={person.latin_name}
                value={person}
                className={({ active }) =>
                  classNames(
                    "relative cursor-default select-none py-2 pl-3 pr-9",
                    active ? "bg-indigo-600 text-white" : "text-gray-900"
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <div className="flex">
                      <span className={classNames("truncate", selected && "font-semibold")}>
                        {person.latin_name}
                      </span>
                      <span
                        className={classNames(
                          "ml-2 truncate text-gray-500",
                          active ? "text-indigo-200" : "text-gray-500"
                        )}
                      >
                        {person.name}
                      </span>
                    </div>

                    {selected && (
                      <span
                        className={classNames(
                          "absolute inset-y-0 right-0 flex items-center pr-4",
                          active ? "text-white" : "text-indigo-600"
                        )}
                      >
                        <FontAwesomeIcon icon={faCheck} className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  );
}
