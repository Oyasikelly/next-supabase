// CLIENT SIDE
// "use client";

// import { supabase } from "@/lib/supabase";
// import { useRouter } from "next/navigation";
// import { useState } from "react";

// type SignUpData = {
//   email: string;
//   password: string;
// };

// export default function SignUp() {
//   const [data, setData] = useState<SignUpData>({
//     email: "",
//     password: "",
//   });

//   const router = useRouter();

//   const signUp = async () => {
//     if (!data.email.includes("@") || !data.email.includes(".")) {
//       alert("Please enter a valid email address.");
//       return;
//     }

//     if (data.password.length < 6) {
//       alert("Password must be at least 6 characters long.");
//       return;
//     }

//     try {
//       const { data: response, error } = await supabase.auth.signInWithPassword({
//         email: data.email,
//         password: data.password,
//       });

//       if (error) {
//         console.error("Sign-Up Error:", error.message);
//         alert(error.message); // Show error to the user
//         return;
//       }

//       if (response) {
//         router.refresh();
//       }
//       console.log("Sign-Up Successful:", response);
//       alert(
//         "Sign-up successful! Please check your email to confirm your account."
//       );
//     } catch (error) {
//       console.error("Unexpected Error:", error);
//     }
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
//     const { name, value } = e.target;
//     setData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   return (
//     <div className="py-10 px-4 flex flex-col gap-4 container mx-auto w-[400px] bg-blue-400">
//       <div className="grid">
//         <label htmlFor="email">Email</label>
//         <input
//           id="email"
//           type="email"
//           name="email"
//           value={data.email}
//           onChange={handleChange}
//           placeholder="Enter your email"
//           className="border p-2 rounded"
//         />
//       </div>
//       <div className="grid">
//         <label htmlFor="password">Password</label>
//         <input
//           id="password"
//           type="password"
//           name="password"
//           value={data.password}
//           onChange={handleChange}
//           placeholder="Enter your password"
//           className="border p-2 rounded"
//         />
//       </div>
//       <div>
//         <button
//           className="btn w-auto bg-black text-white p-4 hover:bg-opacity-70"
//           onClick={signUp}
//         >
//           Sign In
//         </button>
//       </div>
//     </div>
//   );
// }

// // "use client";

// // import { supabase } from "@/lib/supabase";
// // import { useState } from "react";

// // export default function Login() {
// //   const [data, setData] = useState<{
// //     email: string;
// //     password: string;
// //   }>({
// //     email: "",
// //     password: "",
// //   });

// //   const login = async () => {
// //     try {
// //       let { data, error } = await supabase.auth.signUp({
// //         email: "someone@email.com",
// //         password: "dKBTISUzWiOmcMFGpKqB",
// //       });

// //       if (data) console.log(data);
// //     } catch (error) {
// //       console.log(error);
// //     }
// //   };

// //   const handleChange = (e: any) => {
// //     const { name, value } = e.target;
// //     setData((prev: any) => ({
// //       ...prev,
// //       [name]: value,
// //     }));
// //   };

// //   return (
// //     <div className="py-10 px-4 flex flex-col gap-4 container mx-auto w-[400x] bg-blue-400">
// //       <div className="grid">
// //         <label>Email</label>
// //         <input
// //           type="text"
// //           name="email"
// //           value={data?.email}
// //           onChange={handleChange}
// //         />
// //       </div>
// //       <div className="grid">
// //         <label>Password</label>
// //         <input
// //           type="password"
// //           name="password"
// //           value={data?.password}
// //           onChange={handleChange}
// //         />
// //       </div>

// //       <div>
// //         <button
// //           className="btn w-auto bg-black text-white p-4 hover:bg-opacity-70"
// //           onClick={login}
// //         >
// //           Sign Up
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }

// SERVER SIDE
// export default function Login() {
//   return (
//     <form
//       action="/auth/signin"
//       method="post"
//       className="py-10 px-4 flex flex-col gap-4 container mx-auto w-[400x] bg-blue-400"
//     >
//       <label htmlFor="email">Email</label>
//       <input name="email" />
//       <label htmlFor="password">Password</label>
//       <input type="password" name="password" />
//       <button>Sign in</button>
//     </form>
//   );
// }

// MAGIC LINK

"use client";

import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useState } from "react";

type SignUpData = {
  email: string;
  password: string;
};

export default function SignUp() {
  const [data, setData] = useState<SignUpData>({
    email: "",
    password: "",
  });

  const [success, setSuccess] = useState<boolean>(false);
  const [Unsuccess, setUnSuccess] = useState<boolean>(false);
  const router = useRouter();

  const diappearMessage = () => {
    setTimeout(() => {
      setSuccess(false);
      setUnSuccess(false);
    }, 3500);
  };

  const signUp = async () => {
    if (!data.email.includes("@") || !data.email.includes(".")) {
      alert("Please enter a valid email address.");
      return;
    }

    try {
      const { data: response, error } = await supabase.auth.signInWithOtp({
        email: data.email,
        options: {
          shouldCreateUser: true,
          emailRedirectTo: `${window.location.origin}/dashboard`, // Redirect to the dashboard after email confirmation
        },
      });

      if (error) {
        setUnSuccess(true);

        console.error("Sign-Up Error:", error.message);
        // alert(error.message); // Show error to the user
        return;
      }

      // if (response) {
      // }
      setSuccess(true);
      console.log("Sign-Up Successful:", response);
      //   alert(
      //     "Sign-up successful! Please check your email to confirm your account."
      //   );

      // // Wait for user confirmation (via magic link), then redirect
      // supabase.auth.onAuthStateChange((event, session) => {
      //   if (event === "SIGNED_IN" && session) {
      //     router.push("/dashboard");
      //   }
      // });
    } catch (error) {
      console.error("Unexpected Error:", error);
    } finally {
      diappearMessage();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="py-10 px-4 flex flex-col gap-4 container mx-auto w-[400px] bg-blue-400">
      <div className="grid">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          value={data.email}
          onChange={handleChange}
          placeholder="Enter your email"
          className="border p-2 rounded"
        />
      </div>

      {success && (
        <div className="bg-green-100  px-2 text-green-500">
          An email has been sent to {data.email}, go and click to confirm your
          email.
        </div>
      )}
      {Unsuccess && (
        <div className="bg-red-100  px-2 text-red-500">
          An error occurred. Please try again later!
        </div>
      )}
      {/* <div className="grid">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          value={data.password}
          onChange={handleChange}
          placeholder="Enter your password"
          className="border p-2 rounded"
        />
      </div> */}
      <div>
        <button
          className="btn w-auto bg-black text-white p-4 hover:bg-opacity-70"
          onClick={signUp}
        >
          Sign In
        </button>
      </div>
    </div>
  );
}
