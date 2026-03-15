import {
  Bot,
  BarChart3,
  MessageSquare,
  Settings,
  ExternalLink,
} from "lucide-react";

export default function ChatbotManager() {
  const openBotpress = () => {
    window.open(
      "https://app.botpress.cloud/workspaces/wkspace_01KJVJS767TZDKVQJ696C70VCR/bots/ec614985-d883-4974-8b50-4b54d8c017e6/conversations",
      "_blank",
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      {/* Header */}
      <div className="flex items-center gap-3 mb-10">
        <Bot size={32} className="text-blue-600" />
        <h1 className="text-3xl font-bold">Chatbot Dashboard</h1>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Statistics */}
        <div className="bg-white rounded-2xl shadow p-6">
          <div className="flex items-center gap-3 mb-3">
            <BarChart3 className="text-blue-500" />
            <h2 className="font-semibold text-lg">Thống kê</h2>
          </div>
          <p className="text-gray-500 text-sm">
            Xem dữ liệu hoạt động của chatbot.
          </p>
        </div>

        {/* Messages */}
        <div className="bg-white rounded-2xl shadow p-6">
          <div className="flex items-center gap-3 mb-3">
            <MessageSquare className="text-green-500" />
            <h2 className="font-semibold text-lg">Tin nhắn</h2>
          </div>
          <p className="text-gray-500 text-sm">
            Kiểm tra hội thoại của người dùng.
          </p>
        </div>

        {/* Settings */}
        <div className="bg-white rounded-2xl shadow p-6">
          <div className="flex items-center gap-3 mb-3">
            <Settings className="text-orange-500" />
            <h2 className="font-semibold text-lg">Cài đặt</h2>
          </div>
          <p className="text-gray-500 text-sm">Quản lý cấu hình chatbot.</p>
        </div>
      </div>

      {/* Botpress button */}
      <div className="mt-10">
        <button
          onClick={openBotpress}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition"
        >
          <ExternalLink size={18} />
          Mở Botpress Dashboard
        </button>
      </div>
    </div>
  );
}
