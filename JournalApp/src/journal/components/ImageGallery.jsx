import { useTheme } from '@emotion/react';
import { Alert, Grid, Typography, useMediaQuery } from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

export const ImageGallery = () => {

    const { active } = useSelector(state => state.journal)
    const { imageUrls } = active

    console.log(imageUrls)

    const areImages = useMemo(() => imageUrls.length !== 0, [imageUrls.length])

    console.log(areImages)

    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.up('sm'))




    return (
        <>
            {areImages ? <ImageList sx={{ width: '100%', height: 500 }} cols={isMobile ? 3 : 2} rowHeight={200}>
                {imageUrls.map((image) => (
                    <ImageListItem style={{ padding: 2 }} key={image}>
                        <img
                            src={`${image}?w=164&h=164&fit=crop&auto=format`}
                            srcSet={`${image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                            alt={image}
                            loading="lazy"
                        />
                    </ImageListItem>
                ))}
            </ImageList> : <Grid container direction="column" alignItems="center"
                justifyContent="center"><Alert severity='info'>Aún No Has Agregado Ninguna Imagen :(</Alert></Grid>}

        </>
    );
}