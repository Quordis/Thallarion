import { useEffect, useState } from 'react'
import './basicInfo.css'
import { toast } from 'react-toastify';
import { useCharacterCreationStore } from '../../../../lib/characterCreationStore'
import { motion } from 'framer-motion';

const BasicInfo = () => {
    const [avatar, setAvatar] = useState({
        "file": null,
        "URL": ""
    });
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [radioChecked, setRadioChecked] = useState('M');
    const [avatarHover, setAvatarHover] = useState(false);

    const {storedAvatarFile, setStoredAvatarFile, storedAvatarURL, setStoredAvatarURL, storedName, setStoredName, storedSurname, setStoredSurname, storedSex, setStoredSex} = useCharacterCreationStore();

    //Pobranie wartości z globalnego stanu jeżeli jakieś są
    useEffect(() => {
        setAvatar({
            "file": storedAvatarFile,
            "URL": storedAvatarURL
        })
        setName(storedName);
        setLastName(storedSurname);
        setRadioChecked(storedSex);
    }, []);

    const handleAvatar = (e: any) => {
        let newAvatar = e.target.files[0];
        if (/["image"]$/.test(newAvatar.type)) {
            const avatarURL = URL.createObjectURL(newAvatar);
            setAvatar({
                "file": newAvatar,
                "URL": avatarURL
            });
            setStoredAvatarFile(newAvatar);
            setStoredAvatarURL(avatarURL);
        }
        else {
            toast.warning("Nieprawidłowy format");
        }
    }

    const handleRadio = (e: any) => {  
        if (e.target.value == 'M') {
            setRadioChecked('M');
            setStoredSex('M');
        }
        else {
            setRadioChecked('F');
            setStoredSex('F');
        }  
    }

    return (
        <div className='basicInfo'>
            <p>Podstawowe Informacje</p>
            <form>
                <div className="avatarContainer">
                    <input type="file" name="avatarCreationInput" id="avatarCreationInput" style={{display: "none"}} onChange={handleAvatar} />
                    <label htmlFor="avatarCreationInput">
                        <div className="avatar" ><img src={avatar.URL == "" ? "public\\static\\Images\\Icons\\user.png" : avatar.URL} alt="Avatar" /></div>Wgraj avatar
                    </label>
                </div>
                <label htmlFor="firstName">Imię</label>
                <input 
                    type="text" 
                    name='firstName' 
                    id='fistName' 
                    value={name} 
                    onChange={(e) => {setName(e.target.value)}}
                    onBlur={() => {setStoredName(name)}} />
                <label htmlFor="secondName">Nazwa rodu</label>
                <input 
                    type="text" 
                    name='secondName' 
                    id='secondName' 
                    value={lastName} 
                    onChange={(e) => {setLastName(e.target.value)}}
                    onBlur={() => {setStoredSurname(lastName)}} />
                <span>Płeć</span>
                <div className="radioContainer">
                    <label htmlFor="radioMale" className='radioOption'>
                        <input type="radio" name='radioContainer' id='radioMale' value="M" onClick={handleRadio} />
                        <div className={"maleContainer " + (radioChecked == 'M' ? 'active' : '')}><img src="public\static\Images\Icons\male.png" alt="Male" /></div>
                    </label>
                    <label htmlFor="radioFemale" className='radioOption'>
                        <input type="radio" name='radioContainer' id='radioFemale' value="F" onClick={handleRadio} />
                        <div className={"femaleContainer " + (radioChecked == 'F' ? 'active' : '')}><img src="public\static\Images\Icons\femenine.png" alt="Female" /></div>
                    </label>
                </div>
            </form>
        </div>
    )
}

export default BasicInfo