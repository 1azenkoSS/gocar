import {FaChevronLeft, FaChevronRight} from 'react-icons/fa';
import {Box, IconButton} from "@mui/material";

const Arrow = ({direction, clickFunction}) => {
    const icon = direction === 'left' ? <FaChevronLeft size={24}/> : <FaChevronRight size={24}/>;

    return (
        <IconButton onClick={clickFunction} sx={{height: '30px', cursor: 'pointer'}}>
            {icon}
        </IconButton>
    )
}
export default Arrow;