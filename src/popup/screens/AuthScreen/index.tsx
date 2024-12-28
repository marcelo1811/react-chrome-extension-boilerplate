import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { STORAGE_KEYS } from "@/constants/storage-keys";
import { AuthService } from "@/services/auth.service";
import { Box, Input } from "@chakra-ui/react";
import { useState } from "react";
import { useMutation } from "react-query";

const AuthScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const login = useMutation({
    mutationFn: async (params: { email: string; password: string }) => {
      const { email, password } = params;
      const { data } = await AuthService.loginUser(email, password);
      return data;
    },
    onSuccess: (data) => {
      chrome.storage.local.set({
        [STORAGE_KEYS.ACCESS_TOKEN]: data.accessToken,
      });
      chrome.storage.local.set({ [STORAGE_KEYS.IS_ENABLED]: true });
    },
    onError: (error) => {
      setError("Invalid email or password");
    },
  });

  const handleLogin = () => {
    if (email && password) {
      login.mutate({ email, password });
    }
  };

  return (
    <Box display="flex" flexDirection="column" justifyContent="center" gap="2">
      <Field label="Email">
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Digite seu email"
        />
      </Field>
      <Field label="Senha">
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Digite sua senha"
        />
      </Field>
      <Button onClick={handleLogin} loading={login.isLoading} colorScheme="blue">Entrar</Button>
      {error && <Box color="red.500" fontWeight="bold" textAlign="center">{error}</Box>}
    </Box>
  );
};

export default AuthScreen;
