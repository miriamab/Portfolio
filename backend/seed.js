const mongoose = require('mongoose');
require('dotenv').config();

const ProjectSchema = new mongoose.Schema({
  title: String,
  description: String,
  longDescription: String,
  technologies: [String],
  images: [String],
  githubUrl: String,
  liveUrl: String,
  featured: Boolean,
  order: Number
}, { timestamps: true });

const Project = mongoose.model('Project', ProjectSchema);

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB');
  
  await Project.deleteMany({});
  console.log('Cleared existing projects');
  
  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce platform with payment integration',
      longDescription: 'Built with React, Node.js, and MongoDB.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe'],
      images: [],
      githubUrl: 'https://github.com/username/ecommerce',
      liveUrl: 'https://ecommerce-demo.com',
      featured: true,
      order: 1
    },
    {
      title: 'Portfolio Website',
      description: 'Personal portfolio website with admin panel',
      longDescription: 'A responsive portfolio website built with Next.js.',
      technologies: ['Next.js', 'TypeScript', 'MongoDB', 'TailwindCSS'],
      images: [],
      githubUrl: 'https://github.com/username/portfolio',
      featured: true,
      order: 2
    },
    {
      title: 'Task Management App',
      description: 'Collaborative task management application',
      longDescription: 'Real-time task management app.',
      technologies: ['React', 'Firebase', 'Material-UI'],
      images: [],
      githubUrl: 'https://github.com/username/task-app',
      liveUrl: 'https://task-app-demo.com',
      featured: false,
      order: 3
    }
  ];
  
  await Project.insertMany(projects);
  console.log('Inserted 3 projects');
  
  const count = await Project.countDocuments();
  console.log('Total projects in database:', count);
  
  await mongoose.connection.close();
  console.log('Done!');
}

seed().catch(console.error);
