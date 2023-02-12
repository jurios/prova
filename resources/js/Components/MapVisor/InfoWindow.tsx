import React from "react";

interface ObservationInfoWindowProps  {
    latin_name: string;
    name: string;
    observed_at: Date;
    observer: string;
    locality: string;
}
export default function ObservationInfoWindow(props: ObservationInfoWindowProps) {
  return (
    <div className="w-full">
      <ul>
        <li><b>Nom científic:</b> {props.latin_name}</li>
        <li><b>Nom comú:</b> {props.name}</li>
        <li><b>Data d&apos;observació:</b> {props.observed_at.toISOString()}</li>
        <li><b>Observador:</b> {props.observer}</li>
        <li><b>Poble/Ciutat:</b> {props.locality}</li>
      </ul>
    </div>
  );
}
