import { useEffect, useState } from 'react'
import './profession.css'
import { useCharacterCreationStore } from '../../../../lib/characterCreationStore'
import kaplan from '\\static\\Images\\Creation\\kaplan.jpeg';
import zarzadca from '\\static\\Images\\Creation\\zarzadca.jpeg';
import dworzanin from '\\static\\Images\\Creation\\dworzanin.jpeg';
import rycerz from '\\static\\Images\\Creation\\rycerz.jpeg';
const Profession = () => {
    const [radioValue, setRadioValue] = useState('');

    const { storedProfession, setStoredProfession} = useCharacterCreationStore();

    //Pobranie wartości z globalnego stanu jeżeli jakieś są
    useEffect(() => {
        setRadioValue(storedProfession);
    }, []);

    const handleRadioValue = (e: any) => {
        setRadioValue(e.target.value);
        setStoredProfession(e.target.value);
    }

    return (
        <div className='profession'>
            <p>Wybór profesji</p>
            <form>
                <label htmlFor="priest" className={'professionLabel ' + (radioValue == "Kapłan" ? 'active' : '')}>
                    <input type="radio" name="profession" id="priest" value="Kapłan" onClick={handleRadioValue} />
                    <div className="professionImage priest" style={{backgroundImage: `linear-gradient(transparent, transparent,  rgba(0, 0, 0, 0.9) 80%), url(${kaplan})`}}>
                        <div className="text">
                        <p className="positive">+2</p><p> inteligencji</p><br />
                        <p>Możliwość uświęcania </p><p className="gold">artefaktów</p><br />
                        <p>Możliwość </p><p className="violet">nawracania</p><br />
                        <p>Możliwość kandydowania na </p><p className="blue">urzędy duchowe</p> <p>swojej wiary</p>
                        </div>
                    </div>
                    <div className="professionTitle priestTitle">Kapłan</div>
                </label>
                <label htmlFor="steward" className={'professionLabel ' + (radioValue == "Zarządca" ? 'active' : '')}>
                    <input type="radio" name="profession" id="steward" value="Zarządca" onClick={handleRadioValue} />
                    <div className="professionImage steward" style={{backgroundImage: `linear-gradient(transparent, transparent,  rgba(0, 0, 0, 0.9) 80%), url(${zarzadca})`}}>
                        <div className="text">
                        <p className="positive">+2</p><p> zarządzania</p><br />
                        <p className="positive">+5%</p> <p>przychodu z podatków</p><br />
                        <p>Posiada </p><p className="blue">przywilej handlowy</p> <p>w całej domenie</p><br />
                        <p>Koszt budowy targowiska niższy o </p><p className="positive">50%</p>
                        </div>
                    </div>
                    <div className="professionTitle stewardTitle">Zarządca</div>
                </label>
                <label htmlFor="courtier" className={'professionLabel ' + (radioValue == "Dworzanin" ? 'active' : '')}>
                    <input type="radio" name="profession" id="courtier" value="Dworzanin" onClick={handleRadioValue} />
                    <div className="professionImage courtier" style={{backgroundImage: `linear-gradient(transparent, transparent,  rgba(0, 0, 0, 0.9) 80%), url(${dworzanin})`}}>
                        <div className="text">
                        <p className="positive">+2</p><p> charyzmy</p><br />
                        <p className="positive">+10%</p><p> skuteczności intryg</p><br />
                        <p>Budowa, rozwój i utrzymanie rezydencji rodu w stolicy niższy o </p><p className="positive">25%</p><br />
                        <p>Koszt kandydowania do Rady Koronnej niższy o </p><p className="positive">50%</p>
                        </div>
                    </div>
                    <div className="professionTitle courtierTitle">Dworzanin</div>
                </label>
                <label htmlFor="knight" className={'professionLabel ' + (radioValue == "Rycerz" ? 'active' : '')}>
                    <input type="radio" name="profession" id="knight" value="Rycerz" onClick={handleRadioValue} />
                    <div className="professionImage knight" style={{backgroundImage: `linear-gradient(transparent, transparent,  rgba(0, 0, 0, 0.9) 80%), url(${rycerz})`}}>
                        <div className="text">
                        <p className="positive">+3</p><p> wojskowości</p><br />
                        <p className="positive">-5%</p><p> utrzymania wojska</p><br />
                        <p>Darmowy udział w </p><p className="red">turniejach</p><br />
                        <p>Koszt budowy koszar niższy o </p><p className="positive">50%</p>
                        </div>
                    </div>
                    <div className="professionTitle knightTitle">Rycerz</div>
                </label>
            </form>
        </div>
    )
}

export default Profession