import { createStore } from "solid-js/store";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

export default function useFfmpeg() {
  const [store, setStore] = createStore({
    videoURL: "",
  });

  const ffmpeg = createFFmpeg({
    progress: (e) => console.log(e.ratio),
  });

  const transcode = async (file: File) => {
    const { name } = file;
    await ffmpeg.load();
    ffmpeg.FS("writeFile", name, await fetchFile(file));
    await ffmpeg.run(
      "-i",
      name,
      "-ss",
      "00:00:02",
      "-to",
      "00:00:04",
      "output.mp3"
    );
    const data = ffmpeg.FS("readFile", "output.mp3");
    const url = URL.createObjectURL(new Blob([data.buffer]));

    setStore("videoURL", url);
  };

  const handleFileChange = (e: Event) => {
    const files = (e.target as HTMLInputElement).files;

    if (files?.length) {
      transcode(files[0]);
    }
  };
  return {
    store,
    handleFileChange,
  };
}
