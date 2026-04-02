export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ position: "relative", zIndex: 100, backgroundColor: "#ffffff", minHeight: "100vh" }}>
      {children}
    </div>
  );
}
