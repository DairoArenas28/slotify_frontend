import { User } from "@/src/schemas";
import React from "react";

interface AuthRoleProps {
    user: User
    children: React.ReactNode
}

export default function AuthRole({user, children} : AuthRoleProps) {
    console.log(user)
    return user.role === "admin" ? <>{children}</> : null
    
}