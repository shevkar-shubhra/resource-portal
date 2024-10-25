import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase';
import './Subject.css'; // Optional for custom styles

const Subject = ({ subject, year,onClose }) => {
  const [materials, setMaterials] = useState([]);
  const [newMaterial, setNewMaterial] = useState(''); // For link or name
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    fetchMaterials();
  }, [subject]);

  // Fetch materials from Firestore
  const fetchMaterials = async () => {
    const materialsCollection = collection(db, `years/${year}/subjects/${subject.id}/materials`);
    const materialsSnapshot = await getDocs(materialsCollection);
    const materialsData = materialsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setMaterials(materialsData);
  };

  // Handle file upload and material addition
  const handleAddMaterial = async () => {
    let link = newMaterial; // For link input if provided

    if (uploadFile) {
      const storageRef = ref(storage, `materials/${uploadFile.name}`);
      const uploadTask = uploadBytesResumable(storageRef, uploadFile);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          console.error("Upload error:", error);
        },
        async () => {
          // Get URL after upload completes
          link = await getDownloadURL(storageRef);
          console.log("File uploaded, download URL:", link);

          // Add material to Firestore
          await addDoc(collection(db, `years/${year}/subjects/${subject.id}/materials`), {
            name: uploadFile.name,
            link,
          });

          // Clear input and refetch materials
          fetchMaterials();
          setNewMaterial('');
          setUploadFile(null);
          setUploadProgress(0);
        }
      );
    } else if (newMaterial) {
      // Add link-only material to Firestore if no file selected
      await addDoc(collection(db, `years/${year}/subjects/${subject.id}/materials`), {
        name: newMaterial,
        link: newMaterial,
      });
      fetchMaterials();
      setNewMaterial('');
    } else {
      console.log("No file or link provided for material.");
    }
  };

  return (
    <div className="subject-modal">
    <button className="close-button" onClick={onClose}>✖</button>
    <h2>{subject.title}</h2>
    <p>{subject.desc}</p>

    <h3>Materials</h3>
    <ul className="materials-list">
      {materials.map((material) => (
        <li key={material.id}>
          <a href={material.link} target="_blank" rel="noopener noreferrer">
            {material.name}
          </a>
        </li>
      ))}
    </ul>

    <div className="add-material">
      <input 
        type="text" 
        placeholder="Material name or link" 
        value={newMaterial} 
        onChange={(e) => setNewMaterial(e.target.value)} 
      />
      <input type="file" onChange={(e) => setUploadFile(e.target.files[0])} />
      <button onClick={handleAddMaterial}>Add Material</button>
    </div>

    
  </div>
  );
};

export default Subject;
