import { Box, List, ListItem, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { theme } from "styles/theme";

const useStyles = makeStyles((theme: Theme): { item: any; link: any } => ({
  item: {
    padding: 0,
    "&:not(:last-child)": {
      marginRight: 40,
    },
  },
  link: {
    ...theme.typography.body1,
    "&.active": {
      color: "#000",
    },
  },
}));

function NavMenu() {
  const navElements = [
    {
      path: "/",
      name: "header.home",
    },
    {
      path: "/news",
      name: "header.news",
    },
    {
      path: "/profile",
      name: "header.profile",
    },
  ];

  const { t } = useTranslation("translation");
  const classes = useStyles(theme);

  return (
    <Box component="nav" sx={{ mr: "auto" }}>
      <List component="ul" sx={{ display: "flex" }}>
        {navElements.map(({ path, name }) => {
          return (
            <ListItem className={classes.item}>
              <NavLink className={classes.link} to={path}>
                {t(name)}
              </NavLink>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}

export default NavMenu;
