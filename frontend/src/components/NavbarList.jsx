import { ArrowLeftIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Box, Text, TextField, Flex } from '@radix-ui/themes';
import Filtro from "./Filtro.jsx"

const NavbarList = () => {
  return (
    <div>
      <Flex gap="3">
        <Box width="64px" height="64px"></Box>
          
        <Box width="404px" height="48px" className="pl-44">
          <Flex align="start" direction="row" gap="1" className="pt-2">
            <Flex asChild gap="2">
              <Text >
                <ArrowLeftIcon className="mt-1" />  
                Listado de pacientes
              </Text>

            </Flex>
          </Flex>
        </Box>
        <Box width="854px" height="48px" className="pl-10 pt-2">
          <Box width="678px" className="pb-4 pl-56">
            <TextField.Root placeholder="Buscar pacientes" width="50">
              <TextField.Slot>
                <MagnifyingGlassIcon height="16" width="16" />
              </TextField.Slot>
            </TextField.Root>
          </Box>
        </Box>
        <Filtro/>
      </Flex>
    </div>
  );
};

export default NavbarList;