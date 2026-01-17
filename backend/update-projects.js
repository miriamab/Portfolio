const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Mongoose Project Model
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

// Deine echten Projekte hier einfügen:
const realProjects = [
  {
    title: "PROJEKT 1 NAME",
    description: "Kurze Beschreibung für Projekt 1",
    longDescription: "Ausführliche Beschreibung für Projekt 1. Hier kannst du Details erklären...",
    technologies: ["Technologie 1", "Technologie 2", "Technologie 3"],
    images: ["/uploads/projekt1-bild1.jpg", "/uploads/projekt1-bild2.jpg"],
    githubUrl: "https://github.com/username/projekt1",
    liveUrl: "https://projekt1.com",
    featured: true,
    order: 1
  },
  {
    title: "PROJEKT 2 NAME",
    description: "Kurze Beschreibung für Projekt 2",
    longDescription: "Ausführliche Beschreibung für Projekt 2...",
    technologies: ["Tech 1", "Tech 2", "Tech 3"],
    images: ["/uploads/projekt2-bild1.jpg"],
    githubUrl: "https://github.com/username/projekt2",
    liveUrl: "",
    featured: true,
    order: 2
  },
  // ... füge hier deine weiteren 3 Projekte hinzu
];

async function updateProjects() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    
    // Lösche alte Test-Projekte
    const deleteResult = await Project.deleteMany({});
    console.log(`🗑️  Deleted ${deleteResult.deletedCount} old projects`);
    
    // Füge echte Projekte ein
    const insertResult = await Project.insertMany(realProjects);
    console.log(`✅ Inserted ${insertResult.length} new projects`);
    
    // Zeige alle Projekte
    const allProjects = await Project.find().sort({ order: 1 });
    console.log('\n📋 Current projects in database:');
    allProjects.forEach((p, idx) => {
      console.log(`${idx + 1}. ${p.title}`);
      console.log(`   Technologies: ${p.technologies.join(', ')}`);
      console.log(`   Images: ${p.images.length} image(s)`);
      console.log('');
    });
    
    await mongoose.connection.close();
    console.log('✅ Done!');
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

updateProjects();
