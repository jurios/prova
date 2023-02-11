export interface SharedProps {
    errors: Record<string, unknown>,
    settings: {
        apikeys: {
            googlemaps: null | string
        };
    }
}
