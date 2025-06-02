import { LuTrendingUpDown } from "react-icons/lu";

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-3/5 p-6 md:p-12 flex flex-col justify-center">
        <h2 className="text-xl font-semibold text-black mb-6">Expense Tracker</h2>
        {children}
      </div>

      <div className="hidden md:flex w-2/5 h-screen bg-violet-50 bg-auth-bg-img bg-cover bg-no-repeat bg-center items-center justify-center p-6">
        <div className="max-w-xs w-full">
          <StatusInfoCard
            icon={<LuTrendingUpDown size={24} className="text-violet-500"/>}
            label="Track Your Income & Expenses"
            value="3100"
            color="bg-primary"
          />
          <img
            src="/first.png"
            alt="Income Illustration"
            className="w-full mt-8 shadow-lg shadow-blue-400/50 rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

const StatusInfoCard = ({ icon, label, value, color }) => {
  return (
    <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-md border border-gray-200">
      <div className={`w-12 h-12 flex items-center justify-center text-white text-xl ${color} rounded-full`}>
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-lg font-medium">₹{value}</p>
      </div>
    </div>
  );
};
