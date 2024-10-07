"use client";

import { admin } from "@/actions/admin";
import RoleGate from "@/components/auth/role-gate";
import FormSuccess from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useCurrentRole } from "@/hooks/use-current-role";
import { currentRole } from "@/lib/auth";
import { UserRole } from "@prisma/client";
import { toast } from "sonner";

export default function AdminPage() {
  const onServerActionClick = async () => {
    const data = await admin();

    if (data.error) {
      toast.error(data.error);
    }

    if (data.success) {
      toast.success(data.success);
    }
  };

  const onAPIRouteClick = async () => {
    const response = await fetch("/api/admin");

    if (response.ok) {
      toast.success("Allowed API route");
    } else {
      toast.error("Forbidden API route");
    }
  };
  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">🗿 Admin</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <RoleGate allowedRole={UserRole.ADMIN}>
          <FormSuccess message="You are allowed to see this content" />
        </RoleGate>
        <div className="flex flex-row items-center justify-between rounded-lg shadow-md p-3">
          <p className="text-sm font-medium">Admin-only API route</p>
          <Button onClick={onAPIRouteClick}>Click to test</Button>
        </div>

        <div className="flex flex-row items-center justify-between rounded-lg shadow-md p-3">
          <p className="text-sm font-medium">Admin-only API Server Action </p>
          <Button onClick={onServerActionClick}>Click to test</Button>
        </div>
      </CardContent>
    </Card>
  );
}
