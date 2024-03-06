import useTheme from "@mui/material/styles/useTheme";
import LayoutWithHeader from "../LayoutWithHeader";
import useAuthentication from "../hooks/useAuth";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box"


export default function Home() {
  useAuthentication();
  const { palette: { background }} = useTheme()

  return (
    <>
      <LayoutWithHeader>
        <Box sx={{
          bgcolor: background.paper,
          minHeight: "100vh",
          m: 0,
          width: "100vw"
        }}>
        </Box>
      </LayoutWithHeader>
    </>
  );
}
