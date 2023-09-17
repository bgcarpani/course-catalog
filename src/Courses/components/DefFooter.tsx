import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { Box } from "@mui/material";

export default function DefFooter() {
  return (
    <Box
      sx={{
        backgroundColor: "lightgray"
      }}
      component="footer"
    >
      <Container maxWidth="sm">
        <Typography variant="body2" color="text.secondary" align="center" >
            {"courses catalog - .net API - react.js - typescript  - "}
          <Link color="inherit" href="https://www.linkedin.com/in/bgcarpani/" target="_blank">
            bgcarpani
          </Link>{" "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
      </Container>
    </Box>
  );
}