import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import loginImage from "@/assets/image.png"
import heart from "@/assets/heart.png"

export function LoginForm({
  className,
  ...props
}) {
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(true)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      if (isLogin) {
        // Login Logic
        const response = await axios.post("http://127.0.0.1:8000/api/login/", {
          username,
          password
        })
        console.log("Login success:", response.data)
        alert("Login Successful! Welcome " + response.data.username)
        navigate("/dashboard")
      } else {
        // Register Logic
        const response = await axios.post("http://127.0.0.1:8000/api/register/", {
          username,
          password,
          email
        })
        console.log("Register success:", response.data)
        alert("Registered, you can login")
        setIsLogin(true)
      }
    } catch (err) {
      console.error("Auth error:", err)
      setError(err.response?.data?.error || "an error occurred. please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">{isLogin ? "Welcome back" : "Create an account"}</h1>
                <p className="text-balance text-muted-foreground">
                  {isLogin ? "Login to your Malkhan account" : "Enter your details below"}
                </p>
              </div>

              {error && <div className="text-red-500 text-sm text-center">{error}</div>}

              <div className="grid gap-2 ">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder=""
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              {!isLogin && (
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              )}

              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  {isLogin && (
                    <a href="#" className="ml-auto text-sm underline-offset-2 hover:underline">
                      Forgot your password?
                    </a>
                  )}
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <Button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-white" disabled={loading}>
                {loading ? "Processing..." : (isLogin ? "Login" : "Sign Up")}
              </Button>

              <div className="text-center text-sm">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="underline underline-offset-4 cursor-pointer"
                >
                  {isLogin ? "Sign up" : "Login"}
                </button>
              </div>
            </div>
          </form>
          <div className="relative hidden bg-muted md:block">
            <img
              src={loginImage}
              alt="Login Background"
              className="absolute inset-0 h-full w-full object-contain p-12 dark:brightness-[0.2] dark:grayscale" />
          </div>
        </CardContent>
      </Card>
      <div
        className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        made with
        <img src={heart} alt="heart" style={{ width: "16px", height: "16px", verticalAlign: "middle", display: "inline-block", margin: "0 4px" }} />
        by
        <a href="https://github.com/ShanawazS-bit/" target="_blank" rel="noopener noreferrer"> Shanawaz Sharif</a>{" "}
      </div>
    </div>
  );
}
