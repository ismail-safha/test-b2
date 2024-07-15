import Link from "next/link";
import { authOptions } from "../lib/auth";
import { getServerSession } from "next-auth";
import HomePages from "./components/HomePages";
import GetStarted from "./components/GetStarted";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return <>{session ? <HomePages /> : <GetStarted />}</>;
}
