import { Flex, Heading, Textarea } from "@chakra-ui/react";
import { useMutation } from "react-query";
import { Button } from "./components/ui/button";
import { Field } from "./components/ui/field";
import {
  GenerateReplySuggestionDto,
  ReplySuggestionsService,
} from "./services/reply-suggestions.service";
import { WhatsappUtils } from "./utils/whatsapp.utils";
import { useState } from "react";

const ContentApp = () => {
  const [conversationContext, setConversationContext] = useState("");
  const generateReplySuggestion = useMutation({
    mutationFn: async (
      generateReplySuggestionDto: GenerateReplySuggestionDto
    ) => {
      const { data } = await ReplySuggestionsService.generateReplySuggestion(
        generateReplySuggestionDto
      );
      return data;
    },
    onSuccess: (data) => {
      WhatsappUtils.fillMessageInput(data.message);
    },
  });

  function handleClickGenerateReply() {
    const messages = WhatsappUtils.getMessageHistory();
    generateReplySuggestion.mutate({
      messageHistory: messages,
      conversationContext,
    });
  }

  return (
    <Flex flexDir="column" height="100vh" gap={3}>
      <Heading>Conversa PRO</Heading>
      <Field label="Objetivo">
        <Textarea
          height="60vh"
          onChange={(e) => setConversationContext(e.target.value)}
        />
      </Field>
      <Button
        onClick={handleClickGenerateReply}
        loading={generateReplySuggestion.isLoading}
        justifySelf={"flex-end"}>
        Gerar mensagem
      </Button>
    </Flex>
  );
};

export default ContentApp;
