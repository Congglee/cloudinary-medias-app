"use client";

import { SearchResult } from "@/app/gallery/page";
import { ReactNode } from "react";
import { motion } from "framer-motion";

const MAX_COLUMNS = 4;

export function ImageGrid({
  images,
  getImage,
}: {
  images: SearchResult[];
  getImage: (imageData: SearchResult) => ReactNode;
}) {
  function getColumns(colIndex: number) {
    return images.filter((resource, idx) => idx % MAX_COLUMNS === colIndex);
  }

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <div className="grid gap-4 grid-cols-1 xs:grid-cols-2 lg:grid-cols-4">
      {[getColumns(0), getColumns(1), getColumns(2), getColumns(3)].map(
        (column, idx) => (
          <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: idx * 0.25, ease: "easeInOut", duration: 0.5 }}
            viewport={{ amount: 0 }}
            key={idx}
            className="flex flex-col gap-4"
          >
            {column.map(getImage)}
          </motion.div>
        )
      )}
    </div>
  );
}
