import {
  createSearchParamsCache,
  createSerializer,
  parseAsString,
} from "nuqs/server";

export const searchParams = {
  carrier: parseAsString,
  label: parseAsString,
};

export const searchParamsCache = createSearchParamsCache(searchParams);
export const searchParamsSerializer = createSerializer(searchParams);
