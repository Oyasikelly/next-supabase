"use client";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();
  const logout = async () => {
    try {
      await supabase.auth.signOut();

      router.refresh();
    } catch (err) {
      console.error("Unexpected error occurred:", err);
    }
  };
  // setNewView();
  return (
    <div>
      You are logged in
      <button
        onClick={logout}
        className="px-2 py-1 bg-blue-500 text-white cursor-pointer"
      >
        log out
      </button>
    </div>
  );
}
// import { supabase } from "@/lib/supabase";
// export default function Home() {
//   const setNewView = async () => {
//     try {
//       const { data, error } = await supabase.from("view").insert({
//         name: "random name",
//       });
//       if (error) {
//         console.error("Error inserting data:", error);
//       } else {
//         console.log("Data inserted successfully:", data);
//       }
//     } catch (err) {
//       console.error("Unexpected error occurred:", err);
//     }
//   };
//   // setNewView();
//   return <div>You are logged in</div>;
// }
