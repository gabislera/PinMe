export const SignIn = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div>
                <h1>Log in to your account</h1>
                <p>Welcome back! Please enter your details.</p>
                <form className="flex flex-col gap-4">
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <button type="submit">Log in</button>
                </form>
            </div>
        </div>
    )
}