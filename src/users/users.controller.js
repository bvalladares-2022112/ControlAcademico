'use strict';

import User from './users.model.js';
import { encrypt, checkPassword } from '../utils/validator.js'


export const register = async (req, res) => {
    try {
        let data = req.body;
        data.password = await encrypt(data.password)
        let user = new User(data);
        await user.save();
        return res.send({ message: 'User registered successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error registering user' });
    }
};

export const assignCourse = async (req, res) => {
    try {
        let { userId, courseId } = req.params;
        // Lógica para asignar el curso al usuario
        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        user.courses.push(courseId);
        await user.save();
        return res.send({ message: 'Course assigned successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error assigning course' });
    }
};

export const viewAssignedCourses = async (req, res) => {
    try {
        let { userId } = req.params;
        let user = await User.findById(userId).populate('courses');
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        return res.send({ courses: user.courses });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error retrieving assigned courses' });
    }
};

export const editProfile = async (req, res) => {
    try {
        let { userId } = req.params;
        let data = req.body;
        let user = await User.findByIdAndUpdate(userId, data, { new: true });
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        return res.send({ message: 'User profile updated successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error updating user profile' });
    }
};

export const deleteProfile = async (req, res) => {
    try {
        let { userId } = req.params;
        let user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        return res.send({ message: 'User profile deleted successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error deleting user profile' });
    }
};
