import {
  Box,
  Flex,
  Heading,
  IconButton,
  VStack,
  Text,
  Divider,
} from "@chakra-ui/react";
import { GrClose } from "react-icons/gr";
import { useDataProvider } from "../components/data-provider";
import {
  calculateOrderSubtotal,
  calculateOrderText,
  calculateOrderTotal,
} from "../utils/calculations";
import { BottomButton } from "../components/buttom-button";
import { useNavigate } from "react-router-dom";

export const Cart = () => {
  const navigate = useNavigate();
  const { lines, removeCartItem } = useDataProvider();
  return (
    <VStack px={4} py={2} mt={6}>
      {lines.map((line, index) => (
        <Flex justify="space-between" w="100%">
          <Heading flex={1} fontSize={16} maxW={50}>
            {line.quantity}x
          </Heading>
          <Box flex={5}>
            <Heading fontSize={16}>{line.label}</Heading>
            {line.value.map((value) => (
              <Text color="gray.600">{value.value}</Text>
            ))}
          </Box>
          <Box flex={1}>
            <Heading fontSize={16} textAlign="right">
              ${line.price.toFixed(2)}
            </Heading>
            {line.value.map((value) => (
              <Text textAlign="right" color="gray.600">
                +${value.price.toFixed(2)}
              </Text>
            ))}
          </Box>
          <Flex flex={1} maxW={10} justify="flex-end">
            <IconButton
              variant="ghost"
              size="xs"
              onClick={() => removeCartItem(index)}
              icon={<GrClose />}
              aria-label="Remove from cart"
            />
          </Flex>
        </Flex>
      ))}
      <Divider />
      <VStack w="100%">
        <Flex w="100%" justify="space-between" color="gray.600">
          <Text fontSize={12}>Sub-Total</Text>
          <Text fontSize={12}>${calculateOrderSubtotal(lines).toFixed(2)}</Text>
        </Flex>
        <Flex w="100%" justify="space-between" color="gray.600">
          <Text fontSize={12}>Taxes (10%)</Text>
          <Text fontSize={12}>${calculateOrderText(lines, 10).toFixed(2)}</Text>
        </Flex>
        <Flex w="100%" justify="space-between">
          <Heading fontSize={16}>Total</Heading>
          <Heading fontSize={16}>
            ${calculateOrderTotal(lines, 10).toFixed(2)}
          </Heading>
        </Flex>
      </VStack>
      <BottomButton
        label="Go to checkout"
        onClick={() => navigate("/checkout")}
        total={calculateOrderTotal(lines, 10).toFixed(2)}
      />
    </VStack>
  );
};
