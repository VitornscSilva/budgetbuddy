import { Link } from "react-router-dom";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { useRegisterController } from "./useRegisterController";
import { EyeIcon } from "../../components/icons/EyeIcon";
export function Register() {
  const {
    errors,
    handleSubmit,
    register,
    isLoading,
    toggleValuesVisibility,
    showPassword
  } = useRegisterController();

  return (
    <>
      <header className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-2xl font-bold text-gray-900 tracking[-1px]">
          Create your account
        </h1>

        <p className="space-x-2">
          <span className="text-gray-700 tracking-[-0.5px]">
          Already have an account?
          </span>

          <Link
            to="/login"
            className="tracking-[-0.5px] font-medium text-purple-900"
          >
            Sign in
          </Link>
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="mt-[60px] flex flex-col gap-4"
      >
        <Input
          placeholder="Name"
          error={errors.name?.message}
          {...register('name')}
        />

        <Input
          type="email"
          placeholder="E-mail"
          error={errors.email?.message}
          {...register('email')}
        />

        <Input
          type={!showPassword ? "password" : "text"}
          placeholder="Password"
          error={errors.password?.message}
          icon={<button
            className="w-8 h-8 flex items-center justify-center"
            onClick={toggleValuesVisibility}
          >
            <EyeIcon open={!showPassword} color="black" />
          </button>}
          {...register('password')}
        />

        <Button type="submit" className="mt-2" isLoading={isLoading}>
          Create account
        </Button>
      </form>
    </>
  );
}
