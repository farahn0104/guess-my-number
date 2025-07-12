import React, { useState } from 'react';
import './ResponsiveNumberGuessingGame.css';
import { FaMoon, FaSun, FaSyncAlt, FaCode, FaUserTie } from 'react-icons/fa';

// Responsive Number Guessing Game
// Sabhi code me Hindi comments diye gaye hain samjhane ke liye
function ResponsiveNumberGuessingGame() {
  // Range ke liye state
  const [rangeFrom, setRangeFrom] = useState(1); // Range ka start
  const [rangeTo, setRangeTo] = useState(50);    // Range ka end
  // Target number (randomly generate hota hai)
  const [target, setTarget] = useState(() => getRandomNumber(1, 50));
  // User ka guess
  const [guess, setGuess] = useState('');
  // Kitni guesses ki user ne
  const [guessCount, setGuessCount] = useState(0);
  // Message show karne ke liye
  const [message, setMessage] = useState('');
  // Dark mode by default
  const [darkMode, setDarkMode] = useState(true);

  // Random number generate karne ka function
  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + parseInt(min);
  }

  // New target number generate karne par
  const handleNewTarget = () => {
    if (!rangeFrom || !rangeTo || parseInt(rangeFrom) >= parseInt(rangeTo)) {
      setMessage('Kripya sahi range dijiye!');
      return;
    }
    const newTarget = getRandomNumber(rangeFrom, rangeTo);
    setTarget(newTarget);
    setGuess('');
    setGuessCount(0);
    setMessage('Naya target number generate ho gaya!');
  };

  // Guess button par click par
  const handleGuess = () => {
    if (guess === '' || isNaN(guess)) {
      setMessage('Kripya ek number dijiye!');
      return;
    }
    const numGuess = parseInt(guess);
    setGuessCount(guessCount + 1);
    let mainMsg = '';
    let hintMsg = '';
    if (numGuess < target) {
      mainMsg = 'Your guess is too low!';
      hintMsg = `Aapne jo number diya hai ${numGuess} wo galat hai.`;
    } else if (numGuess > target) {
      mainMsg = 'Your guess is too high!';
      hintMsg = `Aapne jo number diya hai ${numGuess} wo galat hai.`;
    } else {
      mainMsg = `Congratulations! You guessed it in ${guessCount + 1} attempts.`;
      hintMsg = `Aapne jo number diya hai ${numGuess} wo bilkul sahi hai!`;
    }
    setMessage(`${mainMsg}\n${hintMsg}`);
  };

  // Light/Dark mode toggle
  const toggleMode = () => setDarkMode((prev) => !prev);

  // UI
  return (
    <div className={`rngg-outer ${darkMode ? 'dark' : 'light'}`}> {/* Fullscreen background, always centered */}
      <div className="rngg-center-wrap">
        <div className="rngg-box">
          <div className="rngg-header-row">
            <span className="rngg-logo"><FaCode style={{marginRight:4}}/>BroCoder</span>
            <button className="rngg-mode-btn" onClick={toggleMode} aria-label="Toggle mode">
              {darkMode ? <FaSun size={22} /> : <FaMoon size={22} />}
            </button>
          </div>
          <h2 className="rngg-title">Guess My Number</h2>
          <div className="rngg-range-row">
            {/* Range input fields */}
            <input
              type="number"
              min="1"
              max="999"
              value={rangeFrom}
              onChange={e => setRangeFrom(e.target.value)}
              className="rngg-range-input"
              aria-label="Range from"
            />
            <span className="rngg-range-sep">to</span>
            <input
              type="number"
              min="1"
              max="999"
              value={rangeTo}
              onChange={e => setRangeTo(e.target.value)}
              className="rngg-range-input"
              aria-label="Range to"
            />
            {/* New target button */}
            <button className="rngg-new-btn" onClick={handleNewTarget} title="Naya target number banaye">
              <FaSyncAlt />
            </button>
          </div>
          <div className="rngg-guess-row">
            {/* User guess input */}
            <input
              type="number"
              placeholder="Apna guess likhiye..."
              value={guess}
              onChange={e => setGuess(e.target.value)}
              className="rngg-guess-input"
              aria-label="Guess"
              onKeyDown={e => e.key === 'Enter' && handleGuess()}
            />
            {/* Guess button */}
            <button className="rngg-guess-btn" onClick={handleGuess}>Guess</button>
          </div>
          {/* Message area */}
          <div className="rngg-message">
            {message.split('\n').map((line, idx) => (
              <div key={idx}>{line}</div>
            ))}
          </div>
          {/* Instructions */}
          <ul className="rngg-instructions">
            <li>Range set kare aur <FaSyncAlt style={{verticalAlign:'middle'}} /> dabaye</li>
            <li>Apna guess likhe aur Guess dabaye</li>
            <li>App batayega ki guess sahi hai ya nahi</li>
            <li>Light/Dark mode icon se mode badle</li>
          </ul>
          {/* Author below instructions, centered */}
          <div className="rngg-author-below"><FaUserTie style={{marginRight:3}}/>Farhan Ansari</div>
        </div>
      </div>
    </div>
  );
}

export default ResponsiveNumberGuessingGame;
