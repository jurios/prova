import {useEffect, useState} from "react";
import {Combobox} from "@headlessui/react";
import { faChevronDown, faCheck } from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {classNames} from "../../Helpers";
import React from "react";
import {BaseInputProps} from "./BaseInputProps";
import ResetBadge from "./ResetBadge";

interface SpeciesSelectProps extends BaseInputProps<number> {
    years: number[]
}
export default function YearSelect(props: SpeciesSelectProps) {
  const [query, setQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState<number>(null);

  useEffect(() => {
    if (Array.isArray(props.years) && props.years.length > 0) {
      const selected = props.years.filter(item => item === props.value);
      if (selected.length > 0) {
        setSelectedYear(selected[0]);
      }
    }
  }, [props.value]);

  function handleOnChange(year: number): void {
    props.onChange ? props.onChange(year): null;
    setSelectedYear(year);
  }

  const filteredYears =
        query === ""
          ? props.years
          : props.years.filter((year) => {
            return year.toString().toLowerCase().includes(query.toLowerCase());
          });

  return (
    <Combobox as="div" value={selectedYear} onChange={handleOnChange}>
      <Combobox.Label className="block text-sm font-medium text-gray-700">
        <div className="flex flex-row">
          <span>Any de la observació</span>
          {
            selectedYear !== null ? (
              <ResetBadge onClick={() => {
                handleOnChange(null);
              }}></ResetBadge>
            ): null
          }
        </div>
      </Combobox.Label>
      <div className="relative mt-1">
        <Combobox.Input
          className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
          onChange={(event) => setQuery(event.target.value)}
          displayValue={(year: number) => year?.toString()}
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <FontAwesomeIcon icon={faChevronDown} className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </Combobox.Button>

        {filteredYears.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredYears.map((year) => (
              <Combobox.Option
                key={year}
                value={year}
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
                        {year.toString()}
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
