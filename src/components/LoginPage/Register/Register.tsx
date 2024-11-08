import { useEffect, useState } from 'react';
import './register.css'
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../lib/firebase";
import { arrayUnion, doc, getDoc, query, setDoc, updateDoc, where } from "firebase/firestore";
import { motion } from 'framer-motion';

const Register = (props: any) => {
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [passwordCorrect, setPasswordCorrect] = useState(false);
    const [passwordRepeatCorrect, setPasswordRepeatCorrect] = useState(true);
    const [emailCorrect, setEmailCorrect] = useState(true);
    const [nickCorrect, setNickCorrect] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (password.length == 0) {
            setPasswordCorrect(false);
            return document.querySelector('#password-reg')?.classList.remove('incorrect');
        }
        if (!/[A-Z]/.test(password) ||
            !/[0-9]/.test(password) ||
            !/[^a-zA-Z0-9]/.test(password) || 
            (password.length < 6) ||
            (password.length > 15)) {
            document.querySelector('#password-reg')?.classList.add('incorrect');
            setPasswordCorrect(false);
        }
        else {
            document.querySelector('#password-reg')?.classList.remove('incorrect');
            setPasswordCorrect(true);
        }
    }, [password])

    const handlePasswordRequirementsFocus = () => {
        const requirements = document.querySelector(".password-requirements");

        requirements?.classList.remove('disabled');
    }

    const handlePasswordRequirementsBlur = () => {
        const requirements = document.querySelector(".password-requirements");

        requirements?.classList.add('disabled');
        handlePasswordRepeat();
    }

    const handlePasswordRepeat = () => {
        if (password !== passwordRepeat) {
            setPasswordRepeatCorrect(false);
        } 
        else {
            setPasswordRepeatCorrect(true);
        }
    }

    const handleError = (e: string) => {
        if (e == "nick") {
            setNickCorrect(false);
        }
        else {
            setEmailCorrect(false);
        }
        setTimeout(() => {
            setNickCorrect(true);
            setEmailCorrect(true);
        }, 5000);
    }

    const handleSubmit = async(e: any) => {
        e.preventDefault();

        if (passwordCorrect && passwordRepeatCorrect) {
            const formData = new FormData(e.target);
            const {nick, emailReg} = Object.fromEntries(formData);

            try {
                const nicksRef = doc(db, "lists", "nicks");
                const nicksSnap = await getDoc(nicksRef);
                const nickList = Array<any>(nicksSnap.data());
                if (nickList[0]["nicks"].includes(String(nick))) {
                    handleError("nick");
                    return toast.warning("Nick jest już zajęty.");
                }
            } catch (err) {
                return console.log(err);
            }
            setLoading(true);
            try {
                const res = await createUserWithEmailAndPassword(auth, String(emailReg), password);

                await setDoc(doc(db, "users", res.user.uid), {
                    nick,
                    email: emailReg,
                    id: res.user.uid
                })

                await updateDoc(doc(db, "lists", "nicks"), {
                    nicks: arrayUnion(nick)
                })

                toast.success("Pomyślnie utworzono nowe konto!");
            }
            catch(err: any) {
                if (err.code == "auth/email-already-in-use") {
                    handleError("email");
                    return toast.warning("Podany email jest już w użyciu.");
                }
                toast.warning("Coś poszło nie tak przy tworzeniu konta...");
                console.log(err);
            }
            finally {
                setLoading(false);
            }
        }
        else {
            toast.warning("Nie spełniono wymagań rejestracji.");
        }

    }

    return (
        <div className='register'>
            <h1>Rejestracja</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="nick">Nazwa użytkownika</label>
                <input type="text" name="nick" id="nick" className={nickCorrect ? '' : 'incorrect'} />
                {!nickCorrect && <div className="incorrect-text"><p>Nick jest już zajęty</p></div>}
                <label htmlFor="emailReg">E-mail</label>
                <input type="email" name="emailReg" id="emailReg" className={emailCorrect ? '' : 'incorrect'} />
                {!emailCorrect && <div className="incorrect-text"><p>E-mail jest już zajęty</p></div>}
                <label htmlFor="password-reg">Hasło</label>
                <input 
                    type={showPassword ? "text" : "password"} 
                    name="password-reg" 
                    id="password-reg" 
                    onFocus={handlePasswordRequirementsFocus} 
                    onBlur={handlePasswordRequirementsBlur} 
                    value={password} 
                    onChange={(e) => {setPassword(e.target.value)}}/>
                <ul className="password-requirements disabled">
                    <li className={'password-requirement ' + (password.length >= 6 ? 'correct' : 'incorrect')}>Minimum 6 znaków</li>
                    <li className={'password-requirement ' + (password.length <= 15 ? 'correct' : 'incorrect')}>Maksimum 15 znaków</li>
                    <li className={'password-requirement ' + (/[A-Z]/.test(password) ? 'correct' : 'incorrect')}>Co najmniej jedna duża litera</li>
                    <li className={'password-requirement ' + (/[0-9]/.test(password) ? 'correct' : 'incorrect')}>Co najmniej jedna cyfra</li>
                    <li className={'password-requirement ' + (/[^a-zA-Z0-9]/.test(password) ? 'correct' : 'incorrect')}>Co najmniej jeden znak specjalny</li>
                </ul>
                <div className="showPassword">
                    <label htmlFor="showPassword-reg">Pokaż hasło</label>
                    <input type="checkbox" name="showPassword-reg" id="showPassword-reg" checked={showPassword} onChange={(e) => {setShowPassword(e.target.checked)}}/>
                </div>
                <label htmlFor="passwordRepeat">Powtórz hasło</label>
                <input 
                    type={showPassword ? "text" : "password"} 
                    name="passwordRepeat" 
                    id="passwordRepeat" 
                    value={passwordRepeat}
                    onChange={(e) => {setPasswordRepeat(e.target.value)}}
                    onBlur={handlePasswordRepeat}
                    className={passwordRepeatCorrect ? '' : 'incorrect'}/>
                {!passwordRepeatCorrect && <div className="incorrect-text">
                    <p>Hasła nie są takie same</p>
                </div>}
                <motion.button 
                id="btn-register"
                disabled={loading}
                whileTap={{
                    scale: 1.05,
                }}>
                {loading ? <p>Wczytywanie</p> : <p>Rejestracja</p>}
                </motion.button>
            </form>
            <p>Masz już konto? <br /><a href='#' onClick={props.changeToLogin}>Zaloguj się</a></p>
        </div>
    )
}

export default Register