import {Observation} from "../Models/Observation";
import {Paginated} from "../Models/Paginated";
import { faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link} from "@inertiajs/react";
import {classNames} from "../Helpers";
import React from "react";

interface ObservationTableProps {
    observations: Paginated<Observation>;
}

export default function ObservationTable(props: ObservationTableProps) {
  return (
    <div className="mt-8 flex flex-col">
      <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Nom científic
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Nom comú
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Setmana
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Exemplars
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {props.observations.data.map((observation, index) => (
                  <tr key={index}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                      {observation.latin_name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {observation.name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {new Date(observation.observed_at_week).toLocaleDateString()}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {observation.count}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
              <div className="flex flex-1 justify-between sm:hidden">
                <Link
                  href={props.observations.prev_page_url}
                  className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                                    Previous
                </Link>
                <a
                  href={props.observations.next_page_url}
                  className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                                    Next
                </a>
              </div>
              <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                                        Showing <span className="font-medium">{props.observations.current_page}</span> to <span className="font-medium">{props.observations.to}</span> of{" "}
                    <span className="font-medium">{props.observations.total}</span> results
                  </p>
                </div>
                <div>
                  <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                    <Link
                      preserveScroll={true}
                      preserveState={true}
                      href={props.observations.links[0].url}
                      className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
                    >
                      <span className="sr-only">Previous</span>
                      <FontAwesomeIcon icon={faChevronLeft} className="h-5 w-5" aria-hidden="true" />
                    </Link>
                    {
                      props.observations.links.slice(1, props.observations.links.length -1).map((item, index) => (
                        <Link
                          preserveScroll={true}
                          preserveState={true}
                          key={index}
                          href={item.url}
                          aria-current="page"
                          className={classNames(
                            "relative inline-flex items-center border px-4 py-2 text-sm font-medium focus:z-20",
                            item.active ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600" : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                          )}
                        >
                          {item.label}
                        </Link>
                      ))
                    }
                    <Link
                      preserveScroll={true}
                      preserveState={true}
                      href={props.observations.links[props.observations.links.length - 1].url}
                      className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
                    >
                      <span className="sr-only">Next</span>
                      <FontAwesomeIcon icon={faChevronRight} className="h-5 w-5" aria-hidden="true" />
                    </Link>
                  </nav>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
