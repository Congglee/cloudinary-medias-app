"use client";

import GalleryGrid from "@/app/gallery/gallery-grid";
import { SearchResult } from "@/app/gallery/page";
import { usePagination } from "@/hooks/usePagination";
import Image from "next/image";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export function LoadMore({ images }: { images: SearchResult[] }) {
  const { data, page, totalPages, setPage, nextPage } = usePagination(
    images,
    10
  );
  const { inView, ref } = useInView();

  useEffect(() => {
    if (inView) {
      nextPage();
    }
  }, [inView]);

  return (
    <>
      <GalleryGrid images={data} />
      <section className="flex justify-center items-center w-full">
        <div ref={ref}>
          {page + 1 < totalPages && (
            <Image
              src="./spinner.svg"
              alt="spinner"
              width={56}
              height={56}
              className="object-contain"
            />
          )}
        </div>
      </section>
    </>
  );
}
