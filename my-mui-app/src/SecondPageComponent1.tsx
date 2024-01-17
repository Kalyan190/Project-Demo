// SecondPageComponent1.tsx
import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import './secondPage.css'


interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'title', headerName: 'Title', width: 200 },
  { field: 'body', headerName: 'Body', width: 400 },
];

const SecondPageComponent1: React.FC = () => {
  const [data, setData] = useState<Post[]>([]);
  

  useEffect(() => {
    // Check if necessary information is available in localStorage when the component mounts
      // If available, fetch data from the JSONPlaceholder API
      fetch('https://jsonplaceholder.typicode.com/posts')
        .then((response) => response.json())
        .then((data) => setData(data))
        .catch((error) => console.error('Error fetching posts:', error));
    
  });

  return (
    <div className= 'maincont'>
    <div className='data'>
      <DataGrid rows={data} columns={columns} autoPageSize={true}  checkboxSelection
        disableRowSelectionOnClick />
    </div>
    </div>
   
  );
  
};

export default SecondPageComponent1;
