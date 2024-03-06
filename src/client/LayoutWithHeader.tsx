import { ReactNode } from "react";
import { Header } from "./components/Header";
import Box from "@mui/material/Box";

export default function LayoutWithHeader({ children }: {
  children: ReactNode
}) {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>      
        <Header/>
        { children }
      </Box>
    </>
  )
}