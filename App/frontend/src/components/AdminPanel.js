import React, { useEffect, useState } from 'react';
import { addQuestion, updateQuestion, deleteQuestion, getQuestions } from '../api';
import './AdminPanel.css';

const AdminPanel = () => {
  const [questions, setQuestions] = useState([]);
  const [questionData, setQuestionData] = useState({ questionText: '', options: ['', '', '', ''], correctOption: 0, explanation: '', language: 'c++' });
  const [editId, setEditId] = useState(null);
  const [view, setView] = useState('initial'); // Track the current view
  const [language, setLanguage] = useState('c++'); // Default language

  const fetchQuestions = async (language) => {
    try {
      const { data } = await getQuestions(language);
      setQuestions(data);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  useEffect(() => {
    if (view === 'update' || view === 'delete' || view === 'show') {
      fetchQuestions(language);
    }
  }, [view, language]);

  const handleChange = (e) => {
    setQuestionData({ ...questionData, [e.target.name]: e.target.value });
  };

  const handleOptionChange = (e, index) => {
    const newOptions = questionData.options.map((option, i) => (i === index ? e.target.value : option));
    setQuestionData({ ...questionData, options: newOptions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await updateQuestion(editId, questionData);
      } else {
        await addQuestion(questionData);
      }
      fetchQuestions(language); // Refresh the list after adding/updating
      setQuestionData({ questionText: '', options: ['', '', '', ''], correctOption: 0, explanation: '', language: 'c++' });
      setEditId(null);
      setView('initial'); // Reset view to 'initial' after operation
    } catch (error) {
      console.error('Error adding/updating question:', error);
    }
  };

  const handleEdit = (question) => {
    setQuestionData(question);
    setEditId(question._id);
    setView('add');
  };

  const handleDelete = async (id) => {
    try {
      await deleteQuestion(id);
      fetchQuestions(language); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting question:', error);
    }
  };

  return (
    <div className="admin-container">
      <h2 className="admin-header">Admin Panel</h2>
      {view === 'initial' && (
        <div className="admin-buttons">
          <button onClick={() => setView('add')}>Add New Question</button>
          <button onClick={() => setView('update')}>Update Questions</button>
          <button onClick={() => setView('delete')}>Delete Questions</button>
          <button onClick={() => setView('show')}>Show Questions</button>
        </div>
      )}
      {view !== 'initial' && (
        <div className="back-button-container">
          <button onClick={() => setView('initial')} className="back-button">Go Back</button>
          <div/>
          <div>
          {view !== 'add' && (
            <div className="language-selector">
              <label>Select Language: </label>
              <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                <option value="c++">C++</option>
                <option value="java">Java</option>
                <option value="python">Python</option>
                <option value="c">C</option>
              </select>
             
            </div>
          )}
           </div>
        </div>
      )}
      {view === 'add' && (
        <form onSubmit={handleSubmit} className="admin-form">
          <h2>{editId ? 'Update' : 'Add'} Question</h2>
          <label>Language</label>
          <input type="text" name="language" placeholder="Language" value={questionData.language} onChange={handleChange} />
          <label>Question Text</label>
          <input type="text" name="questionText" placeholder="Question Text" value={questionData.questionText} onChange={handleChange} />
          {questionData.options.map((option, index) => (
            <React.Fragment key={index}>
              <label>Option {index + 1}</label>
              <input type="text" placeholder={`Option ${index + 1}`} value={option} onChange={(e) => handleOptionChange(e, index)} />
            </React.Fragment>
          ))}
          <label>Correct Option Index</label>
          <input type="number" name="correctOption" placeholder="Correct Option Index" value={questionData.correctOption} onChange={handleChange} />
          <label>Explanation</label>
          <input type="text" name="explanation" placeholder="Explanation" value={questionData.explanation} onChange={handleChange} />
          
          <button type="submit">{editId ? 'Update' : 'Add'} Question</button>
        </form>
      )}
      {view === 'update' && (
        <div className="questions-list">
          <br></br>
          <h2>Update Questions</h2>
          <ul>
            {questions.map((question) => (
              <li key={question._id}>
                <p>{question.questionText}</p>
                <button onClick={() => handleEdit(question)}>Edit</button>
              </li>
            ))}
          </ul>
        </div>
      )}
      {view === 'delete' && (
        <div className="questions-list">
           <br></br>
          <h2>Delete Questions</h2>
          <ul>
            {questions.map((question) => (
              <li key={question._id}>
                <p>{question.questionText}</p>
                <button onClick={() => handleDelete(question._id)} className="delete">Delete</button>
              </li>
            ))}
          </ul>
        </div>
      )}
      {view === 'show' && (
        <div className="questions-list">
           <br></br>
          <h2>Show Questions</h2>
          <ul>
            {questions.map((question) => (
              <li key={question._id}>
                <p>{question.questionText}</p>
                <ul>
                  {question.options.map((option, index) => (
                    <li key={index}>{option}</li>
                  ))}
                </ul>
                <p>Correct Option: {question.correctOption + 1}</p>
                <p>Explanation: {question.explanation}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
