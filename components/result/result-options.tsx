"use client";

import { Button } from "@heroui/button";
import { Link } from "@heroui/link";

import { siteConfig } from "@/config/site";

export function ResultOptions({ label }: { label: string }) {
  return (
    <div className="flex gap-4">
      <Button as={Link} color="secondary" href={siteConfig.routes.generate}>
        Generate another
      </Button>
      <Button isExternal as={Link} color="success" href={label}>
        Download label
      </Button>
    </div>
  );
}
