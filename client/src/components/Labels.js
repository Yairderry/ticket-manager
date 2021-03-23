import React from "react";
import Label from "./Label";

export default function Labels({ labels }) {
  return (
    <>{labels && labels.map((label, i) => <Label key={i} label={label} />)}</>
  );
}
