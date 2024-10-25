import React, { useState, useEffect } from 'react';
import { db } from '../firebase'; // Firebase initialization
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import Subject from './Subject';
import './ResourcePage.css';

const ResourcePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState(1); // Default year is 1
  const [subjects, setSubjects] = useState([]);
  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null); // For modal display
  const [isAdding, setIsAdding] = useState(false); // For add new subject form

  useEffect(() => {
    // Fetch Year 1 subjects by default
    fetchSubjects(selectedYear);
  }, [selectedYear]);

  const fetchSubjects = async (year) => {
    let subjectsData = [];
    try {
      const yearCollection = collection(db, `years/${year}/subjects`);
      const yearQuerySnapshot = await getDocs(yearCollection);
      subjectsData = yearQuerySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      setSubjects(subjectsData);
      setFilteredSubjects(subjectsData);
    } catch (error) {
      console.error('Error fetching subjects: ', error);
    }
  };

  const handleSearch = () => {
    const filtered = subjects.filter(subject =>
      subject.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSubjects(filtered);
  };

  const handleYearSelect = (year) => {
    setSelectedYear(year);
  };

  const handleSubjectClick = (subject) => {
    setSelectedSubject(subject);
    
  };

  const handleAddSubject = async (newSubject) => {
    try {
      await addDoc(collection(db, `years/${selectedYear}/subjects`), {
        ...newSubject,
        rating: 0,
      });
      fetchSubjects(selectedYear);
      setIsAdding(false); // Close the form
    } catch (error) {
      console.error('Error adding new subject: ', error);
    }
  };

  return (
    <>
      <div className="resource-page">
        <div className="description">
          <h1>Resources for Every Semester</h1>
          <p>Access notes, previous papers, and feedback from seniors to excel in your courses.</p>
        </div>

        <div className="search-section">
          <input 
            type="text" 
            placeholder="Search for a subject..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
          <button onClick={handleSearch}>
            <FontAwesomeIcon icon={faSearch} className="feature-icon" />
          </button>
        </div>

        <div className="year-filters">
          <button onClick={() => handleYearSelect(1)}>Year 1</button>
          <button onClick={() => handleYearSelect(2)}>Year 2</button>
          <button onClick={() => handleYearSelect(3)}>Year 3</button>
          <button onClick={() => handleYearSelect(4)}>Year 4</button>
        </div>

        <div className="subject-list">
          {filteredSubjects.length > 0 ? (
            filteredSubjects.map((subject) => (
              <div 
                key={subject.id} 
                className="subject-card" 
                onClick={() => handleSubjectClick(subject)}
              >
                <h3>{subject.title}</h3>
                <p>{subject.desc}</p>
                <p>Rating: {subject.rating}</p>
              </div>
            ))
          ) : (
            <p>No subjects found.</p>
          )}
        </div>

        <button className="add-subject-btn" onClick={() => setIsAdding(true)}>
          <FontAwesomeIcon icon={faPlus} /> Add New Subject
        </button>

        {/* Modal for displaying subject details */}
        {selectedSubject && (
          <div className="modal-overlay" onClick={() => setSelectedSubject(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <Subject subject={selectedSubject} year = {selectedYear} onClose={() => setSelectedSubject(null)} />
            </div>
          </div>
        )}

        {/* Form for adding new subject */}
        {isAdding && (
          <div className="modal-overlay" onClick={() => setIsAdding(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h2>Add New Subject</h2>
              <input 
                type="text" 
                placeholder="Title" 
                id="title"
              />
              <textarea 
                placeholder="Description" 
                id="description"
              ></textarea>
              <button onClick={() => {
                const newSubject = {
                  title: document.getElementById('title').value,
                  desc: document.getElementById('description').value,
                  materials: [], // Add default materials if needed
                };
                handleAddSubject(newSubject);
              }}>Add Subject</button>
              <button onClick={() => setIsAdding(false)}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ResourcePage;
