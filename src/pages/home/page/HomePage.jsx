import { DollarSign, Users, FileText, BarChart } from "lucide-react";

const data = [
  {
    title: "Total Sales",
    icon: <DollarSign size={32} />,
    value: "$5,230.50",
  },
  {
    title: "Customers",
    icon: <Users size={32} />,
    value: "120",
  },
  {
    title: "Invoices",
    icon: <FileText size={32} />,
    value: "32",
  },
  {
    title: "Revenue",
    icon: <BarChart size={32} />,
    value: "$12,450",
  },
];

const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
      {data.map((card, idx) => (
        <div
          key={idx}
          className="bg-[#1D2E5F] rounded-xl p-6 flex items-center gap-4 shadow-md"
        >
          <div className="text-blue-300">{card.icon}</div>
          <div>
            <div className="text-sm text-gray-300">{card.title}</div>
            <div className="text-xl font-semibold">{card.value}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
