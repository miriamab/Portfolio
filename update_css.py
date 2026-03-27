with open("app/globals.css", "r") as f:
    content = f.read()

new_import = "@import url('https://fonts.googleapis.com/css2?family=Funnel+Sans:ital,wght@0,300..800;1,300..800&display=swap');\n"

if "Funnel+Sans" not in content:
    content = new_import + content
    
with open("app/globals.css", "w") as f:
    f.write(content)
