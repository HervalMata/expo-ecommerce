import { SignIn } from "@clerk/clerk-react";

function LoginPage() {
    return (
        <div>
            <div className="h-screen hero">
                <SignIn />
            </div>
        </div>
    );
}

export default LoginPage;