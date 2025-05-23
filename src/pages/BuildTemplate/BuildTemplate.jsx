// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import exerciseBank from '../../data/exerciseBank';
// import user from '../../data/user';
// import RenderButton from '../../components/UI/RenderButton';
// import RenderSelect from '../../components/UI/RenderSelect';
// import {
//     Button,
//     Dialog,
//     DialogTitle,
//     DialogContent,
//     DialogActions,
//     Card,
//     CardContent,
//     Typography,
//     Grid,
// } from '@mui/material';
// import { buildWorkoutTemplate } from '../../utils/buildWorkoutTemplate';
// import { TextField } from '@mui/material';

// const dayOptions = [
//     'Monday',
//     'Tuesday',
//     'Wednesday',
//     'Thursday',
//     'Friday',
//     'Saturday',
//     'Sunday',
// ];

// const BuildTemplate = () => {
//     const [workouts, setWorkouts] = useState([
//         { id: 1, day: 'Monday', exercises: [] },
//     ]);
//     const [modalOpen, setModalOpen] = useState(false);
//     const [activeWorkoutId, setActiveWorkoutId] = useState(null);
//     const [selectedGroup, setSelectedGroup] = useState('');
//     const [selectedExercise, setSelectedExercise] = useState('');
//     const [templateName, setTemplateName] = useState('');
//     const navigate = useNavigate();

//     const handleAddDay = () => {
//         const newId = workouts.length + 1;
//         setWorkouts([...workouts, { id: newId, day: 'Monday', exercises: [] }]);
//     };

//     const handleDayChange = (id, newDay) => {
//         setWorkouts(
//             workouts.map((w) => (w.id === id ? { ...w, day: newDay } : w))
//         );
//     };

//     const handleDeleteDay = (id) => {
//         setWorkouts(workouts.filter((w) => w.id !== id));
//     };

//     const handleDeleteExercise = (dayId, index) => {
//         setWorkouts(
//             workouts.map((w) => {
//                 if (w.id === dayId) {
//                     const updatedExercises = w.exercises.filter(
//                         (_, i) => i !== index
//                     );
//                     return { ...w, exercises: updatedExercises };
//                 }
//                 return w;
//             })
//         );
//     };

//     const openModal = (workoutId) => {
//         setActiveWorkoutId(workoutId);
//         setSelectedGroup('');
//         setSelectedExercise('');
//         setModalOpen(true);
//     };

//     const closeModal = () => {
//         setModalOpen(false);
//         setActiveWorkoutId(null);
//         setSelectedGroup('');
//         setSelectedExercise('');
//     };

//     const handleAddExercise = () => {
//         if (!selectedGroup || !selectedExercise || !activeWorkoutId) return;
//         setWorkouts(
//             workouts.map((w) => {
//                 if (w.id === activeWorkoutId) {
//                     return {
//                         ...w,
//                         exercises: [
//                             ...w.exercises,
//                             { group: selectedGroup, name: selectedExercise },
//                         ],
//                     };
//                 }
//                 return w;
//             })
//         );
//         closeModal();
//     };

//     const handleSaveTemplate = () => {
//         if (!templateName.trim()) {
//             alert('Please enter a workout name.');
//             return;
//         }
//         const template = buildWorkoutTemplate(workouts, templateName);

//         // Push to user.workoutTemplates
//         if (!user.workoutTemplates) {
//             user.workoutTemplates = [];
//         }
//         user.workoutTemplates.push(template);

//         setTemplateName('');
//         navigate('/templates', {
//             state: { message: 'Workout Template Saved Successfully!' },
//         });
//     };

