import { useEffect, useState } from 'react';
import './traits.css';
import { useCharacterCreationStore } from '../../../../lib/characterCreationStore';

const Traits = () => {
    const [counter, setCounter] = useState(0);
    const [traits, setTraits] = useState<string[]>([]);

    const { storedTraits, setStoredTraits } = useCharacterCreationStore();

    useEffect(() => {
        const traitTitle = document.querySelectorAll(".traitTitle");
        console.log(traitTitle);
        let elementsActive = [1];
        console.log(storedTraits);
        console.log(elementsActive);
        setCounter(storedTraits.length);
        setTraits(storedTraits);
        storedTraits.forEach(trait => {
            traitTitle.forEach(traitTitle => {
                console.log(traitTitle.innerHTML);
                if (trait == traitTitle.innerHTML) {
                    console.log(traitTitle.parentElement);
                    traitTitle.parentElement?.parentElement?.classList.add('active');
                }
            });
        });
    }, []);

    useEffect(() => {
        setStoredTraits(traits);
    }, [traits]);

    const handleTrait = (e: any) => {
        let element = e.target;
        while (element.classList[0] != "traitOption") {
            console.log(element);
            element = element.parentNode;
        }
        if (element.classList.contains("active")) {
            element.classList.remove("active");
            setCounter(prev => prev - 1);
            console.log("Niżej", element.children[1].children[0].innerText);
            setTraits(prev => prev.filter(trait => trait != element.children[1].children[0].innerText));
        }
        else {
            if (counter == 3) {
                return;
            }
            element.classList.add("active");
            setCounter(prev => prev + 1);
            traits.push(element.children[1].children[0].innerText);
        }
        console.log(element);
        console.log(traits);
        e.target.checked = true;
    }

    return (
        <div className='traits'>
            <p>Cechy</p>
            <span>Wybrano {counter} z 3</span>
            <div className="traitsContainer">
                <div className="traitOption" onClick={handleTrait}>
                    <div className="traitLogo">
                        <img src="public\static\Images\Icons\Traits\handshake.png" alt="Lojalny" />
                    </div>
                    <div className="traitTexts">
                        <p className='traitTitle'>LOJALNY</p>
                        <p className='traitDescription'>+4 charyzma</p>
                    </div>
                </div>
                <div className="traitOption" onClick={handleTrait}>
                    <div className="traitLogo">
                        <img src="public\static\Images\Icons\Traits\lantern.png" alt="Pomysłowy" />
                    </div>
                    <div className="traitTexts">
                        <p className='traitTitle'>POMYSŁOWY</p>
                        <p className='traitDescription'>+2 inteligencja +2 zarządzanie</p>
                    </div>
                </div>
                <div className="traitOption" onClick={handleTrait}>
                    <div className="traitLogo">
                        <img src="public\static\Images\Icons\Traits\tree.png" alt="Rodzinny" />
                    </div>
                    <div className="traitTexts">
                        <p className='traitTitle'>RODZINNY</p>
                        <p className='traitDescription'>większe szanse na wykrycie szpiegów</p>
                    </div>
                </div>
                <div className="traitOption" onClick={handleTrait}>
                    <div className="traitLogo">
                        <img src="public\static\Images\Icons\Traits\hourglass.png" alt="Zdyscyplinowany" />
                    </div>
                    <div className="traitTexts">
                        <p className='traitTitle'>ZDYSCYPLINOWANY</p>
                        <p className='traitDescription'>+4 wojskowość</p>
                    </div>
                </div>
                <div className="traitOption" onClick={handleTrait}>
                    <div className="traitLogo">
                        <img src="public\static\Images\Icons\Traits\fist.png" alt="Zdeterminowany" />
                    </div>
                    <div className="traitTexts">
                        <p className='traitTitle'>ZDETERMINOWANY</p>
                        <p className='traitDescription'>+2 charyzma +2 wojskowość</p>
                    </div>
                </div>
                <div className="traitOption" onClick={handleTrait}>
                    <div className="traitLogo">
                        <img src="public\static\Images\Icons\Traits\lute.png" alt="Bard" />
                    </div>
                    <div className="traitTexts">
                        <p className='traitTitle'>BARD</p>
                        <p className='traitDescription'>zwiększa zadowolenie obywateli w domenie</p>
                    </div>
                </div>
                <div className="traitOption" onClick={handleTrait}>
                    <div className="traitLogo">
                        <img src="public\static\Images\Icons\Traits\door.png" alt="Otwarty" />
                    </div>
                    <div className="traitTexts">
                        <p className='traitTitle'>OTWARTY</p>
                        <p className='traitDescription'>+4 inteligencja</p>
                    </div>
                </div>
                <div className="traitOption" onClick={handleTrait}>
                    <div className="traitLogo">
                        <img src="public\static\Images\Icons\Traits\knight.png" alt="Rycerski" />
                    </div>
                    <div className="traitTexts">
                        <p className='traitTitle'>RYCERSKI</p>
                        <p className='traitDescription'>-10% koszt utrzymania wojsk w domenie</p>
                    </div>
                </div>
                <div className="traitOption" onClick={handleTrait}>
                    <div className="traitLogo">
                        <img src="public\static\Images\Icons\Traits\money-bag.png" alt="Handlowiec" />
                    </div>
                    <div className="traitTexts">
                        <p className='traitTitle'>HANDLOWIEC</p>
                        <p className='traitDescription'>+1 dostępny szlak handlowy</p>
                    </div>
                </div>
                <div className="traitOption" onClick={handleTrait}>
                    <div className="traitLogo">
                        <img src="public\static\Images\Icons\Traits\search.png" alt="Dokładny" />
                    </div>
                    <div className="traitTexts">
                        <p className='traitTitle'>DOKŁADNY</p>
                        <p className='traitDescription'>+4 zarządzanie</p>
                    </div>
                </div>
                <div className="traitOption" onClick={handleTrait}>
                    <div className="traitLogo">
                        <img src="public\static\Images\Icons\Traits\bowl.png" alt="Asceta" />
                    </div>
                    <div className="traitTexts">
                        <p className='traitTitle'>ASCETA</p>
                        <p className='traitDescription'>-10% koszt utrzymania budynków świątynnych</p>
                    </div>
                </div>
                <div className="traitOption" onClick={handleTrait}>
                    <div className="traitLogo">
                        <img src="public\static\Images\Icons\Traits\candle.png" alt="Teolog" />
                    </div>
                    <div className="traitTexts">
                        <p className='traitTitle'>TEOLOG</p>
                        <p className='traitDescription'>+5 charyzmy podczas kandydowania na funkcje</p>
                    </div>
                </div>
                <div className="traitOption" onClick={handleTrait}>
                    <div className="traitLogo">
                        <img src="public\static\Images\Icons\Traits\parchment.png" alt="Sumienny" />
                    </div>
                    <div className="traitTexts">
                        <p className='traitTitle'>SUMIENNY</p>
                        <p className='traitDescription'>+2 charyzma +2 zarządzanie</p>
                    </div>
                </div>
                <div className="traitOption" onClick={handleTrait}>
                    <div className="traitLogo">
                        <img src="public\static\Images\Icons\Traits\owl.png" alt="Mądry" />
                    </div>
                    <div className="traitTexts">
                        <p className='traitTitle'>MĄDRY</p>
                        <p className='traitDescription'>-20% koszt utrzymania ratusza</p>
                    </div>
                </div>
                <div className="traitOption" onClick={handleTrait}>
                    <div className="traitLogo">
                        <img src="public\static\Images\Icons\Traits\treasure-map.png" alt="Podróżnik" />
                    </div>
                    <div className="traitTexts">
                        <p className='traitTitle'>PODRÓŻNIK</p>
                        <p className='traitDescription'>bonus do szybkości, bonus do szybkości wojsk</p>
                    </div>
                </div>
                <div className="traitOption" onClick={handleTrait}>
                    <div className="traitLogo">
                        <img src="public\static\Images\Icons\Traits\tool-box.png" alt="Zaradny" />
                    </div>
                    <div className="traitTexts">
                        <p className='traitTitle'>ZARADNY</p>
                        <p className='traitDescription'>+2 wojskowść +2 inteligencja</p>
                    </div>
                </div>
                <div className="traitOption" onClick={handleTrait}>
                    <div className="traitLogo">
                        <img src="public\static\Images\Icons\Traits\sword.png" alt="Waleczny" />
                    </div>
                    <div className="traitTexts">
                        <p className='traitTitle'>WALECZNY</p>
                        <p className='traitDescription'>większe szanse na przeżycie ataku z udziałem broni</p>
                    </div>
                </div>
                <div className="traitOption" onClick={handleTrait}>
                    <div className="traitLogo">
                        <img src="public\static\Images\Icons\Traits\lance.png" alt="Turniejowicz" />
                    </div>
                    <div className="traitTexts">
                        <p className='traitTitle'>TURNIEJOWICZ</p>
                        <p className='traitDescription'>+5 wojskowości podczas turniejów</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Traits;