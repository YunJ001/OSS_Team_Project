import { useEffect, useState, useRef } from "react";
import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
  addDoc,
  serverTimestamp,
  Timestamp,
  startAfter,
  getDocs,
} from "firebase/firestore";
import { database } from "../firebase";
import backgroundImage from "../assets/main_background.jpg";

interface ChatMessage {
  user: string;
  text: string;
  createdAt: Date;
  id: string;
}

const Chat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [user, setUser] = useState("");
  const [lastDoc, setLastDoc] = useState<any>(null);
  const [hasMore, setHasMore] = useState(true);
  const MESSAGES_PER_PAGE = 20;
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Create a query to get the last 20 messages, ordered by timestamp
    const q = query(
      collection(database, "chats"),
      orderBy("createdAt", "desc"),
      limit(MESSAGES_PER_PAGE)
    );

    // Subscribe to real-time updates
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newMessages: ChatMessage[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        const timestamp = data.createdAt as Timestamp;
        newMessages.push({
          id: doc.id,
          text: data.text,
          createdAt: timestamp?.toDate() || new Date(),
          user: data.user || "Anonymous",
        });
      });
      // Reverse the array to show newest messages at the bottom
      setMessages(newMessages.reverse());
      setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
      setHasMore(snapshot.docs.length === MESSAGES_PER_PAGE);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const loadMoreMessages = async () => {
    if (!lastDoc || !hasMore) return;

    try {
      const q = query(
        collection(database, "chats"),
        orderBy("createdAt", "desc"),
        startAfter(lastDoc),
        limit(MESSAGES_PER_PAGE)
      );

      const snapshot = await getDocs(q);
      const newMessages: ChatMessage[] = [];

      snapshot.forEach((doc) => {
        const data = doc.data();
        const timestamp = data.createdAt as Timestamp;
        newMessages.push({
          id: doc.id,
          text: data.text,
          createdAt: timestamp?.toDate() || new Date(),
          user: data.user || "Anonymous",
        });
      });

      setMessages((prev) => [...newMessages.reverse(), ...prev]);
      setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
      setHasMore(snapshot.docs.length === MESSAGES_PER_PAGE);
    } catch (error) {
      console.error("Error loading more messages:", error);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user.trim()) return;

    try {
      await addDoc(collection(database, "chats"), {
        text: newMessage,
        createdAt: serverTimestamp(),
        user: user,
      });
      setNewMessage("");
      setUser("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div
      className="w-screen h-screen flex items-center justify-center bg-center bg-cover"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="w-full tablet:max-w-[900px] h-full tablet:py-28 flex">
        <div className="flex flex-col tablet:h-full h-[90%] bg-gray-100 rounded-lg w-full self-end">
          <div className="flex-1 overflow-y-auto p-4">
            {hasMore && (
              <button
                onClick={loadMoreMessages}
                className="w-full py-2 mb-4 text-sm text-gray-600 hover:text-gray-800 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
              >
                이전 메시지 더보기
              </button>
            )}
            <div className="space-y-4">
              {messages.length > 0 ? (
                messages.map((message) => (
                  <div
                    key={message.id}
                    className="bg-white rounded-lg p-4 shadow"
                    style={{ maxWidth: "90%" }}
                  >
                    <div className="text-sm text-gray-500 mb-1">
                      {message.user} • {message.createdAt.toLocaleTimeString()}
                    </div>
                    <div className="text-gray-800">{message.text}</div>
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-center py-10">
                  Chat이 없습니다.
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>
          <form onSubmit={handleSendMessage} className="p-4 border-t bg-white">
            <input
              type="text"
              value={user}
              className="border-1 rounded-md mb-2 pl-2"
              onChange={(e) => setUser(e.target.value)}
              placeholder="이름을 입력하세요"
              required
            />
            <div className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="메시지를 입력하세요..."
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                전송
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
