import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/clerk-react"

function App() {

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <SignedOut>
        <SignInButton />
      </SignedOut>

      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  )
}

export default App
