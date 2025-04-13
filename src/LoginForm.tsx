import { useForm } from 'react-hook-form';

import { motion } from 'framer-motion';

type Inputs = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit = (data: Inputs) => {
    console.log(data);
  };

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 p-4 bg-white shadow rounded"
    >
      <input
        {...register('email')}
        placeholder="Email"
        className="border p-2 w-full"
      />
      <input
        {...register('password')}
        placeholder="Password"
        className="border p-2 w-full"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Login
      </button>
    </motion.form>
  );
}
