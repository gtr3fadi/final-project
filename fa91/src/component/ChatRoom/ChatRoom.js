import Avatar from "../Avatar";
import { useAuthContext } from "../hook/useAuthContext";
import { projectFirestore } from "../../firebase/firebase";
import { useEffect, useState } from "react";

const ChatRoom = ({ doc, setShowMsgRoom }) => {
  const { user } = useAuthContext();

  const userId1 = user.uid;
  const userId2 = doc.id;
  const roomId =
    userId1 < userId2 ? `${userId1}-${userId2}` : `${userId2}-${userId1}`;

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const userSend = {
    backgroundColor: "#f5f5f5",
    padding: "2px 10px",
    borderTopLeftRadius: "50px",
    borderTopRightRadius: "10px",
    borderBottomLeftRadius: "50px",
    borderBottomRightRadius: "50px",
  };
  const userReceive = {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    padding: "2px 10px",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "50px",
    borderBottomLeftRadius: "50px",
    borderBottomRightRadius: "50px",
  };

  useEffect(() => {
    const unsubscribe = projectFirestore
      .collection("messages")
      .doc(roomId)
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()));
        console.log(snapshot.docs.map((doc) => doc.data()));
      });

    return () => unsubscribe();
  }, [roomId]);

  const sendMessage = (e) => {
    e.preventDefault();
    setLoading(true);
    projectFirestore
      .collection("messages")
      .doc(roomId)
      .collection("messages")
      .add({
        message,
        timestamp: new Date(),
        user: user.displayName,
        userId: user.uid,
      })
      .then(() => {
        setMessage("");
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  console.log(roomId);

  return (
    <div
      style={{
        backgroundColor: "rgba(0,0,0,0.8)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "scroll",
        zIndex: "9999",
        position: "fixed",
        top: "0",
        left: "0",
        bottom: "0",
        right: "0",
        width: "100vw",
        height: "100vh",
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          maxHeight: "600px",
          width: "100%",
          backgroundColor: "white",
          borderRadius: "15px",
          padding: "20px",
          margin: "auto",
          position: "relative",
          zIndex: "9999",
          top: "0",
          left: "0",
          bottom: "0",
          right: "0",
        }}
        className="container bg-gradient-primary bg-info p-1"
      >
        <div className="row">
          {/* user informaion here */}
          <div className="col-md-12 p-1 d-flex justify-content-center align-items-center">
            <Avatar uid={doc.id} />
            <h3 className="text-capitalize ms-1 m-0 text-white">
              {doc.displayName}
            </h3>
            <div className="d-flex justify-content-end align-items-center">
              <button
                className="btn btn-sm btn-outline-light"
                onClick={() => setShowMsgRoom(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
          </div>

          {/* message box */}
          <div
            style={{
              height: "400px",
              width: "600px",
              overflowY: "scroll",
              padding: "10px",
              backgroundColor: "white",
              margin: "auto",
            }}
            className="col-md-12 p-1 pt-3"
          >
            {messages.map((message) => (
              <div
                style={message.userId === user.uid ? userSend : userReceive}
                className={`d-flex align-items-center mb-2  ${
                  message.userId === user.uid
                    ? "text-light bg-primary justify-content-end ms-5 "
                    : "text-dark  d-flex justify-content-start me-5"
                }`}
              >
                <p className=" m-1 px-3">{message.message}</p>
              </div>
            ))}
          </div>

          {/* form input message */}
          <div className="col-12 p-3">
            <form onSubmit={sendMessage}>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Type your message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-primary"
                    type="submit"
                    disabled={loading}
                  >
                    Send
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
