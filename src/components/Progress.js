import React from 'react'
import { useParams } from 'react-router-dom';
export default function Progress() {
    const { courseId } = useParams();
  return (
    <div>{courseId}</div>
  )
}
