import React, { useEffect, useState } from "react";
import {
  Checkbox,
  Collapse,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";


interface Department {
  department: string;
  sub_departments: string[];
}

const departmentData: Department[] = [
  {
    department: "customer_service",
    sub_departments: [	"support",
    "customer_success"
],
  },
  {
    department: "design",
    sub_departments: [	"graphic_design",
    "product_design",
    "web_design"],
  },
];

const DepartmentTree: React.FC = () => {
  const [expanded, setExpanded] = useState<string[]>([]);
  const [checked, setChecked] = useState<string[]>([]);

useEffect(() => {
  departmentData.forEach((item) => {
    const engineeringSubDepts = item.sub_departments;
    const isAnySubDeptChecked = engineeringSubDepts.some((subDept) =>
      checked.includes(subDept)
    );
    const areAllSubDeptsChecked = engineeringSubDepts.every((subDept) =>
      checked.includes(subDept)
    );
    if (checked.includes(item.department)) {
      if (isAnySubDeptChecked && !areAllSubDeptsChecked) {
        setChecked((prevChecked) =>
          prevChecked.filter((deptitem) => deptitem !== item.department)
        );
      }
    } else {
      if (isAnySubDeptChecked && areAllSubDeptsChecked) {
        setChecked((prevChecked) => [...prevChecked, item.department]);
      }
    }
  });
}, [checked]);

  // console.log(checked);
  const handleToggle = (department: string) => {
    setExpanded((prevExpanded) =>
      prevExpanded.includes(department)
        ? prevExpanded.filter((dep) => dep !== department)
        : [...prevExpanded, department]
    );
  };

  const handleCheck = (department: string) => {
    setChecked((prevChecked) => {
      let newChecked: string[] = [...prevChecked];

      if (prevChecked.includes(department)) {
        // If the department is already checked, uncheck it and all its sub-departments
        newChecked = newChecked.filter((dep) => dep !== department);
        const departmentObject = departmentData.find(
          (dept) => dept.department === department
        );

        if (departmentObject && departmentObject.sub_departments) {
          // Remove sub-departments from the checked list
          newChecked = newChecked.filter(
            (dep) => !departmentObject.sub_departments.includes(dep)
          );
        }
      } else {
        // If the department is not checked, check it and all its sub-departments
        newChecked.push(department);
        const departmentObject = departmentData.find(
          (dept) => dept.department === department
        );

        if (departmentObject && departmentObject.sub_departments) {
          // Add sub-departments to the checked list
          newChecked.push(...departmentObject.sub_departments);
        }
      }

      return newChecked;
    });
  };

  // ...

  const renderTreeItems = (
    departments: typeof departmentData,
    level: number = 0
  ) => {
    return departments.map((dept) => (
      
      <React.Fragment key={dept.department}>
        <ListItem style={{ marginLeft: `${level * 3}rem` }}>
          {dept.sub_departments && dept.sub_departments.length > 0 && (
            <Typography
              onClick={() => handleToggle(dept.department)}
              style={{ cursor: "pointer" }}
            >
              {expanded.includes(dept.department) ? "-" : "+"}
            </Typography>
          )}
          <Checkbox
            checked={checked.includes(dept.department)}
            onChange={() => handleCheck(dept.department)}
          />
          <ListItemText primary={dept.department} />
        </ListItem>
        {dept.sub_departments && dept.sub_departments.length > 0 && (
          <Collapse in={expanded.includes(dept.department)}>
            <List disablePadding>
              {renderTreeItems(
                dept.sub_departments.map((department) => ({
                  department,
                  sub_departments: [],
                })),
                level + 1
              )}
            </List>
          </Collapse>
        )}
      </React.Fragment>
     
    ));
  };

  return <List>{renderTreeItems(departmentData)}</List>;
};

export default DepartmentTree;