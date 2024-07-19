import * as Menubar from '@radix-ui/react-menubar';
import { Flex } from '@radix-ui/themes';

const Filtro = () => {
  return (
    <Flex direction={'row'} justify={'end'} ml={'9'}>
      <Menubar.Root className="relative top-5 z-[1] flex h-0 ">
        <Menubar.Menu>
          <Menubar.Trigger className="py-5 px-7 border bg-white  outline-none select-none font-medium leading-none rounded text-slate-900 text-[13px] flex items-center justify-between gap-[2px] data-[highlighted]:bg-violet4 data-[state=open]:bg-violet4">
            Filtrar
          </Menubar.Trigger>
          <Menubar.Portal>
            <Menubar.Content
              className="min-w-[220px] top-3 bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] [animation-duration:_400ms] [animation-timing-function:_cubic-bezier(0.16,_1,_0.3,_1)] will-change-[transform,opacity]"
              align="start"
              sideOffset={5}
              alignOffset={-3}
            >
              <Menubar.Item className="group text-[13px] leading-none text-black rounded flex items-center h-[25px] px-[10px] relative select-none outline-none data-[state=open]:bg-violet4 data-[state=open]:text-slate data-[highlighted]:bg-gradient-to-br data-[highlighted]:from-slate cursor-pointer">
                ID{' '}
                <div className="ml-auto pl-5 text-mauve9 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8">
                </div>
              </Menubar.Item>
              <Menubar.Separator className="h-[1px] bg-violet6 m-[5px]" />
              <Menubar.Item className="group text-[13px] leading-none text-violet11 rounded flex items-center h-[25px] px-[10px] relative select-none outline-none data-[state=open]:bg-violet4 data-[state=open]:text-violet11 data-[highlighted]:bg-gradient-to-br data-[highlighted]:from-violet9 data-[highlighted]:to-violet10 data-[highlighted]:text-violet1 data-[highlighted]:data-[state=open]:text-violet1 data-[disabled]:text-mauve8 cursor-pointer">
                Apellido y Nombre{' '}
                <div className="ml-auto pl-5 text-mauve9 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8">
                </div>
              </Menubar.Item>  
              <Menubar.Separator className="h-[1px] bg-violet6 m-[5px]" />
              <Menubar.Item className="group text-[13px] leading-none text-violet11 rounded flex items-center h-[25px] px-[10px] relative select-none outline-none data-[state=open]:bg-violet4 data-[state=open]:text-violet11 data-[highlighted]:bg-gradient-to-br data-[highlighted]:from-violet9 data-[highlighted]:to-violet10 data-[highlighted]:text-violet1 data-[highlighted]:data-[state=open]:text-violet1 data-[disabled]:text-mauve8 cursor-pointer">
                Fecha de Nacimiento{' '}
                <div className="ml-auto pl-5 text-mauve9 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8">
                </div>
              </Menubar.Item>                      
            </Menubar.Content>
          </Menubar.Portal>
        </Menubar.Menu>
      </Menubar.Root>
    </Flex>
  )
}

export default Filtro;