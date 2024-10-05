import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

import CardWrapper from "@/components/auth/card-wrapper";

export default function AuthErrorPage() {
  return (
    <CardWrapper
      headerLabel="Oops something went wrong"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
    >
      <div className="w-full items-center justify-center flex">
        <ExclamationTriangleIcon className="text-destructive" />
      </div>
    </CardWrapper>
  );
}
