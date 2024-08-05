import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Rocket, TriangleAlert } from "lucide-react";

interface AlertBannerProps {
  isCompleted: boolean;
  requiredFieldsCount: number;
  missingFieldsCount: number;
}

const AlertBanner = ({
  isCompleted,
  requiredFieldsCount,
  missingFieldsCount,
}: AlertBannerProps) => {
  return (
    <Alert
      className="my-4 flex items-start space-x-3"
      variant={isCompleted ? "complete" : "destructive"}
    >
      <div className="flex-shrink-0">
        {isCompleted ? (
          <Rocket className="h-5 w-5 text-green-500" />
        ) : (
          <TriangleAlert className="h-5 w-5 text-red-500" />
        )}
      </div>
      <div className="flex-1">
        <AlertTitle className="text-sm font-semibold text-gray-900">
          {missingFieldsCount} missing field(s) / {requiredFieldsCount} required
          fields
        </AlertTitle>
        <AlertDescription className="text-xs text-gray-700 mt-1">
          {isCompleted
            ? "Great job! Ready to publish"
            : "You can only publish when all the required fields are completed"}
        </AlertDescription>
      </div>
    </Alert>
  );
};

export default AlertBanner;
