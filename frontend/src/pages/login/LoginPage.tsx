import {Card, CardHeader, CardTitle, CardContent} from "@/components/ui/card";

import LoginForm from "@/components/LoginForm";

const LoginPage = () => {
  return (
    // Holy shit, this wont horizontally center for some reason. Its too late rn to think...
    <Card className="flex w-1/3 h-min justify-center">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
      </CardHeader>
      <CardContent>
        {/* TODO: Actually pass the parameters and shit here. */}
        <LoginForm />
      </CardContent>
    </Card>
  );
};

export default LoginPage;
