import { useEffect, useState } from "react";
import { getDateFromWorker } from "./worker.client";

export function WebWorkerSaysHello() {
  let [dateString, setDateString] = useState("");

  useEffect(() => {
    getDateFromWorker(function (data: string) {
      setDateString(data);
    });
  });

  return (
    <section>
      <h3 className="uppercase">Web Worker says hello</h3>
      <p>
        The following paragraph is populated by data coming from a Web Worker.
      </p>
      <p>Hello. The date is {dateString}.</p>
    </section>
  );
}
