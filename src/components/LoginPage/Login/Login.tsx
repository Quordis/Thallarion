import { toast } from 'react-toastify';
import './login.css'
import { getAuth, sendEmailVerification, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../lib/firebase";
import { aggregateQuerySnapshotEqual, doc, setDoc } from "firebase/firestore";
import { motion } from 'framer-motion'
import { useState } from 'react';
import { p } from 'framer-motion/client';

const Login = (props: any) => {
    const [loading, setLoading] = useState(false);

    const handleLogin = async(e: any) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const {emailLog, passwordLog} = Object.fromEntries(formData);

        if (emailLog && passwordLog) {
            setLoading(true);

            try {
                await signInWithEmailAndPassword(auth, String(emailLog), String(passwordLog))

                props.goToCreation();
                toast.success("Pomyślnie zalogowano");
                /*const authDoc: any = getAuth();
                if (authDoc.currentUser.emailVerified) {
                }
                else {
                    sendEmailVerification(authDoc.currentUser).then(() => {
                        toast.success("Wysłaliśmy email weryfikacyjny na podany adres.");
                    }).catch((err) => {
                        toast.warning("Coś poszło nie tak przy logowaniu...");
                        console.log(err);
                    });
                }*/
            } catch (err) {
                toast.warning("Coś poszło nie tak przy logowniu...");
                console.log(err);
            } finally {
                setLoading(false);
            }
        }
        else {
            toast.warning("Uzupełnij dane logowania");
        }
    }

    return (
        <div className='login'>
            <h1>Logowanie</h1>
            <form onSubmit={handleLogin}>
                <label htmlFor="emailLog">E-mail</label>
                <input type="email" name="emailLog" id="emailLog"/>
                <label htmlFor="passwordLog">Hasło</label>
                <input type="password" name="passwordLog" id="passwordLog" />
                <a href='#' id='forgotPassword'>Zapomniałeś hasła?</a>
                <motion.button
                 id="btn-login"
                 disabled={loading}
                 whileTap={{
                    scale: 1.05,
                 }}
                 >{loading ? <p>Wczytywanie</p> : <p>Zaloguj</p>}
                 </motion.button>
            </form>
            <p>Nie masz jeszcze konta? <br /><a href='#' onClick={props.changeToRegister}>Zarejestruj się</a></p>
        </div>
    )
}

export default Login