
import React, { useEffect, useState } from 'react';

export default function Progress(props) {
    const { courseId } = props;
    const [certificate, setCertificate] = useState();
    const host = "http://localhost:3333";

    const getCertificate = async (id) => {
        const response = await fetch(`${host}/learning-platform/course/getcertificate/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRlNGZlNDMzNTY0YzNjZWNjNDdhMzZkIn0sImlhdCI6MTY5MzMwNTYyMX0.Qe9FR_gU-74GzZb7fyWS6x-U-xll5Wfl6ABn3Kxv0oE"
            },
        });
        const json = await response.json();

        setCertificate(json);
    };

    useEffect(() => {
        getCertificate(courseId);
    }, [courseId]);

    if (certificate === undefined) {
        return <div>Loading certificate...</div>;
    }

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-header">
                    <h2 className="card-title text-center">Certificate of Completion</h2>
                </div>
                <div className="card-body">
                    <p className="lead">Dear {certificate.user},</p>
                    {certificate.status==="Course is in progress" ? (
                        <p>Your Course is in progress</p>
                    ) :  certificate.status==="Failed"? (<p>You have failed the course:</p>):(
                        <p>You have successfully completed the course:</p>
                    )}

                    <h3 className="card-title">{certificate.course}</h3>
                    <p className="mb-1">Instructor: {certificate.instructor}</p>
                    <p className="mb-1">Result: {certificate.result} %</p>
                    <p className="mb-1">Status: {certificate.status}</p>
                    <p>{certificate.message}</p>
                </div>
            </div>
        </div >

    );
}
