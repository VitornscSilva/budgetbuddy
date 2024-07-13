import { Link } from "react-router-dom";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { useLoginController } from "./useLoginController";
import { EyeIcon } from "../../components/icons/EyeIcon";

export function Login() {
  const {
    handleSubmit,
    register,
    errors,
    isLoading,
    toggleValuesVisibility,
    showPassword
  } = useLoginController();

  return (
    <>
      <header className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-2xl font-bold text-gray-900 tracking[-1px]">
          Sign in to your account
        </h1>

        <p className="space-x-2">
          <span className="text-gray-700 tracking-[-0.5px]">
            New here?
          </span>

          <Link
            to="/register"
            className="tracking-[-0.5px] font-medium text-purple-900"
          >
            Create an account
          </Link>
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="mt-[60px] flex flex-col gap-4"
      >
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
          Sign In
        </Button>
      </form>
    </>
  );
}
