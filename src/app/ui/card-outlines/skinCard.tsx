import { motion } from "framer-motion";

type SkinCardProps = {
  children: React.ReactNode;
};

export const SkinCard: React.FC<SkinCardProps> = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      className="w-80 h-72 sm:w-96 rounded-3xl border-2 borderAccent py-5 hover:cursor-pointer"
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2 },
      }}
    >
      {children}
    </motion.div>
  );
};
