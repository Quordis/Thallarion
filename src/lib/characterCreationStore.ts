import { create } from 'zustand'

type Character = {
    storedAvatarFile: any,
    storedAvatarURL: string,
    storedName: string,
    storedSurname: string,
    storedSex: string,
    storedProfession: string,
    storedFaith: string,
    storedTraits: Array<string>,
    setStoredAvatarFile: (file: any) => void,
    setStoredAvatarURL: (URL: string) => void,
    setStoredName: (name: string) => void,
    setStoredSurname: (surname: string) => void,
    setStoredSex: (sex: string) => void,
    setStoredProfession: (profession: string) => void,
    setStoredFaith: (faith: string) => void,
    setStoredTraits: (traits: Array<string>) => void
}

export const useCharacterCreationStore = create<Character>((set: any) => ({
    storedAvatarFile: null,
    storedAvatarURL: '',
    storedName: '',
    storedSurname: '',
    storedSex: 'M',
    storedProfession: '',
    storedFaith: '',
    storedTraits: [],
    
    setStoredAvatarFile: (file) => set(() => ({ storedAvatarFile: file })),
    setStoredAvatarURL: (URL) => set(() => ({storedAvatarURL: URL})),
    setStoredName: (name) => set(() => ({ storedName: name })),
    setStoredSurname: (surname) => set(() => ({ storedSurname: surname })),
    setStoredSex: (sex) => set(() => ({storedSex: sex})),
    setStoredProfession: (profesison) => set(() => ({storedProfession: profesison})),
    setStoredFaith: (faith) => set(() => ({storedFaith: faith})),
    setStoredTraits: (traits) => set(() => ({storedTraits: traits}))
}))