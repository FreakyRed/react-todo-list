import { useFormik } from "formik";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import * as yup from "yup";
import styling from "styled-components";

import { DesktopDatePicker } from "@mui/x-date-pickers-pro";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { parse, isDate } from "date-fns";

const parseDateString = (value, originalValue) => {
  const parsedDate = isDate(originalValue)
    ? originalValue
    : parse(originalValue, "dd/MM/yyyy", new Date());

  return parsedDate;
};

const validationSchema = yup.object({
  title: yup.string().min(3).required("Title is required"),
  description: yup.string().min(3).max(255),
  deadline: yup
    .date()
    .transform(parseDateString)
    .min(new Date(), "Date cannot be in the past"),
});

const Container = styling.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin: 1rem 0;
`;

const ItemForm = ({ handleClose }) => {
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      deadline: new Date(),
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values.title);
      handleClose({
        title: values.title,
        description: values.description,
        deadline: values.deadline,
      });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Container>
        <TextField
          id="title"
          name="title"
          label="Title"
          value={formik.values.title}
          onChange={formik.handleChange}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
        ></TextField>
        <TextField
          id="description"
          name="description"
          label="Description"
          value={formik.values.description}
          onChange={formik.handleChange}
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
          helperText={formik.touched.description && formik.errors.description}
        ></TextField>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            disablePast
            label="Deadline"
            inputFormat="dd/MM/yyyy"
            value={formik.values.deadline}
            onChange={(value): void => {
              formik.setFieldValue("deadline", value, true);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                error={
                  formik.touched.deadline && Boolean(formik.errors.deadline)
                }
              />
            )}
          />
        </LocalizationProvider>
        <Button
          color="primary"
          variant="contained"
          type="submit"
          disabled={formik.isSubmitting}
        >
          Add
        </Button>
      </Container>
    </form>
  );
};

export default ItemForm;
