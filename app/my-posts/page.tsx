import MyPosts from "@/comp/Posts/MyPosts";

const data = [
  {
    id: "1",
    image: "./img/google.webp",
    name: "Raj kumar",
    title: "First post",
    comments: [],
  }
]

function Dashboard() {
  return (
    <main className="p-8">
      <h1 className="mb-8 text-2xl font-bold">Welcome back Raj</h1>
      <MyPosts data={data} />
    </main>
  )
}

export default Dashboard