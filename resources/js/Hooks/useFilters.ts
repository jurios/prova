import {router, usePage} from "@inertiajs/react";

interface UseFiltersReturn {
    hasQueryParam: (param: string) => boolean;
    getQueryParamValue: (param: string, defaultValue?: string | null) => string;
    setQueryParamValue: (param: string, value: string | null) => void;
}

export default function useFilters(): UseFiltersReturn {
  const params: URLSearchParams = new URLSearchParams(window.location.search);
  const {url} = usePage();

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
      if (params.has(param)) {
        params.delete(param);
      }

      if (value !== undefined) {
        params.set(param, value);
      }

      router.get(url.split("?")[0], params, {
        preserveState: true,
        preserveScroll: true
      });
    }
  };
}
