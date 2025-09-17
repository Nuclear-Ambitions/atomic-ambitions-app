// Benefit Item Component
export default function BenefitItem({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start space-x-3">
      <div className="w-3 h-3 bg-primary rounded-full mt-2 flex-shrink-0"></div>
      <div>
        <h4 className="font-semibold text-secondary">{title}</h4>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
