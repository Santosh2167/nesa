import React from 'react'
import loadingIcon from '../../svg/loading.svg';
import '../Loading/Loading.css';

function Loading() {
  return (
    <img src={loadingIcon} className="nesa-loading" alt="loading" />
  )
}

export default Loading;