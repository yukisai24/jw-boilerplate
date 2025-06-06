import { IPlainObject } from '@/types/common';

/***********************************************************************************
 * This function is created for compare new filter params and current query params *
 * If this page has the dropdown search input, please pass the searchField         *
 * dropdown search input data must following type:                                 *
 * {                                                                               *
 *     [searchOptionFieldName] : value type,                                       *
 *     [searchValueFieldName] : value type,                                        *
 *     ...                                                                         *
 * }                                                                               *
 *                                                                                 *
 *                  **** PLEASE DO NOT USE THIS FUNCTION ****                      *
 * In case your type is:                                                           *
 * {                                                                               *
 *     [searchOptionFieldName]:  [searchValueFieldName]                            *
 *     ...                                                                         *
 *  }                                                                              *
 *                                                                                 */
export const compareQueryParams = <TClientFilter extends IPlainObject, TQueryParams extends IPlainObject>(
  clientFilter: TClientFilter,
  queryParams: TQueryParams,
  searchField?: { searchValueFieldName: keyof TClientFilter; searchOptionFieldName: keyof TClientFilter },
) => {
  const { searchValueFieldName, searchOptionFieldName } = searchField || {};

  let hasSearchValue = false;
  if (searchValueFieldName && searchOptionFieldName) {
    hasSearchValue = !!clientFilter?.[searchValueFieldName];
  }

  if (!hasSearchValue && searchValueFieldName && queryParams?.[searchValueFieldName as keyof TQueryParams]) {
    return false;
  }

  const isRefetch = Object.entries(clientFilter).every(([key, value]) => {
    if (!hasSearchValue) {
      if (searchOptionFieldName === key) {
        return true;
      }

      if (searchValueFieldName === key) {
        return true;
      }
    }

    if (typeof value !== typeof queryParams[key as keyof TQueryParams]) {
      return false;
    }

    if (typeof value !== 'object') {
      value === queryParams[key as keyof TQueryParams];
    }

    //handle compare array
    if (Array.isArray(value) || Array.isArray(value)) {
      if (!(Array.isArray(value) && Array.isArray(value))) {
        return false;
      }

      if (value.length !== queryParams[key as keyof TQueryParams].length) {
        return false;
      }

      return JSON.stringify(value.sort()) === JSON.stringify(queryParams[key as keyof TQueryParams].sort());
    }

    //handle compare object
    if (Object.keys(value).length !== Object.keys(queryParams[key as keyof TQueryParams]).length) {
      return false;
    }

    const sortedValue = Object.entries(value)
      .sort()
      .reduce((obj, [nestedKey, nestedValue]) => {
        obj[nestedKey as keyof IPlainObject] = nestedValue;
        return obj;
      }, {} as IPlainObject);

    const sortedQuery = Object.entries(queryParams[key as keyof TQueryParams])
      .sort()
      .reduce((obj, [nestedKey, nestedValue]) => {
        obj[nestedKey as keyof IPlainObject] = nestedValue;
        return obj;
      }, {} as IPlainObject);

    return JSON.stringify(sortedValue) === JSON.stringify(sortedQuery);
  });

  return isRefetch;
};
