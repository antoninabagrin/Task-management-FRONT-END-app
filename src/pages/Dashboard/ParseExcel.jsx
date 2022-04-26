import React from 'react';
import * as XLSX from 'xlsx';
import { Typography } from '@mui/material';
import { useState } from 'react';
import axios from '../../utils/axios';

export const ParseExcel = () => {
  const [fileName, setFileName] = useState(null);

  const handleFile = async (event) => {
    const file = event.target.files[0];
    setFileName(file.name);
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);

    const tasksSheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(tasksSheet, {
      header: 1,
      defval: '',
    });

    const dataWithoutHeader = jsonData.filter((row, i) => i !== 0);

    const handleAddTask = async () => {
      dataWithoutHeader.forEach((row) => {
        if (row.length > 1) {
          axios.post('/tasks', { title: row[0], description: row[1] });
        }
      });
    };
    Promise.all([handleAddTask()])
      .then(() => {
        console.log('success');
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  return (
    <div>
      {fileName && <Typography margin={1}>FileName: {fileName}</Typography>}

      <input
        style={{ marginLeft: 8 }}
        type='file'
        onChange={(event) => handleFile(event)}
      />
    </div>
  );
};
