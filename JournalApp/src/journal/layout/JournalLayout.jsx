import { Toolbar } from "@mui/material";
import { Box } from "@mui/system"
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";


let drawerWidth = 240;

const JournalLayout = ({ children }) => {
    return (
        <>
            <Box className="animate__animated animate__fadeIn animate__faster" sx={{ display: 'flex' }}>

                <NavBar drawerWidth={drawerWidth}></NavBar>


                <SideBar drawerWidth={drawerWidth}></SideBar>

                <Box component='main' sx={{ flexGrow: 1, p: 3 }}>

                    <Toolbar></Toolbar>

                    {children}


                </Box>


            </Box>



        </>


    )
}

export default JournalLayout