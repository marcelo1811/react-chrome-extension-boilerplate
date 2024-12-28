"use client";

import { ChakraProvider, EnvironmentProvider } from "@chakra-ui/react";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { useEffect, useState } from "react";
import root from "react-shadow/emotion";
import { system } from "./system";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export function Provider(props: {
  children: React.ReactNode;
  theme?: Record<string, any>;
}) {
  const [shadow, setShadow] = useState<HTMLElement | null>(null);
  const [cache, setCache] = useState<ReturnType<typeof createCache> | null>(
    null
  );

  useEffect(() => {
    if (!shadow?.shadowRoot || cache) return;
    const emotionCache = createCache({
      key: "root",
      container: shadow.shadowRoot,
    });
    setCache(emotionCache);
  }, [shadow, cache]);

  return (
    <root.div ref={setShadow}>
      <QueryClientProvider client={queryClient}>
        {shadow && cache && (
          <EnvironmentProvider value={() => shadow.shadowRoot ?? document}>
            <CacheProvider value={cache}>
              <ChakraProvider value={system}>
                <div style={{ padding: '10px' }}>
                  {props.children}
                </div>
              </ChakraProvider>
            </CacheProvider>
          </EnvironmentProvider>
        )}
      </QueryClientProvider>
    </root.div>
  );
}
