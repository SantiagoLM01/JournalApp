import { TurnedInNot } from "@mui/icons-material"
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { useMemo } from "react"
import { useDispatch } from "react-redux"
import { setActiveNote } from "../../store/journal/journalSlice"

const SideBarItem = ({ note }) => {

    const dispatch = useDispatch()

    const newTitle = useMemo(() => {
        return note.title.length > 17 ? note.title.substring(0,17) + '...' : note.title;
    }, [note.title])

    const clickActiveNote = () => {
        dispatch(setActiveNote(note))
    }

    return (
        <>

            <ListItem onClick={clickActiveNote} disablePadding>

                <ListItemButton>

                    <ListItemIcon>
                        <TurnedInNot></TurnedInNot>
                    </ListItemIcon>

                    <Grid container><ListItemText primary={newTitle}></ListItemText>
                        <ListItemText secondary={note.body}></ListItemText></Grid>

                </ListItemButton>



            </ListItem>
        </>

    )
}

export default SideBarItem