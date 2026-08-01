import { Card } from "@/components/ui/card";
import { LoginForm } from "./login-form";

export function LoginCard() {
  return (
    <Card className="w-full max-w-md p-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">
          Gym System
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Iniciar sesión
        </p>
      </div>

      <LoginForm />
    </Card>
  );
}