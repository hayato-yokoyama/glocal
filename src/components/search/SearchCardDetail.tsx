"use client";

import SearchCardDetailContent from "@/components/search/SearchCardDetailContent";
import { Button, Collapse, Loader } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Suspense } from "react";

type SearchCardDetailProps = {
  placeId: string;
};

const SearchCardDetail = ({ placeId }: SearchCardDetailProps) => {
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
        {opened && (
          <Suspense
            fallback={
              <div className="text-center">
                <Loader size="sm" />
              </div>
            }
          >
            {/* @ts-expect-error Server Component */}
            <SearchCardDetailContent placeId={placeId} />
          </Suspense>
        )}
      </Collapse>
    </div>
  );
};

export default SearchCardDetail;
