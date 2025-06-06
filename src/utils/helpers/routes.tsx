import { ReactNode } from 'react';
import { Navigate, Route } from 'react-router-dom';

import { IPlainObject } from '@/types/common';
import { RouteItem } from '@/types/route';

const generateRoute = (routes: RouteItem[]): ReactNode => {
  return routes.map((route) => {
    return (
      <Route
        path={route.path}
        element={route.element}
        key={route.path}
      >
        {route.child?.length && (
          <>
            <Route
              index
              element={route.child[0].path ? <Navigate to={route.child[0].path} /> : route.child[0].element}
            />
            {generateRoute(route.child)}
          </>
        )}
      </Route>
    );
  });
};

const getRoute = (path: string, params: IPlainObject, prefix = ':') => {
  let newPath = path;
  Object.entries(params).forEach(([key, value]) => {
    newPath = newPath.replace(prefix + key, value);
  });
  return newPath;
};

export { generateRoute, getRoute };
