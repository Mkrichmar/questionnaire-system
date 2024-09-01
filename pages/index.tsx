import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function LoginPage() {
    const router = useRouter();
    const { error } = router.query;
    const { data: session, status } = useSession();

    console.log("Session status:", status);
    console.log("Session data:", session);

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const username = formData.get('username');
    const password = formData.get('password');

    console.log("Attempting to sign in with username:", username, "and password:", password);


    try {
        const result = await signIn("credentials", {
          username,
          password,
          redirect: false,
        });

        console.log("Sign-in result:", result);

        if (result?.error) {
            console.error("Sign-in error", result.error);
        } else {
            console.log("Sign-in successful. Redirecting...");
            if (session?.user?.role === "user") {
                router.push("/questionnaire")
            } else if (session?.user?.role === "admin") {
                router.push("/admin-dashboard");
            } else {
                router.push("/");
            }
        }
        
    } catch (err) {
        console.error("Sign-in error:", err) 
    }
  };

  if (status === "authenticated") {
    // Redirect immediately if the user is already authenticated
    if (session?.user?.role === "user") {
      router.push("/user-home");
    } else if (session?.user?.role === "admin") {
      router.push("/admin-dashboard");
    } else {
      router.push("/");
    }
    return null; // This prevents the component from rendering
  }
  return (
    <form onSubmit={handleSubmit}>
        {error && <p style={{color: "red" }}>{error}</p>}
      <input type="text" name="username" placeholder="Username" />
      <input type="password" name="password" placeholder="Password" />
      <button type="submit">Log In</button>
    </form>
  );
}
