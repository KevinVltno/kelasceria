"use client";
import type { ButtonHTMLAttributes } from "react";
import { efek } from "../lib/audio";

export function TombolBesar({ className = "", onClick, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button type="button" className={"big-button " + className} onClick={(event) => { efek("klik"); onClick?.(event); }} {...props}/>;
}
