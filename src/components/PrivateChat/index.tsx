import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { firestore, auth } from "../../firebase";

interface PrivateChatProps {
  otherUserId: string | null;
}

interface Message {
  id: string;
  text: string;
  senderId: string;
  createdAt: any;
}

const PrivateChat: React.FC<PrivateChatProps> = ({ otherUserId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");

  const userId = auth.currentUser?.uid;

  useEffect(() => {
    if (!userId || !otherUserId) return;

    const conversationId = [userId, otherUserId].sort().join("_");

    const q = query(
      collection(firestore, "conversations", conversationId, "messages"),
      orderBy("createdAt")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs: Message[] = snapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as Message)
      );
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, [userId, otherUserId]);

  const sendMessage = async () => {
    if (!newMessage.trim() || !userId) return;

    const conversationId = [userId, otherUserId].sort().join("_");

    await addDoc(
      collection(firestore, "conversations", conversationId, "messages"),
      {
        text: newMessage,
        senderId: userId,
        createdAt: new Date(),
      }
    );

    setNewMessage("");
  };

  // Debugging
  console.log("User ID:", userId);
  console.log("Messages:", messages);

  return (
    <div className="w-96 mx-auto p-4 bg-gray-200 rounded-lg">
      <div className="chat-container mb-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`chat-message mb-2 p-2 rounded-lg ${
              msg.senderId === userId
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-black"
            }`}
            style={{
              alignSelf: msg.senderId === userId ? "flex-end" : "flex-start",
              maxWidth: "70%",
            }}
          >
            <strong>{msg.senderId === userId ? "You" : "Other"}:</strong>{" "}
            {msg.text}
          </div>
        ))}
      </div>
      <div className="flex space-x-2">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="input input-bordered w-full max-w-xs bg-white rounded-lg p-2"
        />
        <button
          onClick={sendMessage}
          className="btn bg-blue-500 text-white px-4 rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default PrivateChat;
