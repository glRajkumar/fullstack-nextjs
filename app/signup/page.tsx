import Link from "next/link";

import AuthProvider from "@/comp/Auth/AuthProviderBtns";
import Form from "./Form";

function page() {
  return (
    <div className="dc min-h-screen bg-slate-100">
      <div className="md:w-96 p-6 rounded-2xl bg-white shadow-xl">
        <h1 className="mb-4 text-2xl font-medium text-center">
          Create account
        </h1>

        <Form />

        <div className="or-dash mb-6 text-sm text-center text-gray-500 relative">
          Or
        </div>

        <AuthProvider />

        <div className="mt-6 text-sm text-center">
          Already have an account, <Link href="/login" className="text-blue-500 hover:text-blue-700">Log in</Link>
        </div>
      </div>
    </div>
  )
}

export default page