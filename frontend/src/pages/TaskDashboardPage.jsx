import NewTaskForm from "../components/task/NewTaskForm";
import TaskList from "../components/task/TaskList";
import UserMenu from "../components/common/UserMenu";

export default function TaskDashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-primary">Task Manager</h1>
          <UserMenu />
        </div>
        <div className="space-y-8">
          <NewTaskForm />
          <TaskList />
        </div>
      </div>
    </div>
  );
}
