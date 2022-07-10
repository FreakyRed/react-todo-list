import { useState } from "react";
import { IconButton } from "@mui/material";
import { Menu, MenuItem } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";

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
          All
        </MenuItem>
        <MenuItem onClick={handleClose} data-value={"ACTIVE"}>
          Active
        </MenuItem>
        <MenuItem onClick={handleClose} data-value={"FINISHED"}>
          Finished
        </MenuItem>
      </Menu>
    </>
  );
};

export default ItemFilter;
