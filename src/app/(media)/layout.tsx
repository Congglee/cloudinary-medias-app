export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container">
      <div className="pt-8">{children}</div>
    </div>
  );
}
