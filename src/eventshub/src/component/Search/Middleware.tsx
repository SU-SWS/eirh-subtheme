import { useLayoutEffect } from "react";
import { useInstantSearch } from "react-instantsearch-core";
import { useAppSelector } from "../../redux/store";

function middleware({ instantSearchInstance }, keys) {
  return {
    onStateChange({ uiState }) {
      if (!uiState) return;
      console.log('MIDDLE STATE', uiState);
      console.log('MIDDLE INSTANCE', instantSearchInstance);

    },
  }
}

export function Middleware() {
  const { addMiddlewares } = useInstantSearch();
  const { keys } = useAppSelector((state) => state.filters);
  const wrappedMiddleware = (state) => middleware(state, keys);

  useLayoutEffect(() => {
    return addMiddlewares(wrappedMiddleware);
  }, [addMiddlewares, wrappedMiddleware, keys]);

  return null;
}
