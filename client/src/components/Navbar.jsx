import React, { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Sun, Moon } from "lucide-react"

export default function Navbar() {
  const [theme, setTheme] = useState("light")

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
    if (theme === "dark") {
      document.documentElement.classList.remove("dark")
    } else {
      document.documentElement.classList.add("dark")
    }
  }

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full sticky top-0 z-50 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/70"
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand / Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="text-xl font-semibold text-neutral-800 dark:text-neutral-100"
        >
          MagicNav
        </motion.div>

        {/* Menu */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" className="text-neutral-700 dark:text-neutral-200">
            Contact
          </Button>
          <Button variant="outline" className="text-neutral-800 dark:text-neutral-100">
            Login
          </Button>

          {/* Theme Toggle */}
          <motion.button
            whileTap={{ scale: 0.85 }}
            className="p-2 rounded-xl border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-800"
            onClick={toggleTheme}
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-neutral-600" />
            )}
          </motion.button>
        </div>
      </div>
    </motion.nav>
  )
}
