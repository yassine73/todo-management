import { ChakraProvider } from "@chakra-ui/react";
import Header from "./components/header";
import Todos from "./components/Todos";
import UpdateModal from "./components/Modals/UpdateModal";

function App() {
  return (
    <>
      <ChakraProvider>
        <Header />
        <Todos />
      </ChakraProvider>
    </>
  );
}

export default App;
