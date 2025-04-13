import React, { useState } from "react";
import styles from './AnimalMemoryGame.module.css';

const animalPool = ["🐶", "🐱", "🦁", "🐯", "🐮", "🐰", "🐸", "🦊", "🐷", "🐵"];

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const generateCards = (totalCards) => {
  let cards = [];
  let usedAnimals = [];

  while (cards.length < totalCards) {
    const availableAnimals = animalPool.filter(a => !usedAnimals.includes(a));
    const animal = availableAnimals[Math.floor(Math.random() * availableAnimals.length)];

    const maxAllowed = totalCards - cards.length;
    const count = Math.min(getRandomInt(1, 3), maxAllowed);

    for (let i = 0; i < count; i++) {
      cards.push({ animal, id: Math.random(), selected: false, checked: false, isCorrect: false });
    }

    usedAnimals.push(animal);
  }

  return cards.sort(() => 0.5 - Math.random());
};

const AnimalMemoryGame = () => {
  const [cards, setCards] = useState([]);
  const [difficulty, setDifficulty] = useState(null);
  const [isHidden, setIsHidden] = useState(false);
  const [targetAnimal, setTargetAnimal] = useState("");
  const [result, setResult] = useState(null);
  const [isChecking, setIsChecking] = useState(false);

  const selectDifficulty = (count) => {
    const newCards = generateCards(count);
    setCards(newCards);
    setDifficulty(count);
    setIsHidden(false);
    setResult(null);
    setTargetAnimal("");
    setIsChecking(false);
  };

  const startGame = () => {
    const uniqueAnimals = [...new Set(cards.map((c) => c.animal))];
    const randomTarget = uniqueAnimals[Math.floor(Math.random() * uniqueAnimals.length)];
    setTargetAnimal(randomTarget);
    setIsHidden(true);
  };

  const toggleCard = (id) => {
    if (!isHidden || isChecking) return;
    setCards((prev) =>
      prev.map((card) =>
        card.id === id ? { ...card, selected: !card.selected } : card
      )
    );
  };

  const checkResult = () => {
    setIsChecking(true);
    const correct = cards.filter((c) => c.animal === targetAnimal).map((c) => c.id);
    const selected = cards.filter((c) => c.selected).map((c) => c.id);
    const isCorrect =
      correct.length === selected.length &&
      correct.every((id) => selected.includes(id));

    setCards(prev => prev.map(card => ({
      ...card,
      checked: true,
      isCorrect: card.selected && card.animal === targetAnimal
    })));

    setResult(isCorrect ? "✅ Всё верно!" : "❌ Есть ошибки.");
  };

  const resetGame = () => {
    setCards([]);
    setDifficulty(null);
    setIsHidden(false);
    setResult(null);
    setTargetAnimal("");
    setIsChecking(false);
  };

  const startNewRound = () => {
    const newCards = generateCards(difficulty);
    setCards(newCards);
    setIsHidden(false);
    setResult(null);
    setTargetAnimal("");
    setIsChecking(false);
  };

  const hasSelectedCards = cards.some(card => card.selected);

  return (
    <div className={styles.gameContainer}>
      <h2 className={styles.title}>🎮 Игра: Найди животных</h2>

      {!difficulty && (
        <div className={styles.difficultyButtons}>
          <button className={styles.difficultyButton} onClick={() => selectDifficulty(6)}>Лёгкий (6 карт)</button>
          <button className={styles.difficultyButton} onClick={() => selectDifficulty(10)}>Средний (10 карт)</button>
          <button className={styles.difficultyButton} onClick={() => selectDifficulty(20)}>Сложный (20 карт)</button>
        </div>
      )}

      {difficulty && (
        <>
          {isHidden && targetAnimal && <p className={styles.targetAnimal}>Найди карточки с: {targetAnimal}</p>}

          <div className={styles.cardsContainer}>
            {cards.map((card) => (
              <div
                key={card.id}
                onClick={() => toggleCard(card.id)}
                className={`${styles.card} ${card.selected ? styles.selected : ''} ${card.checked ? styles.checked : ''} ${card.checked && card.selected ? (card.isCorrect ? styles.correct : styles.incorrect) : ''}`}
              >
                {isHidden ? (card.checked ? card.animal : (card.selected ? "❓" : "")) : card.animal}
              </div>
            ))}
          </div>

          <div className={styles.controls}>
            {!isHidden ? (
              <button className={styles.controlButton} onClick={startGame}>Начать</button>
            ) : (
              <>
                <button 
                  className={styles.controlButton}
                  onClick={checkResult}
                  disabled={!hasSelectedCards || isChecking}
                >
                  Проверить
                </button>
                {isChecking && (
                  <button className={styles.controlButton} onClick={startNewRound}>
                    Начать заново
                  </button>
                )}
              </>
            )}
            <button className={styles.controlButton} onClick={resetGame}>
              Сбросить
            </button>
          </div>

          {result && <h3 className={styles.result}>{result}</h3>}
        </>
      )}
    </div>
  );
}

export default AnimalMemoryGame;
