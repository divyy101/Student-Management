import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col relative"
      style={{
        backgroundImage:
          "url('https://5.imimg.com/data5/SELLER/Default/2023/10/355416168/RJ/TB/UX/3497104/responder-student-reporting-management-system-500x500.png')",
      }}
    >
      <div className="absolute inset-0 bg-black/50"></div>

      <nav className="relative z-10 flex justify-between items-center px-8 py-4 bg-white/90 shadow">
        <h1 className="text-2xl font-bold text-blue-600">
          Student Management
        </h1>

        <ul className="flex items-center gap-6">
          <li>
            <Link
              to="/login"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Login
            </Link>
          </li>

          <li>
            <Link
              to="/register"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Sign Up
            </Link>
          </li>
        </ul>
      </nav>

      <div className="relative z-10 flex-1 flex flex-col justify-center items-center text-white text-center px-4">
        <h2 className="text-5xl font-bold mb-4">
          Student Project Management System
        </h2>

        <p className="text-lg max-w-2xl">
          Manage student projects, collaborate with teachers, submit work,
          and track project progress from one place.
        </p>
      </div>

      <footer className="relative z-10 bg-black/70 text-white text-center py-4">
        <p>Email: yourmail@example.com</p>
        <p>Phone: +91 9555807076</p>
      </footer>
    </div>
  );
};

export default Home;