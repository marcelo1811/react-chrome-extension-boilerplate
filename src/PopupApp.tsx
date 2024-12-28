import {
  Box,
  ChakraProvider,
  defaultSystem,
  useDisclosure,
} from "@chakra-ui/react";
import MainScreen from "./popup/screens/MainScreen";
import { useEffect } from "react";
import AuthScreen from "./popup/screens/AuthScreen";
import { QueryClient, QueryClientProvider } from "react-query";
import { STORAGE_KEYS } from "./constants/storage-keys";

const queryClient = new QueryClient();

const PopupApp = () => {
  const isAuthenticated = useDisclosure();

  useEffect(() => {
    chrome.storage.local.get(STORAGE_KEYS.ACCESS_TOKEN, (data) => {
      if (data[STORAGE_KEYS.ACCESS_TOKEN]) {
        isAuthenticated.onOpen();
      }
    });

    chrome.storage.local.onChanged.addListener((changes) => {
      if (changes[STORAGE_KEYS.ACCESS_TOKEN]) {
        if (changes[STORAGE_KEYS.ACCESS_TOKEN].newValue) {
          isAuthenticated.onOpen();
        } else {
          isAuthenticated.onClose();
        }
      }
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider value={defaultSystem}>
        <Box width="300px" height="200px" padding="10px">
          {isAuthenticated.open ? <MainScreen /> : <AuthScreen />}
        </Box>
      </ChakraProvider>
    </QueryClientProvider>
  );
};

export default PopupApp;
