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

const letsMoveProject = {
  title: "Let's Move",
  description: "A personal data visualization project.",
  longDescription: "A personal data visualization project created for the Information Design course, analyzing 70 months of athletic history through a comprehensive digital archive.",
  technologies: ["Svelte", "JavaScript", "D3.js", "CSS", "HTML"],
  images: [
    "/project-images/projekt1-bild1.png",
    "/project-images/projekt1-bild2.png",
    "/project-images/projekt1-bild3.png"
  ],
  githubUrl: "",
  liveUrl: "",
  featured: true,
  order: 1
};

async function updateProjects() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    
    // Lösche alle alten Projekte
    const deleteResult = await Project.deleteMany({});
    console.log(`🗑️  Deleted ${deleteResult.deletedCount} old projects`);
    
    // Füge das Let's Move Projekt ein
    const newProject = await Project.create(letsMoveProject);
    console.log(`✅ Inserted project: ${newProject.title}`);
    
    // Zeige das Projekt
    const allProjects = await Project.find();
    console.log('\n📋 Current projects in database:');
    allProjects.forEach((p) => {
      console.log(`\n📌 ${p.title}`);
      console.log(`   Description: ${p.description}`);
      console.log(`   Technologies: ${p.technologies.join(', ')}`);
      console.log(`   Images: ${p.images.length} image(s)`);
      p.images.forEach((img, idx) => {
        console.log(`     ${idx + 1}. ${img}`);
      });
    });
    
    await mongoose.connection.close();
    console.log('\n✅ Done! Project added successfully.');
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

updateProjects();
