import {
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  VStack,
  FormControl,
  FormLabel,
  Textarea,
  Input,
  FormErrorMessage,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { IOrder } from "../models";
import { BottomButton } from "../components/buttom-button";
import { useDataProvider } from "../components/data-provider";
import { calculateOrderTotal } from "../utils/calculations";
import { PAYMENT_METHODS } from "../utils/constants";
import { Navigate, useNavigate } from "react-router-dom";

export const Checkout = () => {
  const navigate = useNavigate();
  const { lines, restaurantInfo, checkout } = useDataProvider();
  const { register, handleSubmit, formState } = useForm<IOrder>();

  const onSubmit = async (data: IOrder) => {
    await checkout(data);
    navigate("/thankyou");
  };

  if (!restaurantInfo) return null;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Accordion defaultIndex={[0, 1, 2]} allowMultiple>
        <AccordionItem>
          <AccordionButton bg="gray.200">CONTACT</AccordionButton>
          <AccordionPanel>
            <VStack mt={4}></VStack>
            <FormControl isInvalid={!!formState?.errors.firstName?.type}>
              <FormLabel>First Name</FormLabel>
              <Input
                placeholder="First Name"
                {...register("firstName", { required: true })}
              />
              <FormErrorMessage>Required</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!formState?.errors.lastName?.type}>
              <FormLabel>First Name</FormLabel>
              <Input
                placeholder="Last Name"
                {...register("lastName", { required: true })}
              />
              <FormErrorMessage>Required</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!formState?.errors.email?.type}>
              <FormLabel>Email</FormLabel>
              <Input
                placeholder="email"
                {...register("email", { required: true })}
              />
              <FormErrorMessage>Required</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!formState?.errors.phone?.type}>
              <FormLabel>Phone</FormLabel>
              <Input
                placeholder="phone"
                {...register("phone", { required: true })}
              />
              <FormErrorMessage>Required</FormErrorMessage>
            </FormControl>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton bg="gray.200">PAYMENT METHOD</AccordionButton>
          <AccordionPanel>
            <VStack mt={4}>
              <FormControl
                isInvalid={!!formState?.errors?.paymentMethods?.type}
              >
                <FormLabel>Payment Method</FormLabel>
                <RadioGroup>
                  <VStack alignItems="flex-start">
                    {restaurantInfo.paymentMethods.map((method) => (
                      <Radio
                        value={method}
                        {...register("paymentMethods", { required: true })}
                      >
                        {PAYMENT_METHODS.find((m) => m.id === method)?.name}
                      </Radio>
                    ))}
                  </VStack>
                </RadioGroup>
                <FormErrorMessage>Required</FormErrorMessage>
              </FormControl>
            </VStack>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton bg="gray.200">COMMENTS</AccordionButton>
          <AccordionPanel>
            <VStack mt={4}>
              <FormControl>
                <FormLabel>Comments</FormLabel>
                <Textarea placeholder="Comments..." {...register("comments")} />
              </FormControl>
            </VStack>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      <BottomButton
        label="Place pick up order"
        total={calculateOrderTotal(lines, 10).toFixed(2)}
      />
    </form>
  );
};
