import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import LoginForm from "@/components/forms/LoginForm";

const LoginPage = () => {
  return (
    <div className="flex w-full h-full items-center justify-center p-4">
      <Card className="flex w-sm">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
