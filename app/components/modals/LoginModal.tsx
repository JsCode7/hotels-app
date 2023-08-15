"use client"

import { signIn } from "next-auth/react";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useRegisterModal from "@hooks/useRegisterModal";
import useLoginModal from "@hooks/useLoginModal";
import Modal from "./Modal";
import Heading from "@components/Heading";
import Input from "@components/inputs/Input";
import { toast } from "react-hot-toast";
import Button from "@components/Button";
import { useRouter } from "next/navigation";

const LoginModal = () => {
    const router = useRouter();
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);
    const {
        register, 
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            email: "",
            password: "",
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        signIn("credentials", {
            ...data,
            redirect: false,
        })    
        .then((callback) => {
            setIsLoading(false);

            if(callback?.ok){
                toast.success("Inicio de sesión exitoso");
                router.refresh();
                loginModal.onClose();
            }
            if (callback?.error) 
            {
                toast.error(callback.error);
            }
        })
    }

     const toggle = useCallback(() => {
        loginModal.onClose();
        registerModal.onOpen();
    }, [loginModal, registerModal])

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading 
            title="Bienvenido a Hotels App"
            subtitle="Ingresa a tu cuenta" />
            <Input
            id="email"
            label="Email"
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
                    <div>¿No tienes una cuenta?</div>
                    <div
                    onClick={toggle}
                    className="
                    text-neutral-800
                    cursor-pointer
                    hover:underline">
                        Regístrate
                    </div>
                </div>
            </div>
        </div>
    )

    return ( 
        <Modal 
        disabled={isLoading}
        isOpen={loginModal.isOpen}
        title="Iniciar sesión"
        actionLabel="Continuar"
        onClose={loginModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
        />
     );
}
 
export default LoginModal;