// "use client";

// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { MagicCard } from "@/components/magicui/magic-card";
// import { TextAnimate } from "@/components/magicui/text-animate";
// import { useState } from "react";

// export default function UserLogin() {
  
//   const [theme] = useState("light");
//   return (
//     <div className= "justify-center ">
//       <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
//       <Card className="p-0 max-w-sm w-full shadow-none border-none">
//         <MagicCard
//           gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
//           className="p-0"
//         >
//           <CardHeader className="border-b border-border p-4 [.border-b]:pb-4">
//             <CardTitle className="text-3xl font-bold" >Login</CardTitle>
//             <CardDescription>
//               Enter your credentials to access your account
//             </CardDescription>
//           </CardHeader>
//           <CardContent className="p-4">
//             <form>
//               <div className="grid gap-4">
//                 <div className="grid gap-2">
//                   <Label htmlFor="email">Email</Label>
//                   <Input id="email" type="email" placeholder="name@example.com" />
//                 </div>
//                 <div className="grid gap-2">
//                   <Label htmlFor="password">Password</Label>
//                   <Input id="password" type="password" />
//                 </div>
//               </div>
//             </form>
//           </CardContent>
//           <CardFooter className="p-4 border-t border-border [.border-t]:pt-4">
//             <Button className="w-full">Sign In</Button>
//           </CardFooter>
//         </MagicCard>
//       </Card>
//     </div>
//     <TextAnimate animation="blurIn" as="h1">
//           Blur in text
//     </TextAnimate>
//     </div>
//   );
// }

"use client";

import { cn } from "@/lib/utils";
import { DotPattern } from "@/components/magicui/dot-pattern";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MagicCard } from "@/components/magicui/magic-card";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function UserRegister() {
  const [theme] = useState("dark");

  // Track mouse position for CSS custom properties
  useEffect(() => {
    const handleMouseMove = (e) => {
      const loginContainer = document.querySelector('.login-dot-pattern');
      if (loginContainer) {
        const rect = loginContainer.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        
        document.documentElement.style.setProperty('--login-mouse-x', `${x}%`);
        document.documentElement.style.setProperty('--login-mouse-y', `${y}%`);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="login-dot-pattern bg-background">
      {/* Separate background layer for dots only */}
      <DotPattern
              glow={true}
              className={cn(
                "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]",
              )}
            />
      
      {/* Content layer - completely separate */}
      <div className="login-content">
        <Card className="p-0 max-w-sm w-full shadow-lg border border-border/50">
          <MagicCard
            gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
            className="p-0"
          >
            <CardHeader className="border-b border-border p-4 [.border-b]:pb-4">
              <CardTitle className="text-3xl font-bold">Sign Up</CardTitle>
              <CardDescription>
                Enter credentials to register your account
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <form>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Username</Label>
                    <Input id="name" type="name" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="name@example.com" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" />
                  </div>
                  
                </div>
              </form>
            </CardContent>
            <CardFooter className="p-4 border-t border-border [.border-t]:pt-4">
              <Button className="w-full">Sign Up</Button>
            </CardFooter>
            <p>Already Have an account? <Link to='/'>Sign In</Link></p>
          </MagicCard>
        </Card>
      </div>
    </div>
  );
}