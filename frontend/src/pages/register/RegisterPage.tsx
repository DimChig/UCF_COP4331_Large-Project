import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import RegisterForm from "@/components/forms/RegisterForm";

const RegisterPage = () => {
  return (
    <div className="flex w-full h-full items-center justify-center">
      <Card className="w-3/4 md:max-lg:w-1/2 lg:w-1/3">
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
        </CardHeader>
        <CardContent>
          {/* And more stuff here... */}
          <RegisterForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPage;
