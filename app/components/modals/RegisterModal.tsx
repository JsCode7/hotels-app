"use client"

import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useRegisterModal from "@hooks/useRegisterModal";
import Modal from "./Modal";
import Heading from "@components/Heading";
import Input from "@components/inputs/Input";
import { toast } from "react-hot-toast";
import Button from "@components/Button";
import { signIn } from "next-auth/react";

const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const [isLoading, setIsLoading] = useState(false);
    const {
        register, 
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios.post("/api/register", data)
            .then(() => {
                registerModal.onClose();
            })
            .catch((error) => {
                toast.error('Algo salió mal')
            })
            .finally(() => {
                setIsLoading(false);
            })     
    }

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading 
            title="Bienvenido a Hotels App"
            subtitle="Crea una cuenta" />
            <Input
            id="email"
            label="Email"
            disabled={isLoading}
            register={register} 
            errors={errors}
            required/>
            <Input
            id="name"
            label="Nombre"
            disabled={isLoading}
            register={register} 
            errors={errors}
            required/>
            <Input
            id="password"
            type="password"
            label="Contraseña"
            disabled={isLoading}
            register={register} 
            errors={errors}
            required/>
        </div>
    );

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr />
            <Button
            outline
            icon={FcGoogle}
            label="Continuar con Google"
            onClick={() => signIn("google")}
            />
            <Button
            outline
            icon={AiFillGithub}
            label="Continuar con Github"
            onClick={() => signIn("github")}
            />
            <div className="text-neutral-500
            text-center
            mt-4
            font-light">
                <div className="justify-center flex flex-row items-center gap-2">
                    <div>¿Ya tienes una cuenta?</div>
                    <div
                    onClick={registerModal.onClose}
                    className="
                    text-neutral-800
                    cursor-pointer
                    hover:underline">
                        Inicia sesión
                    </div>
                </div>
            </div>
        </div>
    )

    return ( 
        <Modal 
        disabled={isLoading}
        isOpen={registerModal.isOpen}
        title="Registro"
        actionLabel="Continuar"
        onClose={registerModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
        />
     );
}
 
export default RegisterModal;