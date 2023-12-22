import React, {useState, useEffect} from 'react'
import quiz from './Quiz.module.css'
import {data as quizData} from './../../data'

const Quiz = () => {

    const [index, setIndex] = useState(0);
    const currentQuestion = quizData[index];
    const [lock, setLock] = useState(false)
    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [selectedAnswer, setSelectedAnswer] = useState(null)
    const [attemptedNext, setAttemptedNext] = useState(false);
    const [gotCorrect, setGotCorrect] = useState(0)
    // const [showElement, setShowElement] = useState(false)
    const [quizComplete, setQuizComplete] = useState(false)

    const isNextDisabled = selectedAnswer === null && attemptedNext;

    // useEffect (() => {
    //     if(isNextDisabled) {
    //         const newElement = document.createElement('a')
    //         newElement.textContent = 'https://www.youtube.com/watch?v=M07gTpFj8-Q&ab_channel=SilentWind'
    //         document.body.appendChild(newElement)
    //     }
    // }, [showElement])

    const youScored = () => {
        if (selectedAnswer === currentQuestion.answer) {
            setGotCorrect(prevCorrect => prevCorrect + 1)
        }
    }

    useEffect(() => {
        setSelectedAnswer(null);
    }, [index])

    const handleNext = () => {
        if (selectedAnswer !== null) {
        setIndex((prevIndex) => {
           const newIndex = prevIndex + 1;

        if(newIndex === quizData.length) {
            setButtonDisabled(true)
            setQuizComplete(true)
        };
        return newIndex;
    });
        setLock(false);
        setSelectedAnswer(null)
        setAttemptedNext(false)
        youScored()
        } else  {
            setAttemptedNext(true)
        }
    }

    const checkAnswer = (event, answer) => {
        if (!lock) {
            setLock(true);
            setSelectedAnswer(answer)
            handleAnswer(event, answer)
        }
    }

    const handleAnswer = (event, answer) => {
        if(currentQuestion && event.target) {
            if (currentQuestion.answer===answer) {
                event.target.classList.add(quiz.correct);
                youScored()
            } else {
                event.target.classList.add(quiz.wrong);
            }
        }
    }

    const handleTreatButtonClick = () => {
        window.location.href = 'https://www.youtube.com/watch?v=M07gTpFj8-Q&ab_channel=SilentWind'
    };

    return(
        <div className={quiz.wrapper}>
            <div className={quiz.quiz}>
                <h1 className={quiz.quiz__title}>Quiz App</h1>
                <hr />
                {currentQuestion ? (
                    <>
                <h2 key={index}>{index + 1}. {currentQuestion.question}</h2>
                <ul>
                    <li className={selectedAnswer === 1 ? (currentQuestion.answer === 1 ? quiz.correct : quiz.wrong) : ''} onClick={(event) => {checkAnswer(event, 1)}} key={1}>{currentQuestion.option1}</li>
                    <li className={selectedAnswer === 2 ? (currentQuestion.answer === 2 ? quiz.correct : quiz.wrong) : ''} onClick={(event) => {checkAnswer(event, 2)}} key={2}>{currentQuestion.option2}</li>
                    <li className={selectedAnswer === 3 ? (currentQuestion.answer === 3 ? quiz.correct : quiz.wrong) : ''} onClick={(event) => {checkAnswer(event, 3)}} key={3}>{currentQuestion.option3}</li>
                    <li className={selectedAnswer === 4 ? (currentQuestion.answer === 4 ? quiz.correct : quiz.wrong) : ''} onClick={(event) => {checkAnswer(event, 4)}} key={4}>{currentQuestion.option4}</li>
                    <li className={selectedAnswer === 5 ? (currentQuestion.answer === 5 ? quiz.correct : quiz.wrong) : ''} onClick={(event) => {checkAnswer(event, 5)}} key={5}>{currentQuestion.option5}</li>
                </ul>
                </>
                ) : (
                    <>
                    <p>Quiz is over</p>
                    <p className={quiz.quiz__scored}>You scored {gotCorrect}</p>
                    </>
                )}
                {attemptedNext && selectedAnswer === null && <p className={quiz.quiz__warning}>You need to choose the answer</p>}
                {quizComplete ? (
                    <button onClick={handleTreatButtonClick}>Tap me for reward</button>
                ) : (
                <button onClick={handleNext} disabled={isNextDisabled}>Next</button>
                )}
                <div className={quiz.quiz__index}>{index < 5 ? `${index + 1} of ${quizData.length} questions` : ''}</div>
            </div>
        </div>
    )
}

export default Quiz

