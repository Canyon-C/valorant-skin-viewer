import { cn } from "@/lib/utils";
import { SearchAni } from "./searchAnimation";
import { FilterIcon } from "./filter-icon";
import { LevelIcon } from "./levels-icon";
import { ChromaIcon } from "./chroma-icon";
import { Poppins } from "next/font/google";

const poppins = Poppins({weight: ['400', '700'], subsets: ["latin"]})

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto py-5 w-5/6 sm:w-full",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-black border borderAccent justify-between flex flex-col space-y-4",
        className
      )}
    >
      {header}
      <div className="group-hover/bento:translate-x-2 transition duration-200">
        {icon}
        <div className={`${poppins.className} font-bold  text-white dark:text-neutral-200 mb-2 mt-2`}>
          {title}
        </div>
        <div className={`${poppins.className} font-sans font-normal textAccent text-xs dark:text-neutral-300`}>
          {description}
        </div>
      </div>
    </div>
  );
};





export function BentoGridSecondDemo() {
  return (
    <BentoGrid className="max-w-4xl mx-auto md:auto-rows-[16rem]">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          className={item.className}
        />
      ))}
    </BentoGrid>
  );
}
const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl dark:bg-dot-white/[0.2] bg-dot-black/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]  border border-transparent dark:border-white/[0.2] bg-neutral-100 dark:bg-black"></div>
);
const items = [
  {
    title: 'Search Functionality',
    description: "Quickly find your desired Valorant skins with our powerful search tool.",
    header: <SearchAni></SearchAni>,
    className: "md:col-span-2",
  },
  {
    title: "Filter System",
    description: "Easily narrow down skins by weapon type using our filter system.",
    header: <FilterIcon></FilterIcon>,
    className: "md:col-span-1",
  },
  {
    title: "Skin Animation Levels",
    description: "Experience the evolution of skins with each dynamic animation level.",
    header: <LevelIcon></LevelIcon>,
    className: "md:col-span-1",
  },
  {
    title: "Skin Chromas",
    description:
      "View skins with a variety of vibrant chromas.",
    header: <ChromaIcon></ChromaIcon>,
    className: "md:col-span-2",
  },
];


