export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ position: "relative", zIndex: 100, backgroundColor: "#451eff", minHeight: "100vh" }}>
      {children}
    </div>
  );
}
