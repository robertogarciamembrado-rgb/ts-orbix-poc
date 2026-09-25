// src/app/espacio/bandeja/page.tsx
import Card from '@/components/Card';
import ChatMessage from '@/components/ChatMessage';

const mockConversation = [
  {
    from: 'contact' as const,
    text: 'Hola! ¿Tienen algo nuevo para este fin de semana?',
  },
  {
    from: 'agent' as const,
    text: 'Basado en tus preferencias de viaje, te recomendamos este Tour Gastronómico 🍷 Disponible este sábado en Madrid. ¿Te interesa?',
    promoted: true,
  },
  {
    from: 'contact' as const,
    text: '¡Suena genial! ¿Cuándo es?',
  },
  {
    from: 'agent' as const,
    text: 'El próximo sábado a las 11:00h. Puedo reservarte una plaza ahora mismo. 🎟️',
  },
];

export default function WorkspaceInbox() {
  return (
    <div className="flex h-full gap-4">
      {/* Conversation list panel */}
      <Card title="Conversaciones">
        <ul className="space-y-2 min-w-48">
          {['wa_+34123456789', 'wa_+34987654321'].map((id) => (
            <li
              key={id}
              className="p-2 rounded cursor-pointer hover:bg-gray-100 text-sm text-gray-700"
            >
              {id}
            </li>
          ))}
        </ul>
      </Card>

      {/* Chat panel */}
      <div className="flex flex-col flex-1">
        <Card title="WhatsApp – wa_+34123456789">
          <div className="space-y-2 min-h-64 max-h-96 overflow-y-auto pr-2">
            {mockConversation.map((msg, idx) => (
              <ChatMessage key={idx} message={msg} />
            ))}
          </div>

          {/* Source badge */}
          <div className="mt-2 flex items-center gap-2">
            <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">
              🤖 Agente IA Activo
            </span>
            <span className="text-xs text-gray-400">Canal: WhatsApp</span>
          </div>

          {/* Input placeholder */}
          <div className="mt-4 flex gap-2">
            <input
              type="text"
              readOnly
              placeholder="Escribe un mensaje…"
              className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button className="px-4 py-2 bg-emerald-600 text-white text-sm rounded-lg hover:bg-emerald-700 transition">
              Enviar
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}
