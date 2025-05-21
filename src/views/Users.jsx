import { useStateContext } from "../contexts/ContextProvider";

export default function Users() {
  const { user } = useStateContext();

  if (!user) {
    return <div>No user logged in.</div>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      <img 
        src={user.avatar || "https://i.pravatar.cc/150?img=3"} 
        alt={`${user.name}'s avatar`} 
        style={{ width: 100, borderRadius: '50%' }} 
      />
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email || "No email provided"}</p>
    </div>
  );
}
