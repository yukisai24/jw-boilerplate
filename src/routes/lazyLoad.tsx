import { ComponentType, lazy, Suspense } from 'react';

import { LoadingSpinner } from '@/components/ui/common/LoadingSpinner';

import { IPlainObject } from '@/types/common';

const lazyLoad = (
  importFunc: () => Promise<{ default: ComponentType<unknown> }>,
) => {
  const LazyComponent = lazy(importFunc);

  return (props: IPlainObject) => (
    <Suspense
      fallback={
        <>
          <LoadingSpinner />
        </>
      }
    >
      <LazyComponent {...props} />
    </Suspense>
  );
};

export default lazyLoad;
