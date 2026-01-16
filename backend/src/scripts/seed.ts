import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from '../models/Project';

dotenv.config();

const seedProjects = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfoliodb';
    await mongoose.connect(mongoURI);
    
    console.log('Connected to MongoDB');

    // Clear existing projects
    await Project.deleteMany({});
    console.log('Cleared existing projects');

    // Sample projects
    const projects = [
      {
        title: 'E-Commerce Platform',
        description: 'A full-stack e-commerce platform with payment integration',
        longDescription: 'Built with React, Node.js, and MongoDB. Features include user authentication, product catalog, shopping cart, and Stripe payment integration.',
        technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe'],
        images: [],
        githubUrl: 'https://github.com/username/ecommerce',
        liveUrl: 'https://ecommerce-demo.com',
        featured: true,
        order: 1,
      },
      {
        title: 'Portfolio Website',
        description: 'Personal portfolio website with admin panel',
        longDescription: 'A responsive portfolio website built with Next.js and TypeScript. Includes a custom CMS for managing projects and blog posts.',
        technologies: ['Next.js', 'TypeScript', 'MongoDB', 'TailwindCSS'],
        images: [],
        githubUrl: 'https://github.com/username/portfolio',
        featured: true,
        order: 2,
      },
      {
        title: 'Task Management App',
        description: 'Collaborative task management application',
        longDescription: 'Real-time task management app with team collaboration features. Built with React and Firebase.',
        technologies: ['React', 'Firebase', 'Material-UI'],
        images: [],
        githubUrl: 'https://github.com/username/task-app',
        liveUrl: 'https://task-app-demo.com',
        featured: false,
        order: 3,
      },
    ];

    await Project.insertMany(projects);
    console.log(`Inserted ${projects.length} sample projects`);

    mongoose.connection.close();
    console.log('Database seeding completed!');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedProjects();
