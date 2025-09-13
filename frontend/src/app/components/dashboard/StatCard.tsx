// Komponen Kartu Statistik
interface StatCardProps {
  title: string;
  value: number;
  icon: React.ElementType;
  themeColor?: string;
  subtitle: string;
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function StatCard({ 
      title, 
      value, 
      icon: Icon, 
      themeColor,
      subtitle 
   }: StatCardProps) {
      
   return (
      <Card className="group hover:shadow-lg transition-all duration-200 border-0 bg-gradient-to-br from-white to-gray-50/50">
         <CardHeader className="flex flex-row items-center justify-between pb-0">
         <div>
            <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
         </div>
         <div className="p-1 rounded-xl group-hover:scale-110 transition-transform duration-200">
            <Icon className={`h-5 w-5 ${themeColor ? themeColor : "text-sky-600"}`} />
         </div>
         </CardHeader>
         <CardContent className="pt-0">
         <div className={`text-3xl font-bold ${themeColor}`}>{value}</div>
         <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
         </CardContent>
      </Card>
   );
}