module.exports = (io) => {
  io.on("connection", (socket) => {
    socket.on("session-updated", (session) => {
      socket.broadcast.emit("session-updated", session);
    });
    socket.on("session-deleted", (session) => {
      socket.broadcast.emit("session-deleted", session);
    });
    socket.on("disconnect", () => console.log("disconnected"));
  });
};
