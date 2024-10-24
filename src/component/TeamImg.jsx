import React, { useEffect, useState } from 'react'
import { getImg, getImgage } from '../api/api';
import { css, useTheme } from '@emotion/react';
import './css/TeamImg.css'

const useStyles = (theme) => ({
  root: css`
      width: 80%;
      margin-top: 20px;
    `,
  heading: css`
      font-size: 1.1rem;
      font-weight: 500;
    `,
  imageContainer: css`
      width: 50%;
      display: flex;
      justify-content: center;
    `,
  image: css`
      width: 50%;
      height: auto;
      max-width: 100px;
      object-fit: cover;
    `,
});

export default function TeamImg({ imgId, name }) {
  const [image, setImage] = useState();
  const theme = useTheme();
  const styles = useStyles(theme);

  useEffect(() => {
    getImgage(imgId, name)
      .then((response) => {
        setImage(response);
      })
      .catch((err) => {
        if (err.message === '404') {
          getImg(imgId)
            .then((response) => {
              setImage(response);
            })
            .catch((err) => {
              console.log(err);
            })
        }
        else {
          console.error(err);
        }
      })
  }, [imgId])
  return (
    <div className='flag'>
      {image && <img src={image} alt="" css={styles.image} />}
    </div>
  )
}
