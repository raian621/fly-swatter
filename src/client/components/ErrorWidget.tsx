import { Dispatch, SetStateAction, useState } from "react";
import './ErrorWidget.css'

export default function ErrorWidget({
  message,
  hidden,
  setHidden
}: {
  message: string;
  hidden: boolean;
  setHidden: Dispatch<SetStateAction<boolean>>
}) {
  return (
    <div className={`${hidden ? "hidden" : "error-widget"}`}>
      <span>{message}</span>
      <button onClick={() => setHidden(true)}>x</button>
    </div>
  );
}
