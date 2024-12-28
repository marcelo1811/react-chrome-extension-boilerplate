import { apiRoutes } from "../constants/apiRoute";
import { request } from "../constants/request";
import { z } from "zod";
import { MessageHistoryItemSchema } from "../types/MessageHistory";
import { AxiosResponse } from "axios";

export const GenerateReplySuggestionDtoSchema = z.object({
  messageHistory: z.array(MessageHistoryItemSchema),
  conversationContext: z.string(),
});

export type GenerateReplySuggestionDto = z.infer<
  typeof GenerateReplySuggestionDtoSchema
>;

async function generateReplySuggestion(
  generateReplySuggestionDto: GenerateReplySuggestionDto
): Promise<AxiosResponse<{ message: string }>> {
  return request.post(
    apiRoutes.generateReplySuggestion(),
    generateReplySuggestionDto
  );
}

export const ReplySuggestionsService = {
  generateReplySuggestion,
};
