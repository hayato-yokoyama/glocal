"use client";

import { Button, Collapse, Loader } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Suspense } from "react";

type SearchCardDetailProps = {
  children: React.ReactNode;
};

const SearchCardDetail = ({ children }: SearchCardDetailProps) => {
  const [opened, { open }] = useDisclosure(false);

  return (
    <div>
      {!opened && (
        <div className="text-center">
          <Button variant="transparent" onClick={open}>
            もっと見る
          </Button>
        </div>
      )}
      <Collapse in={opened}>
        <Suspense
          fallback={
            <div className="text-center">
              <Loader size="sm" />
            </div>
          }
        >
          {children}
        </Suspense>
      </Collapse>
    </div>
  );
};

export default SearchCardDetail;
