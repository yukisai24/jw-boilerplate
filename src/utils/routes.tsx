import { createElement, lazy, ReactNode } from 'react';
import { Navigate, Route, RouteObject } from 'react-router-dom';

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
              element={
                route.child[0].path ? (
                  <Navigate to={route.child[0].path} />
                ) : (
                  route.child[0].element
                )
              }
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

const pages = import.meta.glob('/src/pages/**/*.tsx');

export const autoRoutes: RouteObject[] = Object.entries(pages).map(
  ([filePath, loader]) => {
    const path = filePath
      .replace('/src/pages', '')
      .replace(/\/index\.tsx$/, '')
      .replace(/\.tsx$/, '')
      .toLowerCase();

    const LazyComponent = lazy(
      loader as () => Promise<{ default: React.ComponentType<any> }>,
    );

    return {
      path: path === '' ? '/' : path,
      element: createElement(LazyComponent), // 👈 lazy() 결과를 JSX로 감싸줌
    };
  },
);
