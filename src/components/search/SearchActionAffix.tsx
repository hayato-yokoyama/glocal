"use client";

import { Affix, Button } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import Link from "next/link";

const SearchActionAffix = () => {
  return (
    <Affix position={{ bottom: 0 }} className="flex h-16 w-full items-center justify-center gap-x-4 bg-slate-200">
      <Button variant="filled" component={Link} href="/" leftSection={<IconSearch size={14} />}>
        条件を選び直す
      </Button>
    </Affix>
  );
};

export default SearchActionAffix;
