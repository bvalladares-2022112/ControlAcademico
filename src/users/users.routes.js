'use strict';

import { Router } from 'express';
import { assignCourse, deleteProfile, editProfile, register, viewAssignedCourses } from './users.controller.js';

const router = Router();


router.post('/register', register);
router.post('/:userId/courses/:courseId/assign', assignCourse);
router.get('/:userId/courses', viewAssignedCourses);
router.put('/:userId/edit', editProfile);
router.delete('/:userId/delete', deleteProfile);

export default router;
