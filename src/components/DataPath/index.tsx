import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { List } from "@mui/material";
import Post from "../Interface/Post";

const DataPath = () => {
  const [posts, setPost] = useState<Post[]>([]);
  const [selectDepts, setSelectDepts] = useState<string[]>([]);

  interface Department {
    department: string;
    sub_departments: string[];
  }

  const departmentData: Department[] = [
    {
      department: "customer_service",
      sub_departments: ["support", "customer_success"],
    },
    {
      department: "design",
      sub_departments: ["graphic_design", "product_design", "web_design"],
    },
  ];

  const navigate = useNavigate();

  useEffect(() => {
    const userDetails = localStorage.getItem("userDetails");
    if (!userDetails) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    axios
      .get<Post[]>("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        setPost(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const renderHomeSignUpPage = () => {
    localStorage.removeItem("userDetails");
    navigate("/");
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "userId", headerName: "User ID", width: 150 },
    { field: "title", headerName: "Title", width: 300 },
    { field: "body", headerName: "Body", width: 400 },
  ];

  const deptChange = (department: any) => {
    const selectSubDepts =
      departmentData.find((item) => item.department === department)
        ?.sub_departments || [];

    if (selectSubDepts.length > 0) {
      const allSelected = selectSubDepts.every((subDept) =>
        selectDepts.includes(subDept)
      );

      if (allSelected) {
        setSelectDepts((prevState) =>
          prevState.filter((dept) => !selectSubDepts.includes(dept))
        );
      } else {
        setSelectDepts((prevState) => [...prevState, ...selectSubDepts]);
      }
    } else {
      setSelectDepts((prevState) =>
        prevState.includes(department)
          ? prevState.filter((dept) => dept !== department)
          : [...prevState, department]
      );
    }
  };

  const isDeptSelected = (department: any) => {
    const selectSubDepts =
      departmentData.find((item) => item.department === department)
        ?.sub_departments || [];
    const allSubDeptSelected = selectSubDepts.every((subDept) =>
      selectDepts.includes(subDept)
    );

    const someSubDeptSelected = selectSubDepts.some((subDept) =>
      selectDepts.includes(subDept)
    );

    return allSubDeptSelected
      ? true
      : someSubDeptSelected
      ? "indeterminate"
      : false;
  };

  const handleSubDeptChange = (subDept: any) => {
    setSelectDepts((prevState) =>
      prevState.includes(subDept)
        ? prevState.filter((dep) => dep !== subDept)
        : [...prevState, subDept]
    );
  };

  const isSubDeptSelected = (subdept: any) => selectDepts.includes(subdept);

  return (
    <div style={{ minHeight: "100%" }}>
      <Button
        variant="outlined"
        style={{ marginBottom: "10px" }}
        onClick={renderHomeSignUpPage}
      >
        Log Out
      </Button>
      <Box style={{ minHeight: "50%", width: "100%" }}>
        <DataGrid
          rows={posts}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 7,
              },
            },
          }}
          pageSizeOptions={[7]}
          checkboxSelection
        />
      </Box>
      {departmentData.map((eachItem, index) => {
        return (
          <List key={index}>
            <FormControlLabel
              label={eachItem.department}
              control={
                <Checkbox
                  checked={isDeptSelected(eachItem.department) === true}
                  indeterminate={
                    isDeptSelected(eachItem.department) === "indeterminate"
                  }
                  onChange={() => deptChange(eachItem.department)}
                />
              }
            />
            <Box sx={{ display: "flex", flexDirection: "column", ml: 3 }}>
              {eachItem.sub_departments.map((eachDept, index) => {
                return (
                  <List key={index}>
                    <FormControlLabel
                      label={eachDept}
                      control={
                        <Checkbox
                          checked={isSubDeptSelected(eachDept)}
                          onChange={() => handleSubDeptChange(eachDept)}
                        />
                      }
                    />
                  </List>
                );
              })}
            </Box>
          </List>
        );
      })}
    </div>
  );
};

export default DataPath;
