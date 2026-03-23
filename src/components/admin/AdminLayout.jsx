import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";
import StatsCard from "./StatsCard";
import GeneratorCard from "./GeneratorCard";
import ResultsTable from "./ResultsTable";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-[#0f1c1f] text-white">
      
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 p-8">

        <AdminNavbar />

        {/* Stats Row */}
        <div className="grid grid-cols-4 gap-6 mt-8">
          <StatsCard title="Total Exams" value="1,284" />
          <StatsCard title="Active Students" value="45,200" />
          <StatsCard title="Avg Score" value="72.4%" />
          <StatsCard title="AI Questions" value="12,402" />
        </div>

        {/* Main Section */}
        <div className="grid grid-cols-2 gap-6 mt-8">
          <GeneratorCard />
          <ResultsTable />
        </div>

      </div>
    </div>
  );
}