//     return (
//         <div style={{ padding: '2rem' }}>
//             <div style={{ marginBottom: '2rem' }}>
//                 <TextField
//                     label="Workout Name"
//                     value={templateName}
//                     onChange={(e) => setTemplateName(e.target.value)}
//                     variant="outlined"
//                     size="small"
//                     style={{ marginRight: '1rem' }}
//                 />
//                 <RenderButton
//                     label="Save Template"
//                     onClick={handleSaveTemplate}
//                     variant="outlined"
//                     color="primary"
//                     size="medium"
//                 />
//             </div>
//             <Grid
//                 container
//                 spacing={2}
//                 wrap="nowrap"
//                 style={{ overflowX: 'auto' }}>
//                 {workouts.map((workout) => (
//                     <Grid key={workout.id}>
//                         <Card
//                             style={{
//                                 width: '300px',
//                                 height: '500px',
//                                 overflow: 'hidden',
//                             }}>
//                             <CardContent
//                                 style={{
//                                     display: 'flex',
//                                     flexDirection: 'column',
//                                     height: '100%',
//                                 }}>
//                                 <RenderButton
//                                     label="Delete Day"
//                                     onClick={() => handleDeleteDay(workout.id)}
//                                     color="error"
//                                     size="small"
//                                     variant="outlined"
//                                     style={{
//                                         float: 'right',
//                                         marginBottom: '0.5rem',
//                                     }}
//                                 />
//                                 <RenderSelect
//                                     id={`day-${workout.id}`}
//                                     label="Day"
//                                     value={workout.day}
//                                     onChange={(e) =>
//                                         handleDayChange(
//                                             workout.id,
//                                             e.target.value
//                                         )
//                                     }
//                                     options={dayOptions}
//                                 />
//                                 <Typography
//                                     variant="h6"
//                                     style={{ marginTop: '1rem' }}>
//                                     Exercises
//                                 </Typography>
//                                 <div
//                                     style={{
//                                         flexGrow: 1,
//                                         overflowY: 'auto',
//                                         marginTop: '0.5rem',
//                                     }}>
//                                     {workout.exercises.map((exercise, idx) => (
//                                         <Grid
//                                             container
//                                             alignItems="center"
//                                             justifyContent="space-between"
//                                             key={idx}>
//                                             <Grid>
//                                                 <Typography variant="body2">
//                                                     {exercise.group} –{' '}
//                                                     {exercise.name}
//                                                 </Typography>
//                                             </Grid>
//                                             <Grid>
//                                                 <RenderButton
//                                                     label="Delete"
//                                                     onClick={() =>
//                                                         handleDeleteExercise(
//                                                             workout.id,
//                                                             idx
//                                                         )
//                                                     }
//                                                     variant="outlined"
//                                                     color="error"
//                                                     size="small"
//                                                 />
//                                             </Grid>
//                                         </Grid>
//                                     ))}
//                                 </div>
//                                 <RenderButton
//                                     label="Add Exercise"
//                                     onClick={() => openModal(workout.id)}
//                                     variant="outlined"
//                                     color="primary"
//                                     size="small"
//                                     style={{ marginTop: '1rem' }}
//                                 />
//                             </CardContent>
//                         </Card>
//                     </Grid>
//                 ))}
//                 <Grid>
//                     <RenderButton
//                         label="Add Day"
//                         onClick={handleAddDay}
//                         variant="outlined"
//                         style={{ height: '100%' }}
//                     />
//                 </Grid>
//             </Grid>
//             <Dialog open={modalOpen} onClose={closeModal}>
//                 <DialogTitle>Select Exercise</DialogTitle>
//                 <DialogContent>
//                     <RenderSelect
//                         id="group"
//                         label="Select Muscle Group"
//                         value={selectedGroup}
//                         onChange={(e) => setSelectedGroup(e.target.value)}
//                         options={Object.keys(exerciseBank)}
//                     />
//                     {selectedGroup && (
//                         <RenderSelect
//                             id="exercise"
//                             label="Select Exercise"
//                             value={selectedExercise}
//                             onChange={(e) =>
//                                 setSelectedExercise(e.target.value)
//                             }
//                             options={exerciseBank[selectedGroup]}
//                         />
//                     )}
//                 </DialogContent>
//                 <DialogActions>
//                     <RenderButton
//                         label="Cancel"
//                         onClick={closeModal}
//                         variant="outlined"
//                         color="error"
//                     />
//                     <RenderButton
//                         label="Add"
//                         onClick={handleAddExercise}
//                         variant="outlined"
//                         color="primary"
//                         disabled={!selectedGroup || !selectedExercise}
//                     />
//                 </DialogActions>
//             </Dialog>
//         </div>
//     );
// };

// export default BuildTemplate;







import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import exerciseBank from '../../data/exerciseBank';
import user from '../../data/user';
import RenderButton from '../../components/UI/RenderButton';
import RenderSelect from '../../components/UI/RenderSelect';
import { buildWorkoutTemplate } from '../../utils/buildWorkoutTemplate';
import './BuildTemplate.css';

const dayOptions = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
];

