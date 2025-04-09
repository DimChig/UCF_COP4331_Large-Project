import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import LoginForm from "@/components/forms/LoginForm";

const LoginPage = () => {
  return (
    <div className="flex w-full h-full items-center justify-center">
      <Card className="flex w-3/4 md:max-lg:w-1/2 lg:w-1/3">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
        </CardHeader>
        <CardContent>
          {/* TODO: Actually pass the parameters and shit here. */}
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
