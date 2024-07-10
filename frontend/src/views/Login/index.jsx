import {
    Container,
    Card,
    Flex,
    Text,
    Button,
    Strong,
    Separator,
  } from "@radix-ui/themes";
  import Logo from "../../assets/CHEALTH.png";
  import "../../css/login.css";
  import { FcGoogle } from "react-icons/fc";
  
  const Login = () => {
    return (
      <div className="flex h-screen">
        <div className="w-1/5 bg-[#ade8f4] flex items-center justify-center sidebar">
          <img 
            src={Logo} 
            className="max-w-full max-h-full" 
            style={{ maxWidth: '12rem', maxHeight: '12rem' }} 
          />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <Container size="2" className="login-container">
            <Flex direction="column" gap="2" className="max-w-md mx-auto">
              <Card className="py-8 px-10 shadow-lg rounded-lg">
                <form>
                  <Flex direction="column" gap="6" className="py-8 px-10">
                    <div>
                      <Text as="p" size="2" className="mb-1">
                        <Strong>Email:</Strong>
                      </Text>
                      <input
                        type="text"
                        name="email"
                        placeholder="Ingrese su email"
                        className="w-full px-4 py-2 border border-[#57ced4] rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <Text as="p" size="2" className="mb-1">
                        <Strong>Contraseña:</Strong>
                      </Text>
                      <input
                        type="password"
                        name="password"
                        placeholder="Ingrese su contraseña"
                        className="w-full px-4 py-2 border border-[#57ced4] rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <Button className="mt-4 w-full bg-indigo-600 text-white py-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      Ingresar
                    </Button>
                    <div className="flex items-center my-4">
                      <Separator orientation="horizontal" size="4" />
                      <span className="mx-2 text-gray-500">O</span>
                      <Separator orientation="horizontal" size="4" />
                    </div>
                    <Button className="mt-4 w-full bg-white text-blue-500 border border-blue-500 py-4 rounded-md outline-none ring-2 ring-offset-2">
                      <FcGoogle /> Ingresar con Google
                    </Button>
                  </Flex>
                </form>
              </Card>
            </Flex>
          </Container>
        </div>
      </div>
    );
  };
  
  export default Login;
  