"use client";

import ReactPlayer from "react-player";
import { useState } from "react";
import classes from "./page.module.scss";

export default function Page() {
  const [playing, setPlaying] = useState(false);
  return (
    <div className={classes.video__container}>
      <ReactPlayer
        url="https://www.youtube.com/watch?v=aCkI0tjzUbQ"
        playing={playing}
        onPause={() => {
          console.log("onPause");
          setPlaying(false);
        }}
        onPlay={() => {
          console.log("onPlay");
          setPlaying(true);
        }}
        controls
        width="100%"
        height="auto"
      />
      <div className={classes.watermark}>워터마크</div>
      <div className={classes.controls}>컨트롤</div>
    </div>
  );
}
