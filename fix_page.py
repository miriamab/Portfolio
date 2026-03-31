with open("app/projects/[id]/page.tsx", "r") as f:
    content = f.read()

content = content.replace(
    'style={{ backgroundColor: "#451eff", minHeight: "100vh", width: "100%", display: "flex", flexDirection: "column" }}',
    'style={{ backgroundColor: "#451eff", minHeight: "100vh", width: "100%", position: "relative", zIndex: 9999 }}'
)

with open("app/projects/[id]/page.tsx", "w") as f:
    f.write(content)

