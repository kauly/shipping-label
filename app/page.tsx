import { Button } from "@heroui/button";
import { SparkleIcon } from "@phosphor-icons/react/dist/ssr";
import { Link } from "@heroui/link";

import { siteConfig } from "@/config/site";
import { title } from "@/components/primitives";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <span className={title()}>Generate yours USPS &nbsp;</span>
        <span className={title({ color: "violet" })}>shipping label&nbsp;</span>
        <span className={title()}>with ease.</span>
      </div>
      <div className="flex pt-4">
        <Button
          as={Link}
          className="bg-linear-to-tr from-violet-500 to-yellow-500 text-white shadow-lg"
          endContent={<SparkleIcon size={32} />}
          href={siteConfig.routes.generate}
          size="lg"
        >
          Generate
        </Button>
      </div>
    </section>
  );
}
