import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isSaving: false,
    savedMessaged: '',
    notes: [],
    active: null
    /* active: {
        id: 'ABC',
        title: '',
        bodu: '',
        date: 12334,
        imageUrls: [],
    } */
}

export const journalSlice = createSlice({
    name: 'journal',
    initialState,
    reducers: {
        savingNewNote: (state, action) => {
            state.isSaving = true;
        },
        addNewEmptyNote: (state, action) => {
            state.notes.push(action.payload)
            state.isSaving = false;
        },
        setActiveNote: (state, action) => {
            state.active = action.payload
            state.savedMessaged = ''

        },
        setNotes: (state, action) => {
            state.notes = action.payload
        },
        setSaving: (state) => {
            state.isSaving = true
            state.savedMessaged = ''
        },
        updateNote: (state, action) => {
            state.isSaving = false;
            state.notes = state.notes.map(note => {
                if (note.id !== action.payload.id) return note
                return note = action.payload
            })
            state.savedMessaged = `${action.payload.title}, actualizada correctamente`
        },
        setPhotosToActiveNote: (state, action) => {
            state.active.imageUrls = [...state.active.imageUrls, ...action.payload];
            state.isSaving = false;
        },
        clearNotesLogout: (state) => {
            state.isSaving = false
            state.savedMessaged = '',
            state.notes = [],
            state.active = null

        },
        deleteNodeById: (state, action) => {
            state.isSaving = false
            state.savedMessaged = '',
            state.notes = state.notes.filter(note => note.id !== action.payload.id)
            state.active = null
        }
    }
})

// Action creators are generated for each case reducer function
export const { addNewEmptyNote, setActiveNote, setNotes, setSaving, updateNote, deleteNodeById, savingNewNote, setPhotosToActiveNote, clearNotesLogout } = journalSlice.actions