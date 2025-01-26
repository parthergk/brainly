import React from "react";
import { Button } from "../ui/Button";
import { useForm, SubmitHandler } from "react-hook-form";

interface InputsAuth{
  username: string;
  password: string 
}


const SignIn = () => {
  const {register, handleSubmit, formState: {errors}} = useForm<InputsAuth>();

  const onSubmit:SubmitHandler<InputsAuth> = async(data)=>{
    const response = await fetch("http://localhost:3000/brain/signin", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        username: data.username,
        password: data.password
      })
    })
    
    const json = await response.json();
    console.log("json data", json);
  }

  const handleKeyDown = (e:React.KeyboardEvent)=>{
    if (e.key=="enter") {
      e.preventDefault()
    }
  }

  return (
    <div className="bg-[#2c2c2c] text-white w-screen h-screen flex justify-center items-center p-4">
      <div className=" bg-neutral-700/50 max-w-96 w-full rounded-sm p-4 border border-neutral-500">
        <h1 className=" text-2xl text-center font-semibold">Sign In</h1>
        <form onSubmit={handleSubmit(onSubmit)} onKeyDown={handleKeyDown}>
          <input
            {...register("username", { required: true })}
            type="text"
            placeholder="Username"
            className=" w-full placeholder:text-neutral-400 outline-0 border border-neutral-300 px-2 py-1 mt-5"
          />
          {errors.username && (
            <span className=" text-red-500 text-sm">
              This field is required
            </span>
          )}
          <input
            {...register("password", { required: true })}
            type="text"
            placeholder="Password"
            className=" w-full placeholder:text-neutral-400 outline-0 border border-neutral-300 px-2 py-1 mt-5"
          />
          {errors.password && (
            <span className=" text-red-500 text-sm">
              This field is required
            </span>
          )}
          <div className=" w-full text-end mt-5 flex justify-end items-center">
            <Button title="SignIn" type="secondary" size="md" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
