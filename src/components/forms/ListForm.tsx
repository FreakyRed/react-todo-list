import { useFormik } from "formik";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import * as yup from "yup";
import styling from "styled-components";
import "../../i18n";
import { useTranslation } from "react-i18next";

const validationSchema = yup.object({
  title: yup.string().min(3).required("Title is required"),
});

const Container = styling.div`
display: flex;
flex-direction: column;
gap: 1rem;
margin: 1rem 0;
`;

const ListForm = ({ handleClose }) => {
  const { t } = useTranslation();
  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleClose({ title: values.title });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Container>
        <TextField
          id="title"
          name="title"
          label={t("Title")}
          value={formik.values.title}
          onChange={formik.handleChange}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
        ></TextField>
        <Button
          color="primary"
          variant="contained"
          type="submit"
          disabled={formik.isSubmitting}
        >
          {t("Add Todo")}
        </Button>
      </Container>
    </form>
  );
};

export default ListForm;
