// src/locales/messages.ts

// Define your message module structure (per file)
export type BaseMessageModule = {
  [key: string]: string | Record<string, any>
}

// Combine with Element Plus type
export type CombinedMessageSchema = BaseMessageModule & {
  el?: Record<string, any>
}
