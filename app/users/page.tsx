import { prisma } from "@/lib/prisma";
import Link from "next/link";
import * as React from "react";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const LetsSee = async () => {
  await wait(10000);
  return <div>Did this work?</div>;
};

const UsersPage = async () => {
  const users = await prisma.user.findMany();
  console.log({ users });
  return (
    <div className="text-blue-300 text-xl bg-slate-600 text-center rounded-lg h-16 mt-3">
      <h1>Users Page</h1>
      <Link href={"/"}>Home</Link>
      {users.map((user) => (
        <div key={user.id}>
          <p>
            Name: {user.firstName} {user.lastName}
          </p>
          <p>Email: {user.email}</p>
        </div>
      ))}
      <React.Suspense fallback={<div>Loading...</div>}>
        <LetsSee />
      </React.Suspense>
    </div>
  );
};

export default UsersPage;
