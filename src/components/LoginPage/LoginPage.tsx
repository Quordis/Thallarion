import './loginPage.css'
import Login from './Login/Login'
import Register from './Register/Register'
import CharacterCreation from './CharacterCreation/CharacterCreation'
import { useEffect, useState } from 'react'

const LoginPage = () => {
    const [creation, setCreation] = useState(false);

    useEffect(() => {
        if (creation == true) {
            document.querySelector('.formContainer')?.classList.add('creation');
        }
    }, [creation])

    const handleCurrentForm = (e: any) => {
        e.preventDefault();
        document.querySelector('.formContainer')?.classList.toggle('active');
    }

    const handleCharacterCreation = () => {
        setCreation(true);
    }

    return (
        <div className='loginPage'>
            <div className="loginPage-circle"></div>
            <div className="formContainer">
                {!creation && <Login changeToRegister={handleCurrentForm} goToCreation={handleCharacterCreation} />}
                {!creation && <Register changeToLogin={handleCurrentForm} />}
                {creation && <CharacterCreation />}
            </div>
        </div>
    )
}

export default LoginPage