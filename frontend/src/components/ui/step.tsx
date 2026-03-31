import { cn } from "@/services";

interface StepProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

const Step = ({ icon, title, description, className }: StepProps) => {
  return (
    <div className={cn("flex flex-col items-center text-center", className)}>
      <div className="bg-blue-50 p-4 rounded-full mb-4">
        {icon}
      </div>
      <h3 className="font-bold text-slate-800 mb-2">{title}</h3>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );
};

export { Step };
