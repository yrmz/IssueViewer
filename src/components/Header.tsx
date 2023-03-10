import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Header: React.FC = () => {
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar>
        <Toolbar>
          <Typography variant="h6" component="div">
            <Link style={{ textDecoration: "none", color: "#fff" }} to="/">
              Issue Viewer
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </React.Fragment>
  );
};

export default Header;

const StyledLink = styled.a`
  text-decoration: none;
`;
