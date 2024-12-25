import { Button, ChakraProvider, defaultSystem } from '@chakra-ui/react'

const PopupApp = () => {
  return (
    <ChakraProvider value={defaultSystem}>
      <Button>Clique aqui</Button>
    </ChakraProvider>
  )
}

export default PopupApp