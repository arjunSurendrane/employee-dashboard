function connectToLocalhost(app, port) {
  app.listen(port, () => {
    console.log(`connected to localhost ${port}`);
  });
}

export default connectToLocalhost;
