// import React, { useContext, useEffect, useState } from 'react'
// import courseContext from '../context/course/courseContext'
// import alertContext from '../context/alert/alertContext';
// import CourseItem from './CourseItem';

// export default function MyCourses() {
//     const context = useContext(courseContext);
//     const { getMyAllNonPublishedCourses, nonPublishedCourses } = context;
//     const alertcontext = useContext(alertContext);
//     const { showAlert } = alertcontext;
//     useEffect(() => {
//         getMyAllNonPublishedCourses();
//     }, [])
//     return (
//         <div className="row my-3">
//             <h4>My In Progress Courses</h4>
//             {/* {nonPublishedCourses === null ? (
//                 <div>No In Progress Courses</div>
//             ) : nonPublishedCourses.length === 0 ? (
//                 <div>No In Progress Courses</div>
//             ) : (
//                 nonPublishedCourses.map((course) => (
//                     <CourseItem key={course._id} course={course} enroll={false} />
//                 ))
//             )} */}
//             {/* {nonPublishedCourses.map((course) => (
//                 console.log(course._id)))} */}
//                 {
//                     console.log(nonPublishedCourses.)
//                 }
//         </div>



//     )
// }
import React, { useContext, useEffect, useState } from 'react'
import courseContext from '../context/course/courseContext'
import alertContext from '../context/alert/alertContext';
import CourseItem from './CourseItem';
export default function MyCourses() {
    const context = useContext(courseContext);
    const { getMyAllNonPublishedCourses, nonPublishedCourses } = context;
    const alertcontext = useContext(alertContext);
    const { showAlert } = alertcontext;
    const [loading, setLoading] = useState(true); // Initialize loading state as true

    useEffect(() => {
        const fetchData = async () => {
            try {
                await getMyAllNonPublishedCourses();
                setLoading(false); // Set loading to false after data is fetched
            } catch (error) {
                setLoading(false); // Set loading to false even if there's an error
                showAlert('Error fetching data', 'danger');
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="row my-3">
            <h4>My In Progress Courses</h4>
            {nonPublishedCourses === null || nonPublishedCourses.length === 0 ? (
                <div>No In Progress Courses</div>
            ) : (
                nonPublishedCourses.map((course) => (
                    <CourseItem key={course._id} course={course} enroll={false} />
                ))
            )}
        </div>
    );
}
