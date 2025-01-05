import { supabase } from "@/lib/supabase";
export default function Home() {
  const setNewView = async () => {
    try {
      const { data, error } = await supabase.from("view").insert({
        name: "random name",
      });
      if (error) {
        console.error("Error inserting data:", error);
      } else {
        console.log("Data inserted successfully:", data);
      }
    } catch (err) {
      console.error("Unexpected error occurred:", err);
    }
  };
  // setNewView();
  return <div>You are logged in</div>;
}
