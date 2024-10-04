import {
  ArrayField,
  ArrayInput,
  BooleanField,
  BooleanInput,
  ChipField,
  Create,
  Datagrid,
  DateField,
  Edit,
  ImageField,
  ImageInput,
  Labeled,
  List,
  NumberField,
  NumberInput,
  ReferenceField,
  ReferenceInput,
  ResourceProps,
  SelectInput,
  SimpleForm,
  SimpleFormIterator,
  TextField,
  TextInput,
  number,
  required,
  RadioButtonGroupInput,
} from "react-admin";

import { MdOutlineFastfood, MdReceipt } from "react-icons/md";
import { ORDER_STATUS } from "../utils/constants";

const OrderForm = () => {
  return (
    <SimpleForm sanitizeEmptyValues>
      <Labeled label="First Name">
        <TextField source="firstName" />
      </Labeled>
      <Labeled label="Last Name">
        <TextField source="lastName" />
      </Labeled>
      <Labeled label="Email">
        <TextField source="email" />
      </Labeled>
      <Labeled label="Phone">
        <TextField source="phone" />
      </Labeled>
      <Labeled label="Comments">
        <TextField source="comments" />
      </Labeled>
      <Labeled label="Total">
        <NumberField
          source="total"
          options={{ style: "currency", currency: "USD" }}
        />
      </Labeled>

      <RadioButtonGroupInput choices={ORDER_STATUS} source="status" />
      <TextInput source="reason" />

      <ArrayField source="lines">
        <Datagrid bulkActionButtons={false}>
          <TextField source="label" />
          <NumberField
            source="price"
            options={{ style: "currency", currency: "USD" }}
          />
          <NumberField source="quantity" />
          <TextField source="comments" />
          <ArrayField source="value">
            <Datagrid bulkActionButtons={false}>
              <TextField source="value" />
              <NumberField
                source="price"
                options={{ style: "currency", currency: "USD" }}
              />
            </Datagrid>
          </ArrayField>
        </Datagrid>
      </ArrayField>
    </SimpleForm>
  );
};

const OrderEdit = () => (
  <Edit>
    <OrderForm />
  </Edit>
);

const OrderList = () => (
  <List sort={{ field: "pickupTime", order: "DESC" }}>
    <Datagrid
      rowClick="edit"
      bulkActionButtons={false}
      rowStyle={(record) =>
        record.status === "pending"
          ? {
              backgroundColor: "pink",
            }
          : undefined
      }
    >
      <TextField source="firstName" />
      <TextField source="lastName" />
      <TextField source="email" />
      <TextField source="phone" />
      <TextField source="status" />
      <NumberField
        source="total"
        options={{ style: "currency", currency: "USD" }}
      />

      <DateField source="pickUpTime" showTime showDate label="Pickup" />
    </Datagrid>
  </List>
);

export const OrderProps: ResourceProps = {
  icon: MdReceipt,
  name: "order",
  list: OrderList,
  edit: OrderEdit,
};
