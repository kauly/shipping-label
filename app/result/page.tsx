import { SearchParams } from "nuqs/server";

import { title } from "@/components/primitives";
import { ResultOptions } from "@/components/result/result-options";

type PageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function ResultPage(props: PageProps) {
  const searchParams = await props.searchParams;

  return (
    <section className="flex flex-col items-center justify-center gap-16 py-8 md:py-10">
      <p className={title({ size: "lg" })}>Your shipping label is ready</p>
      <ResultOptions label={searchParams.label as string} />
    </section>
  );
}
