import { redirect } from "next/navigation";

export default function ShopNewRedirect() {
  redirect("/items/new");
}
