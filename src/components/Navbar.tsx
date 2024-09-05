// components/Navbar.tsx
import { useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <nav>
      <ul>
        {status === "authenticated" ? (
          <>
            {session?.user?.role === "admin" && <li><a href="/admin-panel">Admin Panel</a></li>}
            <li><a href="/api/auth/signout">Logout</a></li>
          </>
        ) : (
          <li><a href="/login">Login</a></li>
        )}
      </ul>
    </nav>
  );
}