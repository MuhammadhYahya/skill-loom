// "use client";

// import {
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
// } from "recharts";
// import { Card } from "@/components/ui/card";

// const Chart = ({ data }: { data: { name: string; total: number }[] }) => {
//   return (
//     <Card>
//       <ResponsiveContainer width="100%" height={400}>
//         <BarChart data={data}>
//           <XAxis
//             dataKey="name"
//             stroke="888888"
//             fontSize={12}
//             axisLine={false}
//             tickLine={false}
//           />
//           <YAxis
//             stroke="888888"
//             fontSize={12}
//             axisLine={false}
//             tickLine={false}
//             tickFormatter={(value) => `$${value}`}
//           />
//           <Tooltip />
//           <Bar dataKey="total" fill="#8884d8" radius={[4, 4, 0, 0]} />
//         </BarChart>
//       </ResponsiveContainer>
//     </Card>
//   );
// };

// export default Chart;

"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { Card } from "@/components/ui/card";

const Chart = ({ data }: { data: { name: string; total: number }[] }) => {
  return (
    <Card className="p-4 bg-white shadow-lg rounded-lg">
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <XAxis
            dataKey="name"
            stroke="#888888"
            fontSize={14}
            axisLine={{ stroke: "#888888" }}
            tickLine={{ stroke: "#888888" }}
            tick={{ fill: "#888888" }}
          />
          <YAxis
            stroke="#888888"
            fontSize={14}
            axisLine={{ stroke: "#888888" }}
            tickLine={{ stroke: "#888888" }}
            tick={{ fill: "#888888" }}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip
            contentStyle={{ backgroundColor: "#f5f5f5", borderColor: "#ddd" }}
            labelStyle={{ color: "#333" }}
          />
          <Bar dataKey="total" fill="#8884d8" radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default Chart;
