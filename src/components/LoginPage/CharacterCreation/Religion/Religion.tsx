import { useEffect, useState } from 'react';
import './religion.css'
import { useCharacterCreationStore } from '../../../../lib/characterCreationStore';

const Religion = () => {
    const [radioValue, setRadioValue] = useState('');

    const { storedFaith, setStoredFaith } = useCharacterCreationStore();

    //Pobranie wartości z globalnego stanu jeżeli jakieś są
    useEffect(() => {
        setRadioValue(storedFaith);
    }, []);

    const handleRadioValue = (e: any) => {
        setRadioValue(e.target.value);
        setStoredFaith(e.target.value);
    }
    
    return (
        <div className='religion'>
            <p>Wybór wiary</p>
            <form>
                <label htmlFor="choiceElementis" className={'religionLabel ' + (radioValue == "Elementis" ? 'active' : '')}>
                    <input type="radio" name="religionOption" id="choiceElementis" value="Elementis" onClick={handleRadioValue} />
                    <img src="public\static\Images\Creation\Elementis-removebg-preview.png" alt="Elementis" />
                    <div className="religionTitle">
                        <h2>Elementis</h2>
                        <h4>Panteon</h4>
                    </div>
                    <div className="text">
                        <p>Wiara w cztery równorzędne bogów żywiołów stanowi fundament ich religijnego życia.</p><br /> 
                        <p>Aqua, Terra, Ignis i Ventus są czczeni jako personifikacje wody, ziemi, ognia i powietrza. Ta wiara kładzie nacisk na równowagę i harmonię w naturze, a jej wyznawcy starają się żyć w zgodzie z każdym z żywiołów.</p><br /> 
                        <p>Aitheris jest uznawany za boską energię, lecz nie za boga. Kult Elementis jest w unii ekumenicznej z Kultem Aitheris.</p>
                    </div>
                </label>
                <label htmlFor="choiceMortave" className={'religionLabel ' + (radioValue == "Mortave" ? 'active' : '')}>
                    <input type="radio" name="religionOption" id="choiceMortave" value="Mortave" onClick={handleRadioValue} />
                    <img src="public\static\Images\Creation\Mortave-removebg-preview.png" alt="Mortave" />
                    <div className="religionTitle">
                        <h2>Mortave</h2>
                        <h4>Prawiara</h4>
                    </div>
                    <div className="text">
                        <p>Bóg Mortave jest uznawany za Władcę Królestwa Zmarłych - decyduje on o tym która dusza wstąpi do Zaświatów a która zostanie unicestwiona.</p><br />
                        <p>Aniołowie Życia - słudzy Mortave są postrzegani jako pośrednicy między światem żywych a umarłych, pomagając w przejściu dusz do wieczności oraz w zasiewaniu nowego życia.</p><br />
                        <p>Ta pradawna wiara jest silnie zakorzeniona w historii Królestwa, dziś przyciąga swoich wyznawców swoją głęboką duchowością i szacunkiem dla cyklu życia.</p>
                    </div>
                </label>
                <label htmlFor="choiceAitheris" className={'religionLabel ' + (radioValue == "Aitheris" ? 'active' : '')}>
                    <input type="radio" name="religionOption" id="choiceAitheris" value="Aitheris" onClick={handleRadioValue} />
                    <img src="public\static\Images\Creation\Aitheris-removebg-preview.png" alt="Aitheris" />
                    <div className="religionTitle">
                        <h2>Aitheris</h2>
                        <h4>Panteon</h4>
                    </div>
                    <div className="text">
                        <p>Wiara w pięciu bogów żywiołów. Bogowie Aqua, Terra, Ignis i Ventus są czczeni jako bogowie, ale to Aitheris jest traktowany jako bóg bogów, praojciec i architekt wszechświata.</p><br />
                        <p>Ta wiara podkreśla hierarchię boską i dąży do zrozumienia wszechświata, życia w harmonii w naturze. Kult Elementis jest w unii ekumenicznej z Kultem Aitheris.</p>
                    </div>
                </label>
            </form>
        </div>
    )
}

export default Religion