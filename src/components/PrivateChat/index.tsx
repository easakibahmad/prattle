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
  otherUserId: string;
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
    if (!userId) return;

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

  return (
    <div>
      <div>
        {messages.map((msg) => (
          <div key={msg.id}>
            <strong>{msg.senderId === userId ? "You" : "Other"}:</strong>{" "}
            {msg.text}
          </div>
        ))}
      </div>
      <input
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default PrivateChat;
