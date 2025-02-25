import {
  Button,
  Grid,
  IconButton,
  Tooltip,
  Typography,
  Paper,
  Chip,
} from "@mui/material";
import React, { useState } from "react";
import AutoCompleteFeild from "../../../FormComponents/AutoCompleteFeild";
import InputField from "../../../FormComponents/InputField";
import { getAllImportData, getCategoryById } from "../../../services/Import";
import CloseIcon from "@mui/icons-material/Close";
import Validation from "../../../Validation/Validation";
import { addIm_Item } from "../../../services/Import";
import FormAlert from "../../../components/FormAlert";
import Im_CategorySelectingPopup from "../../../components/Im_CategorySelectingPopup";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  categoryContainer: {
    padding: "10px",
  },
  categoryTag: {
    marginRight: "10px",
  },
});

function ImportFrom({ setOpenForm }) {
  const classes = useStyles();

  //for input feild values
  const [value, setValue] = useState({
    _fname: "",
    _lname: "",
    _role: "RETAIL_SELLER",
    _email: "",
    _phone: "",
    _route: [],
  });

  //Reset values
  const resetValues = () => {
    setValue({
      _fname: "",
      _lname: "",
      _role: "RETAIL_SELLER",
      _email: "",
      _phone: "",
      _route: [],
    });
    setImportCategories([]);
  };

  // set open category table
  const [openCatgoryTable, setOpenCatgoryTable] = useState(false);
  const [selectedCatgory, setSelectedCatgory] = useState([]);
  const [importCategories, setImportCategories] = useState([]);
  const [catgoryRows, setCatgoryRows] = useState([]);

  const handleOpenCategoryTable = async () => {
    setOpenCatgoryTable(true);
  };

  const handleCloseCatgoryTable = async () => {
    const categoryList = [];
    for (let x = 0; x < selectedCatgory.length; x++) {
      let categoryData = await getCategoryById(selectedCatgory[x]);
      console.log(categoryData);
      categoryList.push(categoryData);
    }
    setImportCategories(categoryList);
    setValue({
      ...value,
      _categories: selectedCatgory,
    });
    setOpenCatgoryTable(false);
    console.log(importCategories);
  };

  // errors for inputfeild
  const [error, setError] = useState({
    _importName: "",
    _importBrand: "",
    _importMCategory: "",
    _importQty: "",
    _importUnitType: "",
    _refillRate: 0,
  });

  //display alert...
  const [displayAlert, setAlert] = useState(false);

  //alert data
  const [alertData, setAlertData] = useState({
    type: "",
    message: "",
  });

  const closeAlert = () => {
    setAlert(false);
    setAlertData({
      type: "",
      message: "",
    });
  };

  //reset errors...
  const resetErrors = () => {
    setError({});
  };

  //set error
  const submitValue = async () => {
    setError(Validation(value));
    if (
      !error._importName &&
      !error._importQty &&
      !error._importUnitType &&
      !error._importMCategory &&
      !error._importBrand
    ) {
      let data = { ...value };
      let submit_import_data = await addIm_Item(data);
      if (submit_import_data) {
        resetValues();
        setAlertData({
          type: "success",
          message: "Item submitted..",
        });
        setAlert(true);
      } else {
        setAlertData({
          type: "error",
          message: "Something went wrong...",
        });
        setAlert(true);
      }
      console.log(submit_import_data);
    }
  };

  //for import itens
  const [itemSet, setItem] = useState([]);
  //to handle changing value
  const handleChange = (name, val) => {
    console.log(name, val);
    setValue({
      ...value,
      [name]: val,
    });
  };

  //load import data when click on input feild
  const loadData = async () => {
    resetErrors();
    closeAlert();
    let importSet = await getAllImportData();
    console.log("array items", importSet);
    setItem(importSet);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={11} sx={12}>
        <Typography mt={1} variant="h6">
          {" "}
          Add Retail Salesman{" "}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={1} sx={12}>
        <Tooltip title="Close">
          <IconButton
            onClick={() => {
              setOpenForm(false);
            }}
            aria-label="close"
            size="small"
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Grid>
      <Grid item xs={12} sm={9} sx={12}>
        <InputField
          name="_fname"
          value={value._fname}
          onChange={(event, newInputValue) =>
            handleChange(event, newInputValue)
          }
          type="text"
          label="First Name"
        />
      </Grid>
      <Grid item xs={12} sm={9} sx={12}>
        <InputField
          name="_lname"
          value={value._lname}
          onChange={(event, newInputValue) =>
            handleChange(event, newInputValue)
          }
          type="text"
          label="Last Name"
        />
      </Grid>
      <Grid item xs={12} sm={9} sx={12}>
        <InputField
          name="_email"
          value={value._email}
          onChange={(event, newInputValue) =>
            handleChange(event, newInputValue)
          }
          type="text"
          label="Email"
        />
      </Grid>
      <Grid item xs={12} sm={9} sx={12}>
        <InputField
          name="_phone"
          value={value._phone}
          onChange={(event, newInputValue) =>
            handleChange(event, newInputValue)
          }
          type="text"
          label="Phone Number"
        />
      </Grid>
      <Grid item xs={12} sm={9} sx={12}>
        <InputField
          name="_role"
          value={value._role}
          disable={true}
          onChange={(event, newInputValue) =>
            handleChange(event, newInputValue)
          }
          type="text"
          label="Role"
        />
      </Grid>

      <Grid item xs={12} sm={12} sx={12}>
        {displayAlert ? (
          <FormAlert type={alertData.type} message={alertData.message} />
        ) : null}
      </Grid>
      <Grid item xs={12} sm={12} sx={12}>
        <Grid container justifyContent="space-between">
          <Grid item xs={12} sm={4} sx={12}>
            <Button fullWidth variant="contained" onClick={submitValue}>
              Submit
            </Button>
          </Grid>
          <Grid item xs={12} sm={1} sx={12}>
            <Button onClick={resetValues} variant="outlined">
              Reset
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid></Grid>
    </Grid>
  );
}

export default ImportFrom;
