export default function TabNav({ setTab }) {
  return (
    <nav className="tabnav">
      <button onClick={() => setTab("dashboard")}>Dashboard</button>
      <button onClick={() => setTab("chat")}>Chat</button>
    </nav>
  );
}
