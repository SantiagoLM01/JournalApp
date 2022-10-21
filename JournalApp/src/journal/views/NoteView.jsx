import { DeleteOutline, Group, SaveAsOutlined, UploadOutlined } from "@mui/icons-material"
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { ImageGallery } from "../components/ImageGallery"
import { useForm } from "../../hooks/useForm"
import { useMemo } from "react"
import { useEffect } from "react"
import { setActiveNote } from "../../store/journal/journalSlice"
import { startDeleteNote, startSavingNote, startUploadingFiles } from "../../store/journal/thunks"
import Swal from 'sweetalert2'
import { useRef } from "react"

const NoteView = () => {

    const { active, isSaving } = useSelector(state => state.journal)
    const { savedMessaged } = useSelector(state => state.journal)
    const dispatch = useDispatch()
    const { title, body, imageUrls, onInputChange, formState, date } = useForm(active)

    const dateString = useMemo(() => {
        const newDate = new Date(date)
        return newDate.toUTCString()
    }, [date])


    useEffect(() => {
        dispatch(setActiveNote(formState))
    }, [formState])


    const onSaveNote = () => {
        dispatch(startSavingNote())

    }

    useEffect(() => {
        if (savedMessaged === '') return
        Swal.fire({
            position: 'top',
            icon: 'success',
            title: savedMessaged,
            showConfirmButton: false,
            timer: 1500
        })

    }, [savedMessaged])

    const onFileInputChange = ({ target }) => {
        if (target.files === 0) return

        dispatch(startUploadingFiles(target.files))
    }

    const fileInputRef = useRef()

    const onDelete = () => {
        dispatch(startDeleteNote())
    }

    return (

        <>

            <Grid container direction='row' justifyContent='space-between' alignItems='center' sx={{ mb: 1 }}>

                <Grid item fontSize={39} fontWeight='light'>

                    <Typography>{dateString}</Typography>

                </Grid>

                <Grid item fontSize={39} fontWeight='light'>

                    <input disabled={isSaving} ref={fileInputRef} style={{ display: 'none' }} type="file" multiple onChange={onFileInputChange} />

                    <IconButton onClick={() => fileInputRef.current.click()} color="primary" disabled={isSaving}><UploadOutlined></UploadOutlined></IconButton>

                    <Button disabled={isSaving} onClick={onSaveNote} color="primary" sx={{ padding: 2 }}><SaveAsOutlined sx={{ fontSize: 30, mr: 1 }}></SaveAsOutlined>Guardar</Button>
                </Grid>


                <Grid container>
                    <TextField name="title" onChange={onInputChange} value={title || ''} type='text' variant='filled' fullWidth
                        placeholder="Ingrese un Título" label='Título' sx={{ border: 'none', mb: 1 }}>


                    </TextField>

                    <TextField name="body" onChange={onInputChange} value={body || ''} type='text' variant='filled' fullWidth
                        placeholder="¿Qué sucedió en el día de hoy?" multiline minRows='5' sx={{ border: 'none', mb: 1 }}>


                    </TextField>


                </Grid>
                <Grid container justifyContent='end'><Button onClick={onDelete} sx={{ mt: 2 }} color='error'><DeleteOutline></DeleteOutline> Borrar Nota </Button></Grid>
                {/*                 Image Gallery
 */}
                <ImageGallery></ImageGallery>

            </Grid>

        </>

    )
}

export default NoteView