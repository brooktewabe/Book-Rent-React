import ClipLoader from 'react-spinners/ClipLoader';

const override ={
  display: 'block',
  margin: '100px auto'
}

// eslint-disable-next-line react/prop-types
const  Spinner= ({loading}) => {
  return (
    <ClipLoader 
    color='#4338ca'
    loading={ loading }
    cssOverride={override}
    size={150}
    />
  )
}

export default Spinner;