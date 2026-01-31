import mongoose from 'mongoose';
import dotenv from 'dotenv';
import users from './data/users';
import projects from './data/projects';
import services from './data/services';
import User from './models/User';
import Project from './models/Project';
import Service from './models/Service';
import BlogPost from './models/BlogPost';
import ContactMessage from './models/ContactMessage';
import connectDB from './config/db';

dotenv.config();

connectDB();

const importData = async () => {
    try {
        await User.deleteMany();
        await Project.deleteMany();
        await Service.deleteMany();
        await BlogPost.deleteMany();
        await ContactMessage.deleteMany();

        const createdUsers = await User.insertMany(users);
        const adminUser = createdUsers[0]._id;

        const sampleProjects = projects.map((project) => {
            return { ...project, user: adminUser };
        });

        await Project.insertMany(sampleProjects);
        await Service.insertMany(services);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await User.deleteMany();
        await Project.deleteMany();
        await Service.deleteMany();
        await BlogPost.deleteMany();
        await ContactMessage.deleteMany();

        console.log('Data Destroyed!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
