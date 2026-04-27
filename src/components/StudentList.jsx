import StudentCard from './StudentCard';

export default function StudentList({ students }) {
    return (
        <ul className='list-none p-0 m-0'>
            {students.map(student => (
                <StudentCard
                    key={student.id}
                    student={student}
                />
            ))}
        </ul>
    );
}