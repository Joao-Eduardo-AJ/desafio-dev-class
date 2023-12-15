"use client"

import * as Button from "@/components/button"
import { Input } from "@/components/input"
import { FormHandles } from "@unform/core"
import { Form } from "@unform/web"
import { useRef } from "react"
import * as yup from "yup"
import "@/forms/translationYup";
import Link from "next/link"
import { useAppContext } from "@/context"
import { IFormData } from "@/types"

export default function Home() {
  const formRef = useRef<FormHandles>(null);
  const { handleLogin } = useAppContext();

  const formValidationSchema: yup.ObjectSchema<IFormData> = yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().required().min(8)
  });

  function handleSubmit(data: IFormData) {
    formValidationSchema
      .validate(data, { abortEarly: false })
      .then(validatedData => {
        console.log(validatedData);
        if (validatedData instanceof Error) {
          console.log(Error);
        } else {
          handleLogin(validatedData)
        }
      })
      .catch((errors: yup.ValidationError) => {
        const validationErrors: {[key: string]: string} = {};
        errors.inner.forEach(error => {
          if (!error.path) return;

          validationErrors[error.path] = error.message;
        });

        formRef.current?.setErrors(validationErrors);
      });
  }


  return (
    <main className="flex justify-center items-center h-screen w-screen overflow-hidden">
      <section className="p-4 flex flex-col gap-4 items-center bg-neutral001 rounded-2xl">
        <p className="text-3xl">Login API Fipe</p>
        <Form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">  
            <Input name="email" label="email" placeholder="email" />
            <Input name="password" label="senha" placeholder="senha" />
          </div>
          <Button.Root type="submit">Login</Button.Root>
        </Form>
        <p className="text-neutral050">Não tem uma conta? <Link href="https://plataforma.apibrasil.com.br/auth/register" target="_blank" className="text-primaryDefault hover:translate-y-4">Cadastre-se!</Link></p>
      </section>
    </main>
  )
}
