import {
  ArrayInput,
  BooleanInput,
  ChipField,
  Create,
  Datagrid,
  DateField,
  Edit,
  ImageField,
  ImageInput,
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
} from "react-admin";

import { MdOutlineFastfood } from "react-icons/md";

const ItemForm = () => {
  return (
    <SimpleForm sanitizeEmptyValues>
      <ImageInput source="image" label="Related pictures">
        <ImageField source="src" title="title" />
      </ImageInput>
      <ReferenceInput source="category" reference="category">
        <SelectInput optionText="title" fullWidth validate={[required()]} />
      </ReferenceInput>
      <TextInput source="label" validate={[required()]} fullWidth />
      <NumberInput source="price" validate={[required(), number()]} />
      <TextInput source="description" />
      <ArrayInput source="variants">
        <SimpleFormIterator fullWidth>
          <TextInput source="type" helperText={false} fullWidth />
          <ArrayInput source="choices">
            <SimpleFormIterator inline>
              <TextInput source="label" />
              <NumberInput source="price" defaultValue={0} />
            </SimpleFormIterator>
          </ArrayInput>
          <BooleanInput source="allowMultiple" helperText={false} fullWidth />
          <BooleanInput source="isRequired" helperText={false} fullWidth />
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  );
};

const ItemEdit = () => (
  <Edit>
    <ItemForm />
  </Edit>
);

const ItemCreate = () => (
  <Create>
    <ItemForm />
  </Create>
);

const ItemList = () => (
  <List>
    <Datagrid rowClick="edit">
      <ImageField source="image.src" label="Image" />
      <TextField source="label" />
      <ReferenceField source="category" reference="category">
        <ChipField source="title" />
      </ReferenceField>
      <NumberField source="price" />
      <TextField source="description" />
      <DateField source="createdate" showTime label="Created At" />
      <DateField source="lastupdate" showTime label="Updated At" />
    </Datagrid>
  </List>
);

export const ItemProps: ResourceProps = {
  icon: MdOutlineFastfood,
  name: "item",
  list: ItemList,
  create: ItemCreate,
  edit: ItemEdit,
};
