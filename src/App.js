import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {

  const[search, setSearch] = useState('apple');
  const[images, setImages] = useState([]);


  useEffect(() => {
    fetchData();
  }, []);


  const handleSearch = () => {
    fetchData();
  }

  const fetchData = async () => {
    try{
      const response = await axios.get(`https://pixabay.com/api/?key=33083899-1dcf775f0e9ace6580c8b41e1&q=${search}&image_type=photo&pretty=true`);
      setImages(response.data.hits);
      console.log(response)

    } catch(error) {
      console.error('Error Occured while Fetching',error);
      
    }
  };

  return (
    <div className="App">
     <div className='search'>
      <input type="text"
      placeholder='Search for Image'
      value={search}
      onChange={(e) => setSearch(e.target.value)} 
       />
       <button onClick={handleSearch}> Search </button>
     </div>

     <div className='image-card'>
      {
        images.map((image) => (
          <div className='image' key={image.id}>
            <img src={image.webformatURL} alt={image.tags} />
            <div className='desc'>
              <p>Title:{image.tags}</p>
              <p>Views:{image.views}</p>
              <p>Downloads:{image.downloads}</p>
              <p>Likes:{image.likes}</p>
            </div>
          </div>
        ))
      }
     </div>
    </div>
  );
}

export default App;
