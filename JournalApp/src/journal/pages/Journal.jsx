import { AddOutlined, MailOutline } from "@mui/icons-material"
import { IconButton, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { startNewNote } from "../../store/journal/thunks"
import JournalLayout from "../layout/JournalLayout"
import NoteView from "../views/NoteView"
import NothingSelectedView from "../views/NothingSelectedView"

const Journal = () => {
    const { isSaving, active } = useSelector(state => state.journal)
    const dispatch = useDispatch()
    const onClickNewNote = () => {
        dispatch(startNewNote())
    }

    return (

        <>

            <JournalLayout>
                {/*   <Typography >Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime dolore quos earum quam ea consequatur possimus deserunt saepe beatae, eum perspiciatis atque quasi ipsum corrupti quis, laudantium aliquam enim eveniet.</Typography> */}
                {/*               <NothingSelectedView></NothingSelectedView>
 */}
                {!!active ? <NoteView></NoteView> : <NothingSelectedView></NothingSelectedView>
                }

                {/* NothinSelected */}

                <IconButton disabled={isSaving} onClick={onClickNewNote} size="large" sx={{
                    color: 'white', backgroundColor: 'error.main', ':hover': {
                        backgroundColor: 'error.main', opacity: 0.9
                    },
                    position: 'fixed',
                    right: 50,
                    bottom: 50
                }}><AddOutlined sx={{ fontSize: 30 }}></AddOutlined></IconButton>
            </JournalLayout>
        </>
    )
}

export default Journal