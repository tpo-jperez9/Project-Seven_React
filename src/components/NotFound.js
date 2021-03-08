// returns a 404 image for urls with no routes //
const NotFound = () => {
    return (
      <div className="photo-container">
        <img src={'./404.jpg'} alt=""/>
      </div>
    );
  };
  
  export default NotFound;