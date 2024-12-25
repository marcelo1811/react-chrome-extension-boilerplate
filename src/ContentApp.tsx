import { Box, Button, Spinner, useDisclosure } from "@chakra-ui/react";
import { Provider } from "./components/ui/provider";

const ContentApp = () => {
  const isLoading = useDisclosure()
  return (
    <Provider>
      <Box bgColor={"red"}>
        <div>ContentApp</div>
        <Button onClick={isLoading.onToggle}>Toggle</Button>
        {isLoading.open && <Spinner />}
      </Box>
    </Provider>
  );
};

export default ContentApp;
