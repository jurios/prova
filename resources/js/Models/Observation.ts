export interface Observation {
    id: number;
    latin_name: string;
    name: string;

    observer_name: string;

    locality: string;

    latitude: number;
    longitude: number;

    observed_at: string

    observed_at_week: string;

    count: number;

}
