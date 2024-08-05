// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { formatPrice } from "@/lib/formatPrice";

// interface DataCardProps {
//   value: number;
//   label: string;
//   shouldFormat?: boolean;
// }

// const DataCard = ({ value, label, shouldFormat }: DataCardProps) => {
//   return (
//     <Card>
//       <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//         <CardTitle className="text-5m font-medium">{label}</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <div className="text-lg font-bold">
//           {shouldFormat ? formatPrice(value) : value}
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default DataCard;

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/lib/formatPrice";

interface DataCardProps {
  value: number;
  label: string;
  shouldFormat?: boolean;
}

const DataCard = ({ value, label, shouldFormat }: DataCardProps) => {
  return (
    <Card className="shadow-md rounded-lg">
      <CardHeader className="flex items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-medium">{label}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-lg font-bold">
          {shouldFormat ? formatPrice(value) : value}
        </div>
      </CardContent>
    </Card>
  );
};

export default DataCard;
