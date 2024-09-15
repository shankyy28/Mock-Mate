import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { darkTheme, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";


const Topbar = () => {
    return <div>Topbar</div>
    const theme = darkTheme();
    const colors = tokens();


    return (
        <Box display="flex" justifyContent="space-between" p={2}>
          {/* HEADING */}
          <Typography variant="h5" color={colors.primary[100]}>
            MockMate
          </Typography>
    
          {/* ICONS */}
          <Box display="flex">
            <IconButton>
              <SettingsOutlinedIcon />
            </IconButton>
            <IconButton>
              <PersonOutlinedIcon />
            </IconButton>
          </Box>
        </Box>
      );

};

export default Topbar;