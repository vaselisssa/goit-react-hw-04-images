import React from 'react';
import { MagnifyingGlass } from 'react-loader-spinner';
import { LoaderContainer } from './Loader.styled';

const Loader = () => {
  return (
    <LoaderContainer>
      <MagnifyingGlass
        visible={true}
        height="160"
        width="160"
        ariaLabel="MagnifyingGlass-loading"
        wrapperStyle={{}}
        wrapperClass="MagnifyingGlass-wrapper"
        glassColor="#c0efff"
        color="#3f51b5"
      />
    </LoaderContainer>
  );
};

export default Loader;
