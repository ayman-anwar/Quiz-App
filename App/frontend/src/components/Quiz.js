import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getQuestions } from '../api';
import './Quiz.css'; // Import your CSS file

const Quiz = () => {
  const { language } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answerFeedback, setAnswerFeedback] = useState(null); // State to store answer feedback
  const [selectedOption, setSelectedOption] = useState(null); // State to track selected option index
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const { data } = await getQuestions(language);
        setQuestions(data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };
    fetchQuestions();
  }, [language]);

  const handleAnswer = (index) => {
    const correctOption = questions[currentQuestion]?.correctOption;
    const isCorrect = index === correctOption;

    // Prepare feedback
    const feedback = {
      correct: isCorrect,
      explanation: questions[currentQuestion]?.explanation,
      selectedAnswer: questions[currentQuestion]?.options[index],
      correctAnswer: questions[currentQuestion]?.options[correctOption]
    };

    // Set answer feedback immediately
    setAnswerFeedback(feedback);

    // Calculate score
    if (isCorrect) {
      setScore(score + 1);
    }

    // Set selected option
    setSelectedOption(index);
  };

  const moveToNextQuestion = () => {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setAnswerFeedback(null); // Reset answer feedback when moving to the next question
      setSelectedOption(null); // Reset selected option when moving to the next question
    } else {
      setShowResult(true);
      setTimeout(() => navigate('/quiz'), 2000); // Navigate to language selection page after 2 seconds
    }
  };

  const moveToPreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setAnswerFeedback(null); // Reset answer feedback when moving to the previous question
      setSelectedOption(null); // Reset selected option when moving to the previous question
    }
  };

  if (questions.length === 0) {
    return <div className="quiz-loading">Loading...</div>; // Handle loading state while fetching questions
  }

  return (
    <div className="quiz-container">
      <div className="quiz-question">
        <h2>{questions[currentQuestion]?.questionText}</h2>
        <div className="quiz-options">
          {questions[currentQuestion]?.options.map((option, index) => (
            <button
              key={index}
              className={`quiz-option ${selectedOption === index ? 'selected' : ''}`}
              onClick={() => handleAnswer(index)}
              disabled={answerFeedback !== null} // Disable options after answering
            >
              {option}
            </button>
          ))}
        </div>
        {answerFeedback && (
          <div className="quiz-feedback">
            <p>{answerFeedback.correct ? 'Correct!' : 'Wrong!'}</p>
            <p>Explanation: {answerFeedback.explanation}</p>
          </div>
        )}
      </div>
      <div className="quiz-navigation">
        <button onClick={moveToPreviousQuestion} disabled={currentQuestion === 0}>
          Previous
        </button>
        <button onClick={moveToNextQuestion} disabled={answerFeedback === null}>
          {currentQuestion + 1 === questions.length ? 'Finish Quiz' : 'Next'}
        </button>
      </div>
      {showResult && (
        <div className="quiz-result">
          <h2>Your score: {score}</h2>
        </div>
      )}
    </div>
  );
};

export default Quiz;
