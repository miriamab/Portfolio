import re

with open("app/components/sections/Projects.tsx", "r") as f:
    content = f.read()

content = content.replace(
    'import { useState, useEffect } from "react";\nimport { createPortal } from "react-dom";\nimport { useRouter } from "next/navigation";',
    'import { useState, useEffect } from "react";\nimport { useRouter } from "next/navigation";\nimport Link from "next/link";'
)

content = re.sub(
    r'\s*const \[selectedProject, setSelectedProject\] = useState<Project \| null>\(null\);\n\s*const \[currentImageIndex, setCurrentImageIndex\] = useState\(0\);',
    '',
    content
)

content = re.sub(
    r'\s*const closeModal = \(\) => \{\n\s*setSelectedProject\(null\);\n\s*setCurrentImageIndex\(0\);\n\s*\};\n\n\s*const nextImage = \(\) => \{[\s\S]*?\}\n\s*\};\n\n\s*const previousImage = \(\) => \{[\s\S]*?\}\n\s*\};',
    '',
    content
)

content = content.replace(
    '<div\n              key={project.id}\n              onClick={() => setSelectedProject(project)}\n              className="project-preview-wrapper"\n            >',
    '<Link\n              key={project.id}\n              href={`/projects/${project.id}`}\n              className="project-preview-wrapper"\n              style={{ display: "block", textDecoration: "none" }}\n            >'
)

content = content.replace(
    '''              </div>\n            </div>\n          ))}\n        </div>''',
    '''              </div>\n            </Link>\n          ))}\n        </div>'''
)

content = re.sub(
    r'\{\/\* Modal \*/\}[\s\S]*?(?=</section>)',
    '',
    content
)

content = content.replace('Kein Bild', 'No Image')
content = content.replace('Lädt Projekte...', 'Loading projects...')

with open("app/components/sections/Projects.tsx", "w") as f:
    f.write(content)
