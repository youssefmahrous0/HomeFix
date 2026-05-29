import { useState } from "react";

export default function ChatBot() {

  const [isOpen, setIsOpen] = useState(false);

  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "أهلاً 👋 أنا Home Fix AI، إزاي أساعدك؟"
    }
  ]);

  const sendMessage = async () => {

    if (!message.trim()) return;

    const userMessage = {
      sender: "user",
      text: message
    };
    

    setMessages(prev => [...prev, userMessage]);

    const currentMessage = message;

    setMessage("");

    try {

      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: currentMessage,
          session_id: "user_1"
        })
      });

      const data = await res.json();
      console.log(data);

      setMessages(prev => [
        ...prev,
        {
          sender: "bot",
          text: data.reply
        }
      ]);

    } catch (err) {

      setMessages(prev => [
        ...prev,
        {
          sender: "bot",
          text: "حصل خطأ في الاتصال"
        }
      ]);

      console.error(err);
    }
  };
const isMobile = window.innerWidth < 640;
  return (
    <>
      {/* Floating Button */}

      <button
        onClick={() => setIsOpen(!isOpen)}
        style={styles.floatingButton}
      >
        💬
      </button>

      {/* Chat Window */}

      {isOpen && (

        <div
  style={{
    ...styles.chatContainer,
    width: isMobile ? "95%" : "360px",
    height: isMobile ? "75vh" : "520px",
    right: isMobile ? "2.5%" : "20px",
    bottom: isMobile ? "80px" : "100px"
  }}
>

          <div style={styles.header}>
            Home Fix AI 🏠
          </div>

          <div style={styles.chatBox}>

            {messages.map((msg, index) => (

              <div
                key={index}
                style={{
                  ...styles.message,
                  alignSelf:
                    msg.sender === "user"
                      ? "flex-end"
                      : "flex-start",

                  background:
                    msg.sender === "user"
                      ? "#16a34a"
                      : "#f3f4f6",

                  color:
                    msg.sender === "user"
                      ? "white"
                      : "black"
                }}
              >
                {msg.text}
              </div>

            ))}

          </div>

          <div style={styles.inputContainer}>

            <input
              type="text"
              placeholder="اكتب مشكلتك..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={styles.input}
            />

            <button
              onClick={sendMessage}
              style={styles.sendButton}
            >
              إرسال
            </button>

          </div>

        </div>

      )}
    </>
  );
}

const styles = {

  floatingButton: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    border: "none",
    background: "#16a34a",
    color: "white",
    fontSize: "24px",
    cursor: "pointer",
    zIndex: 9999,
    boxShadow: "0 4px 15px rgba(0,0,0,0.3)"
  },

  chatContainer: {
  position: "fixed",
  bottom: "90px",
  right: "20px",
  width: "360px",
  maxWidth: "95%",
  height: "520px",
  maxHeight: "80vh",
  background: "white",
  borderRadius: "20px",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  boxShadow: "0 8px 30px rgba(0,0,0,0.25)",
  zIndex: 9999
},

  header: {
    background: "#16a34a",
    color: "white",
    padding: "16px",
    fontWeight: "bold",
    textAlign: "center"
  },

  chatBox: {
    flex: 1,
    padding: "15px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    overflowY: "auto",
    background: "#fafafa"
  },

  message: {
    padding: "12px",
    borderRadius: "14px",
    maxWidth: "85%",
    wordBreak: "break-word",
    fontSize: "14px",
    lineHeight: "1.6"
  },

  inputContainer: {
    display: "flex",
    padding: "10px",
    borderTop: "1px solid #eee",
    gap: "10px"
  },

  input: {
    flex: 1,
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    outline: "none"
  },

  sendButton: {
    border: "none",
    background: "#16a34a",
    color: "white",
    padding: "12px 18px",
    borderRadius: "10px",
    cursor: "pointer"
  }
};