import { SignIn } from '@clerk/clerk-react'

const Signinpage = () => {
  return (
    <main className="flex min-h-max">
      {/* Left side with image */}
      <div className="hidden md:flex w-1/2">
        <img
          src="/assets/SignIn.jpg"
          alt="Login Illustration"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right side with Clerk form */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-orange-100">
        <SignIn 
          appearance={{
            elements: {
              formButtonPrimary: "bg-orange-500 hover:bg-orange-600 text-white", 
            },
          }}
        />
      </div>
    </main>
  )
}

export default Signinpage
