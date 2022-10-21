import { async } from "@firebase/util"
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite"
import { FirebaseDB } from "../../firebase/config"
import fileUpload from "../../helpers/fileUpload"
import { loadNotes } from "../../helpers/loadNotes"
import { addNewEmptyNote, deleteNodeById, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from "./journalSlice"

export const startNewNote = () => {
    return async (dispatch, getState) => {

        dispatch(savingNewNote())
        const { uid } = getState().auth

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
            imageUrls: []
        }

        const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`))
        const resp = await setDoc(newDoc, newNote)

        newNote.id = newDoc.id

        dispatch(addNewEmptyNote(newNote))
        dispatch(setActiveNote(newNote))


        console.log({ newDoc, resp })
    }
}

export const startLoadingNotes = () => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth

        const notes = await loadNotes(uid)

        dispatch(setNotes(notes))
    }
}

export const startSavingNote = () => {
    return async (dispatch, getState) => {
        dispatch(setSaving())
        const { uid } = getState().auth
        const { active } = getState().journal
        const { id } = active
        const noteToFireStore = { ...active }

        delete noteToFireStore.id

        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${id}`);

        await setDoc(docRef, noteToFireStore, { merge: true })

        dispatch(updateNote(active))

    }
}

export const startUploadingFiles = (files = []) => {
    return async (dispatch, getState) => {
        dispatch(setSaving())
        
        const fileUploadPromises = [];

        for (const file of files) {
            fileUploadPromises.push(fileUpload(file))
        }
        const photoUrls = await Promise.all(fileUploadPromises)

        dispatch(setPhotosToActiveNote(photoUrls))

        console.log(photoUrls)

    }
}
export const startDeleteNote = () => {
    return async (dispatch, getState) => {
       
        const {uid} = getState().auth
        const {active} = getState().journal
        const {id} = active

        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${id}`);
        const resp = await deleteDoc(docRef)

        dispatch(deleteNodeById(active))


    }
}