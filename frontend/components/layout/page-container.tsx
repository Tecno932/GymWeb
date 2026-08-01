interface Props {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function PageContainer({
  title,
  description,
  children,
}: Props) {
  return (
    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold">
          {title}
        </h1>

        {description && (
          <p className="mt-1 text-muted-foreground">
            {description}
          </p>
        )}

      </div>

      {children}

    </div>
  );
}