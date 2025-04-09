import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import RegisterForm from "@/components/forms/RegisterForm";

const RegisterPage = () => {
  return (
    <div className="flex w-full h-full items-center justify-center p-4">
      <Card className="w-sm">
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
