import { ReactNode } from "react";
import { Header } from "./components/Header";

export default function LayoutWithHeader({ children }: {
  children: ReactNode
}) {
  return (
    <>
      <Header/>
      { children }
    </>
  )
}