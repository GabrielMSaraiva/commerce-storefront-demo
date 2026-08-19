import { HomePage } from "@/components/home";

type HomeProps = {
  searchParams: Promise<{ busca?: string | string[] }>;
};

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const searchQuery = Array.isArray(params.busca)
    ? (params.busca[0] ?? "")
    : (params.busca ?? "");

  return <HomePage searchQuery={searchQuery} />;
}
