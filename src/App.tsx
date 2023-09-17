import { useEffect, useState } from 'react';
import { Course } from '../src/Courses/types';
import CourseGrid from '../src/Courses/components/CoursesGrid';
import { Button } from "@mui/material";
import './App.css';
import ResponsiveAppBar from '../src/Courses/components/navBar'
import DefFooter from './Courses/components/DefFooter';
import AddCourseModal from './Courses/components/AddCourseModal';
import ProfessorsModal from './Courses/components/ProfessorsModal';
import RoomsModal from './Courses/components/RoomsModal';
import API_BASE_URL from './consts/apiurl';


function App() {
  const [courses, setCourses] = useState<Course[]>([]); 
  const [isModalOpen, setModalOpen] = useState(false);
  const [isProfessorsModalOpen, setProfessorsModalOpen] = useState(false);
  const [isRoomModalOpen, setRoomModalOpen] = useState(false);
  const [selectedCourseForUpdate, setSelectedCourseForUpdate] = useState<Course | null>(null);  

  const handleAddCourse = () => {
        setModalOpen(true);
  };

  const handleAddProfessor = () => {
    setProfessorsModalOpen(true);
  };

    const handleAddRoom = () => {
      setRoomModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedCourseForUpdate(null);
    setModalOpen(false);
    setProfessorsModalOpen(false);
    setRoomModalOpen(false);
  };

  const getCourses = async () => {
    fetch(`${API_BASE_URL}/Courses/GetCourses`)
    .then((response) => response.json())
    .then((data) => setCourses(data))
    .catch((error) => console.error('Error fetching courses: ', error));
  };

  const handleGetCourses = async () => {
    getCourses();
  };

  const handleUpdateCourse = (course: Course) => {
    setSelectedCourseForUpdate(course);
    setModalOpen(true);
  };

  return (
    <div>
      <ResponsiveAppBar/>
      <div className="App-container">
          <Button type="button" onClick={handleGetCourses} variant="outlined" color='primary' style={{marginRight: "1rem"}}>
            Get courses
          </Button>
          <Button type="button" onClick={handleAddCourse} variant="outlined" color='secondary'>
            Add new course
          </Button>
          <AddCourseModal 
            handleGetCourses={handleGetCourses}
            open={isModalOpen} 
            onClose={handleCloseModal}
          />
          <Button type="button" onClick={handleAddProfessor} variant="outlined" color='warning' style={{margin: "1rem"}}>
            Add new Professor
          </Button>
          <ProfessorsModal
            handleGetCourses={handleGetCourses}
            open={isProfessorsModalOpen}
            onClose={handleCloseModal}
          />
          <Button type="button" onClick={handleAddRoom} variant="outlined" color='warning'>
            Add new Room
          </Button>
          <RoomsModal
            handleGetCourses={handleGetCourses}
            open={isRoomModalOpen}
            onClose={handleCloseModal}
          />
      </div>
      <div className="grid">
      <CourseGrid courses={courses} onUpdate={handleUpdateCourse} handleGetCourses={handleGetCourses}/>
      <AddCourseModal
        handleGetCourses={handleGetCourses}
        open={isModalOpen}
        onClose={handleCloseModal}
        selectedCourseForUpdate={selectedCourseForUpdate}
      />
      </div>
      <DefFooter/>
    </div>
  );
}

export default App;