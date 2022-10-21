import { Co2Sharp, TurnedInNot } from "@mui/icons-material"
import { Alert, Box, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material"
import { useEffect, useMemo } from "react"
import { useState } from "react"
import { useSelector } from "react-redux"
import SideBarItem from "./SideBarItem"

const SideBar = ({ drawerWidth }) => {

    const [collapseSide, setCollapseSide] = useState('block')

    const { displayName } = useSelector(state => state.auth)
    const { notes } = useSelector(state => state.journal)

    const collapseSideBar = () => {
        setCollapseSide('none')
        drawerWidth = 0
    }

    const areNotes = useMemo(() => notes.length !== 0, [notes.length])


    useEffect(() => {

        const menu = document.getElementsByTagName('svg')


        menu[0]?.addEventListener('click', () => {
            setCollapseSide('block')
        })
    }, [collapseSide])

    return (
        <>

            <Box className="sidebar" component='nav' sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }, display: `${collapseSide}` }}>

                <Drawer variant='permanent'
                    open
                    sx={{
                        display: { sx: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
                    }}
                >

                    <Toolbar className="dflex">

                        <Typography className="hola" variant="h6" noWrap component='div'>{displayName}</Typography>

                        <svg onClick={collapseSideBar} xmlns="http://www.w3.org/2000/svg" className="x-svg" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </Toolbar>
                    <Divider></Divider>

                    {areNotes ? <List>{notes.map(note => (
                        <SideBarItem key={note.id} note={note}></SideBarItem>
                    ))}

                    </List> : <Grid container direction="column" alignItems="center"
                        justifyContent="center"><Alert severity='info'>Aún no has agregado una Nota :(</Alert></Grid>}





                </Drawer>


            </Box>

        </>


    )
}

export default SideBar