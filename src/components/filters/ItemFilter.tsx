import { useState } from "react";
import { IconButton } from "@mui/material";
import { Menu, MenuItem } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import "../../i18n";
import { useTranslation } from "react-i18next";

const ItemFilter = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event) => {
    props.setFilter(event.currentTarget.dataset.value);
    setAnchorEl(null);
  };
  const { t } = useTranslation();

  return (
    <>
      <IconButton onClick={handleClick} color="secondary">
        <FilterListIcon></FilterListIcon>
      </IconButton>
      <Menu
        id="menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose} data-value={"ALL"}>
          {t("All")}
        </MenuItem>
        <MenuItem onClick={handleClose} data-value={"ACTIVE"}>
          {t("Active")}
        </MenuItem>
        <MenuItem onClick={handleClose} data-value={"FINISHED"}>
          {t("Finished")}
        </MenuItem>
      </Menu>
    </>
  );
};

export default ItemFilter;
