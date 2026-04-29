import { randomBytes } from "node:crypto";

function secret(bytes = 32) {
  return randomBytes(bytes).toString("base64url");
}

console.log("POSTGRES_PASSWORD=" + secret(24));
console.log("SESSION_SECRET=" + secret(48));
console.log("ADMIN_PASSWORD=" + secret(24));
