import Image from 'next/image';
import SignUpForm from '@/components/auth/SignUpForm';
import AuthImage from '@/assets/images/auth_image.png';

export default function SignUp() {
  return (
    <div className="flex gap-12 justify-center">
      <Image className="w-1/3 object-cover" src={AuthImage} alt="Auth Image" />
      <div className="w-1/3 flex flex-col gap-5 justify-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold">Create an account</h1>
          <p className="font-medium">Enter your details below</p>
        </div>
        <SignUpForm />
      </div>
    </div>
  );
}
