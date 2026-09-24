// src/components/ChatMessage.tsx
import React from 'react';

type Message = {
  from: 'agent' | 'contact';
  text: string;
};

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isAgent = message.from === 'agent';
  return (
    <div className={`flex ${isAgent ? 'justify-end' : 'justify-start'} mb-2`}>
      {!isAgent && (
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold mr-2 flex-shrink-0"
          style={{ backgroundColor: '#ECF0F5', color: '#091231' }}
        >
          C
        </div>
      )}
      <div
        className="max-w-xs rounded-2xl px-4 py-2 text-sm"
        style={
          isAgent
            ? { backgroundColor: '#091231', color: '#FFFFFF' }
            : { backgroundColor: '#ECF0F5', color: '#091231' }
        }
      >
        {isAgent && (
          <p className="text-xs font-semibold mb-1" style={{ color: '#29DDDA' }}>🤖 Agente IA</p>
        )}
        {message.text}
      </div>
      {isAgent && (
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ml-2 flex-shrink-0"
          style={{ backgroundColor: '#29DDDA', color: '#091231' }}
        >
          IA
        </div>
      )}
    </div>
  );
}