const BuildTemplate = () => {
    const [workouts, setWorkouts] = useState([{ id: 1, day: 'Monday', exercises: [] }]);
    const [modalOpen, setModalOpen] = useState(false);
    const [activeWorkoutId, setActiveWorkoutId] = useState(null);
    const [selectedGroup, setSelectedGroup] = useState('');
    const [selectedExercise, setSelectedExercise] = useState('');
    const [templateName, setTemplateName] = useState('');
    const navigate = useNavigate();

    const handleAddDay = () => {
        const newId = workouts.length + 1;
        setWorkouts([...workouts, { id: newId, day: 'Monday', exercises: [] }]);
    };

    const handleDayChange = (id, newDay) => {
        setWorkouts(workouts.map(w => (w.id === id ? { ...w, day: newDay } : w)));
    };

    const handleDeleteDay = (id) => {
        setWorkouts(workouts.filter(w => w.id !== id));
    };

    const handleDeleteExercise = (dayId, index) => {
        setWorkouts(
            workouts.map(w => {
                if (w.id === dayId) {
                    const updatedExercises = w.exercises.filter((_, i) => i !== index);
                    return { ...w, exercises: updatedExercises };
                }
                return w;
            })
        );
    };

    const openModal = (workoutId) => {
        setActiveWorkoutId(workoutId);
        setSelectedGroup('');
        setSelectedExercise('');
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setActiveWorkoutId(null);
        setSelectedGroup('');
        setSelectedExercise('');
    };

    const handleAddExercise = () => {
        if (!selectedGroup || !selectedExercise || !activeWorkoutId) return;
        setWorkouts(
            workouts.map(w => {
                if (w.id === activeWorkoutId) {
                    return {
                        ...w,
                        exercises: [...w.exercises, { group: selectedGroup, name: selectedExercise }],
                    };
                }
                return w;
            })
        );
        closeModal();
    };

    const handleSaveTemplate = () => {
        if (!templateName.trim()) {
            alert('Please enter a workout name.');
            return;
        }
        const template = buildWorkoutTemplate(workouts, templateName);

        if (!user.workoutTemplates) {
            user.workoutTemplates = [];
        }
        user.workoutTemplates.push(template);

        setTemplateName('');
        navigate('/templates', { state: { message: 'Workout Template Saved Successfully!' } });
    };

    return (
        <div className="build-template">
            <div className="template-header">
                <input
                    type="text"
                    placeholder="Workout Name"
                    value={templateName}
                    onChange={(e) => setTemplateName(e.target.value)}
                    className="template-name-input"
                />
                <RenderButton
                    label="Save Template"
                    onClick={handleSaveTemplate}
                    variant="outlined"
                    color="primary"
                    size="medium"
                />
            </div>

            <div className="workout-container">
                {workouts.map((workout) => (
                    <div key={workout.id} className="workout-card">
                        <div className="workout-card-content">
                            <RenderButton
                                label="Delete Day"
                                onClick={() => handleDeleteDay(workout.id)}
                                color="error"
                                size="small"
                                variant="outlined"
                                className="delete-day-button"
                            />

                            <RenderSelect
                                id={`day-${workout.id}`}
                                label="Day"
                                value={workout.day}
                                onChange={(e) => handleDayChange(workout.id, e.target.value)}
                                options={dayOptions}
                            />

                            <h3 className="exercise-title">Exercises</h3>

                            <div className="exercise-list">
                                {workout.exercises.map((exercise, idx) => (
                                    <div key={idx} className="exercise-item">
                                        <span>
                                            {exercise.group} – {exercise.name}
                                        </span>
                                        <RenderButton
                                            label="Delete"
                                            onClick={() => handleDeleteExercise(workout.id, idx)}
                                            variant="outlined"
                                            color="error"
                                            size="small"
                                        />
                                    </div>
                                ))}
                            </div>

                            <RenderButton
                                label="Add Exercise"
                                onClick={() => openModal(workout.id)}
                                variant="outlined"
                                color="primary"
                                size="small"
                                className="add-exercise-button"
                            />
                        </div>
                    </div>
                ))}

                <RenderButton
                    label="Add Day"
                    onClick={handleAddDay}
                    variant="outlined"
                    className="add-day-button"
                />
            </div>

            {modalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Select Exercise</h2>
                        <RenderSelect
                            id="group"
                            label="Select Muscle Group"
                            value={selectedGroup}
                            onChange={(e) => setSelectedGroup(e.target.value)}
                            options={Object.keys(exerciseBank)}
                        />
                        {selectedGroup && (
                            <RenderSelect
                                id="exercise"
                                label="Select Exercise"
                                value={selectedExercise}
                                onChange={(e) => setSelectedExercise(e.target.value)}
                                options={exerciseBank[selectedGroup]}
                            />
                        )}
                        <div className="modal-buttons">
                            <RenderButton
                                label="Cancel"
                                onClick={closeModal}
                                variant="outlined"
                                color="error"
                            />
                            <RenderButton
                                label="Add"
                                onClick={handleAddExercise}
                                variant="outlined"
                                color="primary"
                                disabled={!selectedGroup || !selectedExercise}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BuildTemplate;