import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Drawer, Link as MuiLink, Box, Typography } from '@mui/material';
import { Timeline, Dashboard, AccountCircle } from '@mui/icons-material';
import MLVTLogo from '../../../assets/mlvt_logo.png';
import { useTheme } from '../../../theme';
import { Link as RouterLink, useLocation } from "react-router-dom";

interface NavLink {
  name: string;
  icon: React.ReactNode;
  link: string;
}

const navLinks: NavLink[] = [
  {
      name: "Dashboard",
      icon: <Timeline />,
      link: "/dashboard",
  },
  {
      name: "Manage Accounts",
      icon: <AccountCircle />,
      link: "/manage_accounts",
  }
];

const Sidebar: React.FC = () => {
  const theme = useTheme();
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const toggleDrawer = (open: boolean) => () => {
      setIsDrawerOpen(open);
  };

  return (
      <>
          {/* Permanent Sidebar for Larger Screens */}
          <Box
              sx={{
                  background: `linear-gradient(180deg, ${theme.background.sidebarDark} 0%, ${theme.background.sidebarDarkLight} 100%)`,
                  padding: 0,
                  paddingTop: 5,
                  display: { xs: "none", lg: "flex" }, // Hidden on small screens
                  flexDirection: "column",
                  alignItems: "center",
                  width: "6em",
              }}
          >
              <Box
                  sx={{
                      py: "1em",
                      display: "flex",
                      flexDirection: "column",
                      gap: 4,
                      justifyContent: "flex-start",
                      alignItems: "center",
                      width: "100%",
                      flexGrow: 1,
                  }}
              >
                  {/* MLVT Logo */}
                  <img
                      src={MLVTLogo}
                      alt="logo"
                      style={{
                          width: "4em",
                          height: "4em",
                          borderRadius: "10%",
                          cursor: "pointer",
                      }}
                      onClick={() => window.location.href = "/"}
                      role="button"
                  />

                  <Box
                      sx={{
                          display: "flex",
                          flexDirection: "column", 
                          gap: "1.5em", 
                          alignItems: "center",
                      }}
                  >
                      {navLinks.map((item) => (
                          <MuiLink
                              key={item.name}
                              component={RouterLink}
                              to={item.link}
                              underline="none" 
                              sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  borderRadius: "20%",
                                  width: "3em",
                                  height: "2.5em",
                                  textDecoration: "none", 
                                  "& svg": {
                                    color: "white",
                                    transition: "color 0.3s ease-in-out",
                                  },
                                  "&:hover svg": {
                                    color: "#cca432", // hover icon color
                                  },
                                  "&:hover": {
                                    backgroundColor: "transparent", // no hover bg
                                  },
                              }}
                          >
                              {/* Increase Icon Size */}
                              {React.cloneElement(item.icon as React.ReactElement, {
                                  sx: { fontSize: "1.5em", color: 'white' },
                              })}
                          </MuiLink>
                      ))}
                  </Box>

              </Box>
              {/* <Box>
                  <QuizOutlinedIcon
                      sx={{
                          color: theme.fontColor.black,
                          fontSize: "1.8em",
                      }}
                  />
              </Box> */}
          </Box>

          {/* Drawer for Smaller Screens */}
          <Drawer
              anchor="left"
              open={isDrawerOpen}
              onClose={toggleDrawer(false)}
              ModalProps={{
                  keepMounted: true,
              }}
              sx={{
                  "& .MuiDrawer-paper": { width: "15em", backgroundColor: theme.background.lightPink },
              }}
          >
              <Box
                  sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                      paddingTop: 2,
                  }}
              >
                  {/* Centered Logo */}
                  <Box
                      sx={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center", 
                          alignItems: "center", 
                          marginBottom: "1em",
                      }}
                  >
                      <img
                          src={MLVTLogo}
                          alt="logo"
                          style={{
                              width: "10em",
                              height: "10em",
                              borderRadius: "10%",
                          }}
                      />
                      <Typography sx={{
                          color: theme.background.main,
                          fontFamily: theme.typography.body1,
                          fontSize: "2.5em",
                          fontWeight: 900,
                      }}>MLVT</Typography>
                  </Box>

                  {/* Left-Aligned Menu Items */}
                  <Box
                      sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 1, 
                      }}
                  >
                      {navLinks.map((item) => (
                          <MuiLink
                              component={RouterLink}
                              key={item.name}
                              to={item.link}
                              style={{ textDecoration: "none", color: theme.palette.text.primary }}
                          >
                              <Box
                                  sx={{
                                      display: "flex",
                                      flexDirection: "row",
                                      alignItems: "center", 
                                      justifyContent: "flex-start",
                                      gap: 2.5,
                                      padding: "0.5em 2em",
                                      borderRadius: "8px",
                                      "&:hover": {
                                          backgroundColor: theme.background.lightPurple,
                                      },
                                  }}
                              >
                                  {item.icon}
                                  <Typography sx={{ fontWeight: "bold", fontFamily: theme.typography.body1, fontSize: "0.9em" }}>
                                      {item.name}
                                  </Typography>
                              </Box>
                          </MuiLink>
                      ))}
                  </Box>
              </Box>
          </Drawer>
      </>
  );
};

export default Sidebar;
