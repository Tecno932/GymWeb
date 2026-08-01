"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema, LoginSchema } from "@/lib/validators/login.schema";

import { login } from "@/services/auth";

import { useAuth } from "@/providers/auth-provider";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import { Alert, AlertDescription } from "@/components/ui/alert";



export function LoginForm() {

  const router = useRouter();

  const { login: saveToken } = useAuth();

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");



  const {
    register,
    handleSubmit,
    formState: {
      errors,
    },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });




  async function onSubmit(
    data: LoginSchema,
  ) {

    try {

      setLoading(true);

      setError("");

      const response =
        await login(data);

      saveToken(
        response.accessToken,
      );

      router.replace("/dashboard");

    } catch (err: any) {

      setError(

        err.response?.data?.message ??

        "Correo o contraseña incorrectos"

      );

    } finally {

      setLoading(false);

    }

  }




  return (

    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >

      {error && (

        <Alert variant="destructive">

          <AlertDescription>

            {error}

          </AlertDescription>

        </Alert>

      )}



      <div className="space-y-2">

        <Label>

          Correo

        </Label>

        <Input

          type="email"

          placeholder="correo@empresa.com"

          {...register("email")}

        />

        {errors.email && (

          <p className="text-sm text-red-500">

            {errors.email.message}

          </p>

        )}

      </div>




      <div className="space-y-2">

        <Label>

          Contraseña

        </Label>

        <Input

          type="password"

          placeholder="********"

          {...register("password")}

        />

        {errors.password && (

          <p className="text-sm text-red-500">

            {errors.password.message}

          </p>

        )}

      </div>




      <Button

        type="submit"

        className="w-full"

        disabled={loading}

      >

        {

          loading

            ? "Ingresando..."

            : "Iniciar sesión"

        }

      </Button>

    </form>

  );

}