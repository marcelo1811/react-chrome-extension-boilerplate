import { z } from 'zod';

export const MessageHistoryItemSchema = z.object({
  isFromUser: z.boolean(),
  text: z.string(),
});

export type MessageHistoryItem = z.infer<typeof MessageHistoryItemSchema>;