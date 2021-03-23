import React from "react";
import Label from "./Label";

export default function Labels({ labels }) {
  return (
    <div>
      {labels.map((label, i) => (
        <Label key={i} label={label} />
      ))}
    </div>
  );
}
