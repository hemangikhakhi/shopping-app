import { makeStyles } from '@mui/styles';

export const useProductDetailStyle = makeStyles({
    container: {
        display: 'flex',
        width: '600px',
    },
    detailContainer: {
        display: "flex",
        flexDirection: "column"
    },
    titleFont: {
        fontWeight: 800
    },
    offerContainer: {
        display: "flex",
    },
    offerDiv: {
        border: '1px solid #000000',
        width: '100px',
        margin: "10px 0",
        padding: '5px',
        borderRadius: '5px',
        height: '100px',
        overflow: 'hidden',
        marginRight: '10px'
    },
    offerDescription: {
        fontSize: '10px'
    },
    variantDiv: {
        height: '20px !important',
        width: '50px !important'
    }

});