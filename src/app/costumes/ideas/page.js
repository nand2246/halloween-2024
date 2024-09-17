"use client";
import { useState } from "react";
import { fetchIdea } from "./actions";

export default function Ideas() {
  let [idea, setIdea] = useState();

  async function handleNewIdea() {
    setIdea(fetchIdea());
  }

  return (
    idea !== "" && (
      <div className="flex h-full">
        <div className="flex-1 m-auto">
          <div className="text-center m-5 p-5 outline outline-black outline-4">
            {idea ? idea : "click button to see a random costume idea"}
          </div>
          <div className="text-center">
            <button onClick={handleNewIdea}>new idea</button>
          </div>
        </div>
      </div>
    )
  );
}
