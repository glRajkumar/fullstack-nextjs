import Link from "next/link";
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

        <div className="dc gap-6">
          <button className="df py-2 bg-slate-200">
            <img className="w-6 h-6" src="./img/google.webp" alt="" />
            Google
          </button>

          <button className="df py-2 bg-slate-200">
            <img className="w-6 h-6" src="./img/github.png" alt="" />
            Github
          </button>
        </div>

        <div className="mt-6 text-sm text-center">
          Already have an account, <Link href="/login" className="text-blue-500 hover:text-blue-700">Log in</Link>
        </div>
      </div>
    </div>
  )
}

export default page