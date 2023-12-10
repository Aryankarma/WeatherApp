const cityName = ({cityName}) =>{
   
  //  console.log(cityName)
   return <>
    {cityName.map((suggestion, index) => (
      <li key={index} >
        <button type="submit"> {suggestion} </button> 
      </li>
    ))}   
   </> 
}

export default cityName