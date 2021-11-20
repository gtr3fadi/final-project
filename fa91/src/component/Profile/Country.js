import { LayoutGroup, motion } from "framer-motion";

export function App() {
  return (
    <LayoutGroup>
      <Submenu />
      <Submenu />
    </LayoutGroup>
  );
}

function Submenu({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.ul layout style={{ height: isOpen ? "auto" : 40 }}>
      {children}
    </motion.ul>
  );
}
