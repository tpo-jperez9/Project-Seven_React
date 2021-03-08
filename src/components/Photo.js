// takes a url from flikr, adds it to an img tage and returns it in an li//
const Photo = (props) => {
    return (
      <li>
        <img src={props.src} alt="" />
      </li>
    );
  };
  
  export default Photo;