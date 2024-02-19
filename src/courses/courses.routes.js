'use strict';

import { Router } from 'express';
import { createCourse, getAllCourses, getCourseById, updateCourseById, deleteCourseById } from './courses.controller.js';

const router = Router();



router.post('/create', createCourse);
router.get('/get', getAllCourses);
router.get('/:getCourse', getCourseById);
router.put('/:upCourse', updateCourseById);
router.delete('/:courseId', deleteCourseById);

export default router;
