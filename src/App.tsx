import type { Component } from "solid-js";
import useFfmpeg from "./hooks/useFfmpeg";

const App: Component = () => {
  const { handleFileChange, store } = useFfmpeg();
  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {store.videoURL && (
        <video
          src={store.videoURL}
          width="480px"
          height="320px"
          controls
          autoplay
          playsinline
        />
      )}
      {store.videoURL && <audio src={store.videoURL} controls autoplay />}
    </div>
  );
};

export default App;
