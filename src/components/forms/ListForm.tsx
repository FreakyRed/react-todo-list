import { useFormik } from "formik";
import TextField from "@mui/material/TextField";
import {Button} from "@mui/material"
import * as yup from "yup"

interface Errors {
  title?: String;
}

const validationSchema = yup.object({
    title: yup
    .string()
    .min(3)
    .required('Title is required')
  });
  

const ListForm = ({onClick}) => {
  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values.title);
      onClick()
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          id="title"
          name="title"
          label="Title"
          value={formik.values.title}
          onChange={formik.handleChange}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
        ></TextField>
        <Button color="primary" variant="contained" type="submit" disabled={formik.isSubmitting}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default ListForm;
