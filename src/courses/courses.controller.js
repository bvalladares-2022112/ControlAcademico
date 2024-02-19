'use strict';

import User from '../users/users.model.js';
import Course from './courses.model.js';

export const test = (req, res) => {
    console.log('Test is running');
    res.send({ message: 'test function is running' });
};


export const createCourse = async (req, res) => {
    try {
        const { name, description, teacher } = req.body;

        // Verificar si el profesor existe o no
        const existingUser = await User.findById(teacher);
        if (!existingUser) {
            return res.status(404).json({ message: 'Profesor not found' });
        }

        // Crear el nuevo curso
        const course = new Course({
            name,
            description,
            teacher: teacher
        });

        // Guardar el curso en la base de datos
        await course.save();

        return res.status(201).json({ message: 'Course created successfully', course });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error creating course' });
    }
};


export const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find().populate('teacher', 'name surname');
        return res.status(200).json({ courses });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error retrieving courses' });
    }
};

export const getCourseById = async (req, res) => {
    try {
        const { courseId } = req.params;
        const course = await Course.findById(courseId).populate('profesor', 'nombre apellido');
        
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        return res.status(200).json({ course });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error retrieving course' });
    }
};


export const updateCourseById = async (req, res) => {
    try {
        const { courseId } = req.params;
        const { nombre, descripcion, profesorId } = req.body;

        const updatedCourse = await Course.findByIdAndUpdate(courseId, {
            nombre,
            descripcion,
            profesor: profesorId
        }, { new: true });

        if (!updatedCourse) {
            return res.status(404).json({ message: 'Course not found' });
        }

        return res.status(200).json({ message: 'Course updated successfully', updatedCourse });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error updating course' });
    }
};

export const deleteCourseById = async (req, res) => {
    try {
        const { courseId } = req.params;
        const deletedCourse = await Course.findByIdAndDelete(courseId);

        if (!deletedCourse) {
            return res.status(404).json({ message: 'Course not found' });
        }

        return res.status(200).json({ message: 'Course deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error deleting course' });
    }
};
