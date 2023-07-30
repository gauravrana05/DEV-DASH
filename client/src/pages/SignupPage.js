import Header from "../components/Header"
import Signup from "../components/Signup"

export default function SignupPage() {
  return (
    <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md px-9 py-3 rounded-lg space-y-8 w-96 shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px]">
        <Header
          heading="Signup to create an account"
          paragraph="Already have an account? "
          linkName="Login"
          linkUrl="/login"
        />
        <Signup />
      </div>
    </div>
  )
}
