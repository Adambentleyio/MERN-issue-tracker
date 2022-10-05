import { Link } from 'react-router-dom';
import { Button, IconButton, Stack, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';


const RenderAdmin = ({issue, currentUserId}) => {
    // issue & currentUserId are both undefined
    console.log(issue.userId);

    return (
        <div>
            {currentUserId === undefined && <NotLoggedInMessage />}
            {currentUserId === issue.userId && <IsLoggedInAdminBar issue={issue} />}
        </div>
    )

}

    const IsLoggedInAdminBar = ({ issue }) => {

        return (
            <div>
            <Stack direction="row">
                <IconButton>
                    <Link to={`/issue/edit/${issue?._id}`}>
                    <EditIcon />
                    </Link>
                </IconButton>
                <IconButton>
                    <Link to={`issue/delete/${issue?._id}`}>
                    <DeleteIcon />
                    </Link>
                </IconButton>
            </Stack>
            </div>

          )
    }

    const NotLoggedInMessage = () => {
        return (

            <Stack direction="row">
              <Typography variant="p" sx={{fontSize: 12, color: "secondary"}}>Log in to edit</Typography>
            </Stack>)
    }


  export default RenderAdmin