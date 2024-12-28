import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";
import { STORAGE_KEYS } from "@/constants/storage-keys";
import { Box, useDisclosure } from "@chakra-ui/react";
import { useEffect } from "react";

const MainScreen = () => {
  const showPanel = useDisclosure();

  useEffect(() => {
    chrome.storage.local.get([STORAGE_KEYS.IS_ENABLED, STORAGE_KEYS.ACCESS_TOKEN], (data) => {
      if (data[STORAGE_KEYS.IS_ENABLED] && data[STORAGE_KEYS.ACCESS_TOKEN]) {
        showPanel.onOpen();
      }
    });
  }, []);

  function handleToggle() {
    if (showPanel.open) {
      chrome.storage.local.remove(STORAGE_KEYS.IS_ENABLED);
    } else {
      chrome.storage.local.set({ [STORAGE_KEYS.IS_ENABLED]: true });
    }

    showPanel.onToggle();
  }

  function handleLogout() {
    chrome.storage.local.remove(STORAGE_KEYS.ACCESS_TOKEN);
    chrome.storage.local.remove(STORAGE_KEYS.IS_ENABLED);
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" gap="4">
      <Field label="Mostrar painel">
        <Switch checked={showPanel.open} onCheckedChange={handleToggle} size="lg" colorScheme="blue">
          {showPanel.open ? "Ativo" : "Inativo"}
        </Switch>
      </Field>
      <Button onClick={handleLogout} size="lg">Sair</Button>
    </Box>
  );
};

export default MainScreen;
