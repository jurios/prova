import {router, usePage} from "@inertiajs/react";
import {useState} from "react";

interface UseFiltersReturn {
    hasQueryParam: (param: string) => boolean;
    getQueryParamValue: (param: string, defaultValue?: string | null) => string;
    setQueryParamValue: (param: string, value: string | null) => void;

    isLoading: () => boolean
}

export default function useFilters(): UseFiltersReturn {
  const params: URLSearchParams = new URLSearchParams(window.location.search);
  const {url} = usePage();
  const [loading, setLoading] = useState<boolean>(false);

  return {
    hasQueryParam: (param: string) => {
      return params.has(param);
    },

    getQueryParamValue: (param: string, defaultValue: string | null | undefined = undefined) => {
      if (params.has(param)) {
        return params.get(param);
      }

      return defaultValue;
    },

    setQueryParamValue: (param: string, value: string | null | undefined) => {
      //If there is a filter change we should remove 'page' query param in order to reset pagination
      if (params.has("page")) {
        params.delete("page");
      }

      if (params.has(param)) {
        params.delete(param);
      }

      if (value !== undefined) {
        params.set(param, value);
      }

      setLoading(true);
      router.get(url.split("?")[0], params, {
        preserveState: true,
        preserveScroll: true,
        onFinish: () => {
          setLoading(false);
        }
      });
    },
    isLoading: () => {
      return loading;
    }
  };
}
