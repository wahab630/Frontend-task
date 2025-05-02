import { useAuth } from "../context/ContextApi";

const Home = () => {

  const { user, logout } = useAuth();

  if (!user) {
    return <div className="text-center text-red-500">User not logged in!</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#50F89A] to-[#28F490]">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <img src={user.image} alt="User"
          className="w-32 h-32 rounded-full mx-auto mb-6 object-cover"
        />
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">Welcome, {user.firstName}!</h1>
        <p className="text-lg text-gray-600 mb-6">We're so glad you're here. Explore your dashboard and enjoy your experience!</p>
        <div>
          <button onClick={logout} className="primary-button">Sign Out</button>
        </div>
      </div>
    </div>
  );
};

export default Home;