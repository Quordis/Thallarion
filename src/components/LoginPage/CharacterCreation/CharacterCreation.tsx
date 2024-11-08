import './characterCreation.css'
import BasicInfo from './BasicInfo/BasicInfo'
import Profession from './Profession/Profession';
import Religion from './Religion/Religion';
import Traits from './Traits/Traits';
import { useState } from 'react'
import { toast } from 'react-toastify';
import { useCharacterCreationStore } from '../../../lib/characterCreationStore';

const CharacterCreation = () => {
    const [stage, setStage] = useState(1);

    let { storedAvatarFile, storedAvatarURL, storedName, storedSurname, storedSex, storedProfession, storedFaith, storedTraits } = useCharacterCreationStore();

    const handleStaging = () => {
        if (stage < 4) {
            setStage(prev => prev + 1);
        }
        else if (stage === 3) {
            toast.success("Etap czwarty tworzenia postaci");
        }
    }

    const handleSubmit = () => {
        console.log(`Dane avatara: ${storedAvatarFile}\n${storedAvatarURL}\nImię: ${storedName}\nNazwa rodu: ${storedSurname}\nPłeć: ${storedSex}\nProfesja: ${storedProfession}\nWiara: ${storedFaith}\nCechy: ${storedTraits}`);
    }

    return (
        <div className='characterCreation'>
            <h1>Tworzenie Postaci</h1>
            <div className="creationStage">
                <div className={"stageCircle " + (stage >= 1 ? (stage == 1 ? 'active' : 'finished') : "")}></div>
                <div className={"stageCircle " + (stage >= 2 ? (stage == 2 ? 'active' : 'finished') : "")}></div>
                <div className={"stageCircle " + (stage >= 3 ? (stage == 3 ? 'active' : "finished") : "")}></div>
                <div className={"stageCircle " + (stage == 4 ? 'active' : "")}></div>
            </div>
            {stage == 1 && <BasicInfo />}
            {stage == 2 && <Profession />}
            {stage == 3 && <Religion />}
            {stage == 4 && <Traits />}
            <div className="btns">
                {stage > 1 ? <button id='goBack-btn' onClick={() => {setStage(prev => prev - 1)}}>Wróć</button> : ""}
                <button id='goNext-btn' onClick={stage < 4 ? handleStaging : handleSubmit}>{stage == 4 ? "Zakończ" : "Dalej"}</button>
            </div>
        </div>
    )
}

export default CharacterCreation