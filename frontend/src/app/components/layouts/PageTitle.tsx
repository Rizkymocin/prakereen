
export default function PageTitle ({ title, subTitle }: { title: string, subTitle: string }) {
   return (
      <div className="flex flex-col mb-6 space-y-1">
         <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            {title}
         </h1>
         <p className="text-slate-600">{subTitle}</p>
      </div>
   )
}
