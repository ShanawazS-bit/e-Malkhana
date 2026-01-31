import { LoginForm } from "@/components/login-form"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
// LoginPage component handles the layout and rendering of the login screen.
// It centers the LoginForm on the screen with a muted background.
export default function LoginPage() {
    return (
        <div className="flex min-h-screen flex-col font-sans">
            <Header />
            <div className="flex flex-1 items-center justify-center p-6 md:p-10">
                <div className="w-full max-w-sm md:max-w-4xl">
                    <LoginForm />
                </div>
            </div>
            <Footer />
        </div>
    )
}
